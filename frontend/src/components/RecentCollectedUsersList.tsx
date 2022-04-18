import { FC, useState, useEffect } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { ReaderType } from '../types/ProfileTypes';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';
import { getRecentCollectedReadersByVolumeId } from '../services/readerAPIs';
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { NavMenuList } from '../config/paths';
const RecentCollectedUsersList: FC = () => {
  const [readerList, setReaderList] = useState<ReaderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { bookId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      if (bookId) {
        try {
          setIsLoading(true);
          const response = await getRecentCollectedReadersByVolumeId(bookId);
          setReaderList(response);
        } catch (error) {
          setError(error as string);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [bookId]);

  const handleClick = (input: number) => {
    if (input) {
      navigate({
        pathname: NavMenuList.Profiles,
        search: createSearchParams({
          id: String(input),
        }).toString(),
      });
    }
  };

  const showReaderList = () => {
    return readerList?.map((reader) => {
      return (
        <Button
          key={reader.id}
          variant="text"
          onClick={() => handleClick(reader.id)}
          sx={{ width: '100px', color: 'secondary.main' }}
        >
          <PersonIcon />
          {`${reader.username}`}
        </Button>
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 4,
      }}
    >
      <Typography variant="subtitle1">RECENT COLLECTED USERS</Typography>
      <Divider />
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading && readerList && isEmpty(error) && (
        <Box sx={{ display: 'flex', flexDirection: 'row', my: 2, flexWrap: 'wrap' }}>
          {readerList.length > 0 ? showReaderList() : <></>}
        </Box>
      )}
    </Box>
  );
};

export default RecentCollectedUsersList;
