import { FC, useState } from 'react';
import { Typography, Box, Button, Rating } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
interface RatingStatusProps {
  inEditing: boolean;
  lastUpdatedAt: string | null;
  ratingValue: number | null;
  setRatingValue: (value: number | null) => void;
  onStartReview: () => void;
}
const RatingStatus: FC<RatingStatusProps> = ({
  inEditing,
  lastUpdatedAt,
  ratingValue,
  setRatingValue,
  onStartReview,
}) => {
  const hasContent = !isEmpty(lastUpdatedAt);
  const contentAligned = hasContent ? 'space-between' : 'flex-start';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: contentAligned,
        alignItems: 'center',
        flexWrap: 'wrap-reverse',
        flexDirection: 'row',
        '& > legend': { display: 'inline-flex' },
        pb: 1,
      }}
    >
      <Rating
        name="rating"
        readOnly={!inEditing}
        value={ratingValue}
        onChange={(event, newRating) => {
          setRatingValue(newRating);
        }}
      />
      <Typography component="legend" variant="subtitle2">
        {inEditing ? (
          'In editing'
        ) : hasContent ? (
          `Last updated at ${lastUpdatedAt}`
        ) : (
          <Button variant="contained" onClick={onStartReview}>
            Write a review
          </Button>
        )}
      </Typography>
    </Box>
  );
};

export default RatingStatus;
