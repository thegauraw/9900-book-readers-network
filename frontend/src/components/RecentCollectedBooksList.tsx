import { FC, useState, useEffect, useContext } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BookThumbnailList from './BookThumbnailList';
import { BookThumbnail } from '../types/BookTypes';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';
import { getRecentlyCollectedBooks } from '../services/bookAPIs';
import { Appctx } from '../utils/LocalContext';

const RecentCollectedBooksList: FC = () => {
  const [bookList, setBookList] = useState<BookThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const context = useContext(Appctx);
  const { token } = context;
  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await getRecentlyCollectedBooks(token);
        setBookList(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        mb: 2,
      }}
    >
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading &&
        bookList &&
        isEmpty(error) &&
        (bookList.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1">RECENT COLLECTED BOOKS</Typography>
            <Divider />
            <BookThumbnailList bookList={bookList} isOverview={false} size={'medium'} />
          </Box>
        ) : (
          <></>
        ))}
    </Box>
  );
};

export default RecentCollectedBooksList;
