import { FC, useContext, useEffect, useState } from 'react';
import { Typography, Breadcrumbs, Box, Link, Paper } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import LoadingIndicator from '../components/LoadingIndicator';
import { getCollectedBooksList } from '../services/bookAPIs';
import { Appctx } from '../utils/LocalContext';
import { BookThumbnail } from '../types/BookTypes';
import { useParams, useNavigate } from 'react-router-dom';
import { NavMenuList, NotFoundPath } from '../config/paths';
import BookThumbnailItem from '../components/BookThumbnailItem';
import CollectedBookDelete from '../components/CollectedBookDelete';
const CollectedBooksPage: FC = () => {
  const context = useContext(Appctx);
  const { token } = context;
  const [bookList, setBookList] = useState<BookThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState('');
  const { collectionId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        if (!collectionId) {
          navigate(NavMenuList.MyCollections);
        } else {
          setIsLoading(true);
          const response = await getCollectedBooksList(token, collectionId);
          setBookList(response);
        }
      } catch (error) {
        setError(error as string);
        navigate(NotFoundPath, { state: { error: error } });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [collectionId, reload]);

  const bookListBlock = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
        {bookList.map((book) => (
          <Paper
            key={book.volume_id}
            sx={{
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '200px',
              p: 2,
              m: 2,
            }}
          >
            <BookThumbnailItem book={book} isOverview={false} size={'large'} />
            <CollectedBookDelete
              volumeId={book.volume_id}
              setIsLoading={setIsLoading}
              title={book.title}
              reload={reload}
              setReload={setReload}
            />
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 3,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={NavMenuList.MyCollections}>
          My Collections
        </Link>
        <Typography color="text.primary">{collectionId}</Typography>
      </Breadcrumbs>
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading &&
        bookList &&
        isEmpty(error) &&
        (bookList.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            {bookListBlock()}
          </Box>
        ) : (
          <Typography variant="h4" component="span" sx={{ color: 'primary.main', mr: 1 }}>
            No Books inside
          </Typography>
        ))}
    </Box>
  );
};

export default CollectedBooksPage;
