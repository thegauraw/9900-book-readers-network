import { FC, useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BookThumbnailList from './BookThumbnailList';
import { BookThumbnail } from '../types/BookTypes';
import { RecommendationModes } from '../types/SearchTypes';
import { getRecommendations } from '../services/searchAPIs';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';

const RecommendationList: FC = () => {
  const [bookList, setBookList] = useState<BookThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await getRecommendations(RecommendationModes.book);
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
        m: 4,
      }}
    >
      <Typography variant="subtitle1">BOOKS FOR YOU</Typography>
      <Divider />
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading &&
        bookList &&
        isEmpty(error) &&
        (bookList.length > 0 ? (
          <BookThumbnailList bookList={bookList} isOverview={false} size={'large'} />
        ) : (
          <Typography variant="h4" component="span" sx={{ color: 'primary.main', mr: 1 }}>
            No recommendations
          </Typography>
        ))}
    </Box>
  );
};

export default RecommendationList;
