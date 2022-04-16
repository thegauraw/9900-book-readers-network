import { FC, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import BookRatingReview from '../components/BookRatingReview';
import BookRatingReviewStat from '../components/BookRatingReviewStat';
import { Appctx } from '../utils/LocalContext';
import { NotFoundPath } from '../config/paths';
import { getBookDetailsApi } from '../services/searchAPIs';
import LoadingIndicator from '../components/LoadingIndicator';
import BookDetails from '../components/BookDetails';
import MarkReadButton from '../components/MarkReadButton';
import RecommendationList from '../components/RecommendationList';
const BookPage: FC = () => {
  const context = useContext(Appctx);
  let navigate = useNavigate();
  const { bookId } = useParams();
  const { bookDetails, setBookDetails } = context;
  const { settlement, isLoading, error } = bookDetails;

  useEffect(() => {
    if (isEmpty(bookId)) {
      navigate(NotFoundPath);
    } else {
      (async function () {
        if (bookId) {
          try {
            setBookDetails({ isLoading: true, settlement: null });
            const response = await getBookDetailsApi(bookId);
            setBookDetails({ settlement: response, error: null });
          } catch (error) {
            console.log('error page', error);
            setBookDetails({ error: error });
          } finally {
            setBookDetails({ isLoading: false });
          }
        }
      })();
    }
  }, []);

  const bookActions = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          alignItems: 'center',
          px: 6,
        }}
      >
        <BookRatingReviewStat />
        <MarkReadButton />
      </Box>
    );
  };

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading && !isEmpty(settlement) && isEmpty(error) && settlement && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <BookDetails
              title={settlement.volumeInfo.title}
              authors={settlement.volumeInfo.authors}
              bookCoverImg={settlement.volumeInfo.imageLinks?.smallThumbnail}
              categories={settlement.volumeInfo.categories}
              publisher={settlement.volumeInfo.publisher}
              publishedDate={settlement.volumeInfo.publishedDate}
            />
            {bookActions()}
          </Box>
          <BookRatingReview />
          <RecommendationList />
        </>
      )}
    </>
  );
};

export default BookPage;
