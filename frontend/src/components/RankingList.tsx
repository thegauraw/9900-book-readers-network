import { FC, useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BookThumbnailList from './BookThumbnailList';
import { BookThumbnail } from '../types/BookTypes';
import { getRankings } from '../services/rankingAPIs';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';

const RankingList: FC = () => {
  const [bookList, setBookList] = useState<BookThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await getRankings();
        setBookList(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const rankingBlock = (title: string, bookList: BookThumbnail[]) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Divider />
        <BookThumbnailList bookList={bookList} isOverview={true} size={'medium'} />
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 2,
      }}
    >
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading &&
        bookList &&
        isEmpty(error) &&
        (bookList.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {rankingBlock('TOP RATED', bookList)}
            {rankingBlock('MOST COLLECTED', bookList)}
          </Box>
        ) : (
          <Typography variant="h4" component="span" sx={{ color: 'primary.main', mr: 1 }}>
            No enough data
          </Typography>
        ))}
    </Box>
  );
};

export default RankingList;
