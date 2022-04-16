import { FC, useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BookThumbnailList from './BookThumbnailList';
import RecommendationModeSelect from './RecommendationModeSelect';
import { BookThumbnail } from '../types/BookTypes';
import { RecommendationModes } from '../types/SearchTypes';
import { getRecommendations } from '../services/searchAPIs';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';

const RecommendationList: FC = () => {
  const [bookList, setBookList] = useState<BookThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState(RecommendationModes.author);

  const handleChange = (selectedValue: RecommendationModes) => {
    setValue(selectedValue);
  };

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await getRecommendations(value);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">BOOKS FOR YOU</Typography>
        <RecommendationModeSelect value={value} handleChange={handleChange} />
      </Box>
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
