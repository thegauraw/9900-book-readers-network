import { FC, useContext, useEffect } from 'react';
import { Typography, Grid, Box, Button } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import RatingReviewEditBox from '../components/RatingReviewEditBox';
import LoadingIndicator from '../components/LoadingIndicator';
import { Appctx } from '../utils/LocalContext';
import { useNavigate, useParams } from 'react-router-dom';
import { RatingAndReviewForm } from '../types/ResponseTypes';
const reviewByBookIdFromOwner = {
  username: 'userCurrentLoggedIn',
  has_read: true,
  last_update_read_at: 'Jan 1, 2022',
  last_update_review_rating_at: 'Jan 1, 2022',
  rating: 5.0,
  review:
    'Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines Test multiple lines ',
};

const recentReviewsListByBookId = [
  {
    last_update_review_rating_at: '2022-03-30T22:28:51.253547',
    rating: 5.0,
    username: 'userA',
    review: 'very good',
  },
  {
    last_update_review_rating_at: '2022-03-30T20:28:51.253547',
    rating: 4.0,
    username: 'userB',
    review: null,
  },
  {
    last_update_review_rating_at: '2022-03-30T12:28:51.253547',
    rating: null,
    username: 'userC',
    review: 'No rating',
  },
];
const BookPage: FC = () => {
  const context = useContext(Appctx);
  const { bookId } = useParams();
  //TODO:Check if the book exists in our database, if not, return 404 page.

  const onSubmit = ({ rating, review }: RatingAndReviewForm) => {
    console.log('Post the review and rating', rating, review);
    //handleSubmitData(data);
  };
  if (reviewByBookIdFromOwner.has_read) {
    return (
      <RatingReviewEditBox
        rating={reviewByBookIdFromOwner.rating}
        review={reviewByBookIdFromOwner.review}
        lastUpdatedAt={reviewByBookIdFromOwner.last_update_review_rating_at}
        handleSubmitData={onSubmit}
      />
    );
  } else return <Button>Mark it as read and write a review</Button>;
};

export default BookPage;
