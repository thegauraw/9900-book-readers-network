import { FC } from 'react';
import { Typography, Box, Divider } from '@mui/material';

import BookRatingReviewList from './BookRatingReviewList';
import BookRatingReviewOwned from './BookRatingReviewOwned';

const BookRatingReview: FC = () => {
  return (
    <>
      <Box
        sx={{
          m: 4,
        }}
      >
        <Typography variant="subtitle1">MY ACTIVITY</Typography>
        <Divider />
        <Box
          sx={{
            my: 3,
          }}
        >
          <BookRatingReviewOwned />
        </Box>
        <Typography variant="subtitle1">COMMUNITY REVIEWS</Typography>
        <Divider />
        <Box
          sx={{
            my: 3,
          }}
        >
          <BookRatingReviewList />
        </Box>
      </Box>
    </>
  );
};

export default BookRatingReview;
