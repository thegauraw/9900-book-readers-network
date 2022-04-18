import { FC, useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import BookThumbnailList from './BookThumbnailList';
import { BookThumbnail } from '../types/BookTypes';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';

interface RankingListBlockProps {
  callableFunction: Function;
  title: string;
}
const RankingListBlock: FC<RankingListBlockProps> = ({ callableFunction, title }) => {
  const [bookList, setBookList] = useState<BookThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await callableFunction();
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
        width: 'fit-content',
        p: 2,
        alignSelf: 'center',
      }}
    >
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading &&
        bookList &&
        isEmpty(error) &&
        (bookList.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1">{title}</Typography>
            <Divider />
            <BookThumbnailList bookList={bookList} isOverview={true} size={'medium'} />
          </Box>
        ) : (
          <></>
        ))}
    </Box>
  );
};

export default RankingListBlock;
