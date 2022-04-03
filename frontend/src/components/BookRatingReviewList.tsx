import { FC, useEffect, useContext } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import FoldableContent from './FoldableContent';
import LoadingIndicator from './LoadingIndicator';
import RatingStatus from './RatingStatus';
import { Appctx } from '../utils/LocalContext';
import { useParams } from 'react-router-dom';
import { getReadingListByBookId } from '../services/readingAPIs';
const BookRatingReviewList: FC = () => {
  const context = useContext(Appctx);
  const { bookId } = useParams();
  const { ownedReadingByBookId, readingListByBookId, setReadingListByBookId, token } = context;
  const { settlement, isLoading, error } = readingListByBookId;
  useEffect(() => {
    (async function () {
      try {
        setReadingListByBookId({ isLoading: true, settlement: null });
        const response = await getReadingListByBookId(bookId, token);
        setReadingListByBookId({ settlement: response, error: null });
      } catch (error) {
        setReadingListByBookId({ error: error });
      } finally {
        setReadingListByBookId({ isLoading: false });
      }
    })();
  }, [ownedReadingByBookId]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isLoading && <LoadingIndicator />}
      {!isLoading && !isEmpty(error) && <Typography>{error}</Typography>}
      {settlement &&
        settlement.readings.map(({ rating, review, last_update_review_rating_at, username }) => {
          if (last_update_review_rating_at !== null)
            return (
              <Paper
                sx={{
                  mb: 2,
                  p: 1,
                }}
                key={username}
                elevation={1}
              >
                <RatingStatus
                  inEditing={false}
                  ratingValue={rating}
                  username={username}
                  lastUpdatedAt={last_update_review_rating_at}
                />
                <FoldableContent content={review} />
              </Paper>
            );
          else return <></>;
        })}
    </Box>
  );
};

export default BookRatingReviewList;
