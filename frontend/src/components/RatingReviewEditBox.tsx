import { FC, useState } from 'react';
import { Paper, OutlinedInput } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import { RatingAndReviewForm } from '../types/ReadingTypes';
import FoldableContent from './FoldableContent';
import ReviewEditButtons from './ReviewEditButtons';
import RatingStatus from './RatingStatus';
interface RatingReviewEditBoxProps {
  rating: number | null;
  review: string | null;
  lastUpdatedAt: string | null;
  handleSubmitData: ({ rating, review }: RatingAndReviewForm) => void | null;
  handleDelete: () => void | null;
}
const RatingReviewEditBox: FC<RatingReviewEditBoxProps> = ({
  rating,
  review,
  lastUpdatedAt,
  handleSubmitData,
  handleDelete,
}) => {
  const [hasContent, setHasContent] = useState(!isEmpty(lastUpdatedAt));
  const [ratingValue, setRatingValue] = useState<number | null>(rating);
  const [reviewValue, setReviewValue] = useState<string | null>(review);
  const [inEditing, setInEditing] = useState<boolean>(false);
  const onSubmit = () => {
    console.log(ratingValue, reviewValue, inEditing);
    //handleSubmitData(data);
    setHasContent(true);
    setRatingValue(ratingValue);
    setReviewValue(reviewValue);
    setInEditing(false);
    handleSubmitData({ rating: ratingValue, review: reviewValue });
  };

  const onDelete = () => {
    setHasContent(false);
    setInEditing(false);
    setRatingValue(null);
    setReviewValue(null);
    handleDelete();
  };

  const onEdit = () => {
    setInEditing(true);
    setHasContent(true);
  };

  const onCancel = () => {
    setInEditing(false);
    setRatingValue(rating);
    setReviewValue(review);
    setHasContent(!isEmpty(lastUpdatedAt));
  };

  const reviewContent = () => {
    return (
      <>
        {!inEditing ? (
          <FoldableContent content={reviewValue} />
        ) : (
          <OutlinedInput
            id="review"
            disabled={!inEditing}
            value={reviewValue}
            fullWidth={true}
            multiline
            onChange={(event) => {
              setReviewValue(event.target.value);
            }}
          />
        )}
      </>
    );
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
      }}
    >
      <RatingStatus
        inEditing={inEditing}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        lastUpdatedAt={lastUpdatedAt}
        onStartReview={onEdit}
      />
      {hasContent && (
        <>
          {reviewContent()}
          <ReviewEditButtons
            inEditing={inEditing}
            onCancel={onCancel}
            onDelete={onDelete}
            onEdit={onEdit}
            onSubmit={onSubmit}
          />
        </>
      )}
    </Paper>
  );
};

export default RatingReviewEditBox;
