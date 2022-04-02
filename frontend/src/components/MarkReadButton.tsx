import { FC, useContext, useCallback } from 'react';
import { Typography, Button } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import LoadingIndicator from './LoadingIndicator';
import { Appctx } from '../utils/LocalContext';
import { useParams } from 'react-router-dom';
import { setReadingStatus } from '../services/readingAPIs';

const MarkReadButton: FC = () => {
  const context = useContext(Appctx);
  const { bookId } = useParams();
  const { ownedReadingByBookId, setOwnedReadingByBookId, token } = context;
  const { settlement, isLoading, error } = ownedReadingByBookId;

  const onUpdateReadingStatus = useCallback(
    (hasRead: boolean) => {
      setOwnedReadingByBookId({ isLoading: true });
      setReadingStatus(hasRead, token, bookId)
        .then((data) => setOwnedReadingByBookId({ settlement: data }))
        .catch((error) => {
          setOwnedReadingByBookId({ error: error });
        })
        .finally(() => setOwnedReadingByBookId({ isLoading: false }));
    },
    [setReadingStatus]
  );
  {
    isLoading && <LoadingIndicator />;
  }
  {
    !isLoading && !isEmpty(error) && <Typography>{error}</Typography>;
  }
  if (settlement && settlement.has_read) {
    return (
      <Button variant="outlined" sx={{ mr: 1 }} onClick={() => onUpdateReadingStatus(false)}>
        Reset it unread
      </Button>
    );
  } else
    return (
      <Button variant="contained" sx={{ mr: 1 }} onClick={() => onUpdateReadingStatus(true)}>
        Mark it read
      </Button>
    );
};

export default MarkReadButton;
