import { FC, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import BookRatingReview from '../components/BookRatingReview';
import { Appctx } from '../utils/LocalContext';
import { NotFoundPath } from '../config/paths';

const BookPage: FC = () => {
  const context = useContext(Appctx);
  let navigate = useNavigate();
  const { bookId } = useParams();
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
