import { FC, useContext, useState } from 'react';
import { Box, Typography, Divider, Pagination, Stack, Button } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import BookDetails from './BookDetails';
import LoadingIndicator from './LoadingIndicator';
import SearchNotFound from './SearchNotFound';
import { Appctx } from '../utils/LocalContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchFilter from './SearchFilter';
const SearchResultFullList: FC = () => {
  const context = useContext(Appctx);
  const { searchResultList } = context;
  const { settlement, isLoading, error } = searchResultList;
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('p')) || 1);

  let navigate = useNavigate();

  const handleChange = (event: any, value: number) => {
    setPage(value);
    const newParams = {
      q: searchParams.get('q') ?? '',
      by: searchParams.get('by') ?? 'all',
      p: String(value) ?? '1',
      min: searchParams.get('min') ?? '0',
    };
    setSearchParams(newParams);
  };

  const onClick = (id: string | undefined) => {
    if (id) navigate(`/books/${id}`);
  };

  const listHeader = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1">{Number(settlement?.totalItems)} books found</Typography>
        <SearchFilter />
      </Box>
    );
  };

  const showList = () => {
    if (!isLoading && !isEmpty(settlement) && isEmpty(error)) {
      return (
        <Box
          sx={{
            height: '66vh',
            overflowY: 'scroll',
          }}
        >
          {listHeader()}
          {settlement?.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <BookDetails
                title={item.volumeInfo.title}
                authors={item.volumeInfo.authors}
                bookCoverImg={item.volumeInfo.imageLinks?.smallThumbnail}
                categories={item.volumeInfo.categories}
                publisher={item.volumeInfo.publisher}
                publishedDate={item.volumeInfo.publishedDate}
              />
              <Button
                variant="text"
                sx={{
                  width: '20%',
                  p: 1,
                  ml: 'auto',
                }}
                onClick={() => onClick(item.id)}
              >
                View Details
              </Button>
            </Box>
          ))}
        </Box>
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
        <Stack spacing={2} sx={{ alignItems: 'center', pt: 1 }}>
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
