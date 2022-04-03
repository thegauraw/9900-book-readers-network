import { FC, useState } from 'react';
import { Typography, Box, Button, Rating } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
interface RatingStatusProps {
  inEditing: boolean;
  lastUpdatedAt: string | null;
  ratingValue: number | null;
  username?: string;
  setRatingValue?: (value: number | null) => void;
  onStartReview?: () => void;
}
const RatingStatus: FC<RatingStatusProps> = ({
  inEditing,
  lastUpdatedAt,
  ratingValue,
  username,
  setRatingValue,
  onStartReview,
}) => {
  const hasContent = !isEmpty(lastUpdatedAt);
  const contentAligned = !inEditing && !hasContent ? 'flex-start' : 'space-between';
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
          if (setRatingValue) setRatingValue(newRating);
        }}
      />
      <Typography component="legend" variant="subtitle2">
        {inEditing ? (
          'In editing'
        ) : hasContent ? (
          username ? (
            `${username} posted it at ${lastUpdatedAt}`
          ) : (
            `Last updated at ${lastUpdatedAt}`
          )
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
