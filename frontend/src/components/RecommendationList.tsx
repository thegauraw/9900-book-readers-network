import { FC, useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BookThumbnailList from './BookThumbnailList';
import RecommendationModeSelect from './RecommendationModeSelect';
import { BookThumbnail } from '../types/BookTypes';
import { RecommendationModes } from '../types/SearchTypes';
import { getRecommendations } from '../services/searchAPIs';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';

interface RecommendationListProps {
  title: string;
  authors: string[];
  categories: string[];
  publisher: string;
}

const RecommendationList: FC<RecommendationListProps> = ({
  title,
  authors,
  categories,
  publisher,
}) => {
  const [bookList, setBookList] = useState<BookThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState(RecommendationModes.title);

  const handleChange = (selectedValue: RecommendationModes) => {
    setValue(selectedValue);
  };

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        let query = '';
        switch (value) {
          case RecommendationModes.author:
            query = authors[0];
            break;
          case RecommendationModes.category:
            query = categories[0];
            break;
          case RecommendationModes.title:
            query = title;
            break;
          case RecommendationModes.publisher:
            query = publisher;
            break;
        }
        const response = await getRecommendations(value, query);
        setBookList(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [value]);

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
