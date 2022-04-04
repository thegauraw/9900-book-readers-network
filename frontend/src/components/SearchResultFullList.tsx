import { FC, useContext, useState } from 'react';
import { Box, Typography, Divider, Pagination, Stack } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import FoldableContent from './FoldableContent';
import LoadingIndicator from './LoadingIndicator';
import SearchNotFound from './SearchNotFound';
import { Appctx } from '../utils/LocalContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
const SearchResultFullList: FC = () => {
  const context = useContext(Appctx);
  const { searchResultList } = context;
  const { settlement, isLoading, error } = searchResultList;
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('p')));

  let navigate = useNavigate();

  const handleChange = (event: any, value: number) => {
    setPage(value);
    const newParams = { q: '', by: 'all', p: '1' };
    if (searchParams.has('q') && searchParams.has('by')) {
      newParams['q'] = searchParams.get('q') ?? '';
      newParams['by'] = searchParams.get('by') ?? '';
      if (searchParams.has('p')) {
        newParams['p'] = String(value);
      }
      setSearchParams(newParams);
    }
  };

  const onClick = () => {
    navigate('/test');
  };

  const showList = () => {
    if (!isLoading && !isEmpty(settlement) && isEmpty(error)) {
      return (
        <>
          <Typography variant="subtitle1">{Number(settlement?.totalItems)} books found</Typography>
          <Divider />
          {settlement?.items.map((item) => (
            <Box id={item.id}>{item.volumeInfo.title}</Box>
          ))}
        </>
      );
    } else return <></>;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
        px: 2,
      }}
    >
      {isLoading && <LoadingIndicator />}
      {!isLoading && !isEmpty(error) && <SearchNotFound />}
      {showList()}
      {!isLoading && !isEmpty(settlement) && isEmpty(error) && (
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Pagination
            //Google does not serve more than 1000(100pages) results for any query.
            count={Math.min(Math.ceil(Number(settlement?.totalItems) / 10), 100)}
            shape="rounded"
            onChange={handleChange}
            page={page}
          />
        </Stack>
      )}
    </Box>
  );
};

export default SearchResultFullList;
