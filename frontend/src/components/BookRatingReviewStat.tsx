import { FC, useContext } from 'react';
import { Box, Typography, Rating, Divider } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import LoadingIndicator from './LoadingIndicator';
import { Appctx } from '../utils/LocalContext';
const BookRatingReviewStat: FC = () => {
  const context = useContext(Appctx);
  const { readingListByBookId } = context;
  const { settlement, isLoading, error } = readingListByBookId;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16px 0 0 20px',
      }}
    >
      {isLoading && <LoadingIndicator />}
      {!isLoading && !isEmpty(error) && <Typography>{error}</Typography>}
      {settlement && isEmpty(error) && (
        <>
          <Typography component="legend" variant="subtitle2">
            {settlement.countHasRead} reader(s) has read
          </Typography>
          <Divider orientation="vertical" light={true} sx={{ mx: 1 }} />
          <Typography component="legend" variant="subtitle2">
            {settlement.countValidRatings} ratings
          </Typography>
          <Divider orientation="vertical" light={true} sx={{ mx: 1 }} />
          <Typography component="legend" variant="subtitle2">
            {settlement.countValidReviews} reviews
          </Typography>
        </>
      )}
    </Box>
  );
};

export default BookRatingReviewStat;
