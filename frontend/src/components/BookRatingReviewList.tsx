import { FC, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
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
  const { readingListByBookId, setReadingListByBookId, token } = context;
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
  }, []);
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
        settlement.map(({ rating, review, last_update_review_rating_at }) => {
          if (!isEmpty(review) || !isEmpty(rating))
            return (
              <Box
                sx={{
                  mb: 2,
                }}
              >
                <RatingStatus
                  inEditing={false}
                  ratingValue={rating}
                  lastUpdatedAt={last_update_review_rating_at}
                />
                <FoldableContent content={review} />
              </Box>
            );
          else return <></>;
        })}
    </Box>
  );
};

export default BookRatingReviewList;
