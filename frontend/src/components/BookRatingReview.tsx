import { FC, useContext, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import RatingReviewEditBox from './RatingReviewEditBox';
import LoadingIndicator from './LoadingIndicator';
import { Appctx } from '../utils/LocalContext';
import { useParams } from 'react-router-dom';
import { RatingAndReviewForm } from '../types/ReadingTypes';
import { setReviewAndRating, deleteReviewAndRating } from '../services/readingAPIs';
import MarkReadButton from './MarkReadButton';

const BookRatingReview: FC = () => {
  const context = useContext(Appctx);
  const { bookId } = useParams();
  const { ownedReadingByBookId, setOwnedReadingByBookId, token } = context;
  const { settlement, isLoading, error } = ownedReadingByBookId;
  //TODO:Check if the book exists in our database, if not, return 404 page.

  const onSubmit = useCallback(
    ({ rating, review }: RatingAndReviewForm) => {
      setOwnedReadingByBookId({ isLoading: true });
      setReviewAndRating({ rating, review }, token, bookId)
        .then((data) => setOwnedReadingByBookId({ settlement: data }))
        .catch((error) => {
          setOwnedReadingByBookId({ error: error });
        })
        .finally(() => setOwnedReadingByBookId({ isLoading: false }));
    },
    [setReviewAndRating]
  );

  const onDelete = useCallback(() => {
    setOwnedReadingByBookId({ isLoading: true });
    deleteReviewAndRating(token, bookId)
      .then((data) => setOwnedReadingByBookId({ settlement: {} }))
      .catch((error) => {
        setOwnedReadingByBookId({ error: error });
      })
      .finally(() => setOwnedReadingByBookId({ isLoading: false }));
  }, [deleteReviewAndRating]);
  {
    isLoading && <LoadingIndicator />;
  }
  {
    !isLoading && !isEmpty(error) && <Typography>{error}</Typography>;
  }

  if (settlement && settlement.has_read) {
    return (
      <RatingReviewEditBox
        rating={settlement.rating}
        review={settlement.review}
        lastUpdatedAt={settlement.last_update_review_rating_at}
        handleSubmitData={onSubmit}
        handleDelete={onDelete}
      />
    );
  } else
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'flex-start',
          m: 2,
          alignItems: 'center',
        }}
      >
        <MarkReadButton />
        <Typography variant="subtitle1">Mark it as read and write a review</Typography>
      </Box>
    );
};

export default BookRatingReview;
