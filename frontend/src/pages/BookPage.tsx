import { FC, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import BookRatingReview from '../components/BookRatingReview';
import LoadingIndicator from '../components/LoadingIndicator';
import { Appctx } from '../utils/LocalContext';
import { getReadingByBookIdForOwner } from '../services/readingAPIs';
import { NotFoundPath } from '../config/paths';

const BookPage: FC = () => {
  const context = useContext(Appctx);
  let navigate = useNavigate();
  const { bookId } = useParams();
  const { ownedReadingByBookId, setOwnedReadingByBookId, token } = context;
  const { settlement, isLoading, error } = ownedReadingByBookId;
  //TODO: Add the book detail
  //TODO: Add "Mark it as read" button

  useEffect(() => {
    if (isEmpty(bookId)) {
      navigate(NotFoundPath);
    }
    //TODO: Check if the book exists in our database, if not, return 404 page.
  }, []);

  return (
    <>
      <BookRatingReview />
    </>
  );
};

export default BookPage;
