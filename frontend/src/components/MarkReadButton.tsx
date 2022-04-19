import { FC, useContext, useCallback, useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import LoadingIndicator from './LoadingIndicator';
import { Appctx } from '../utils/LocalContext';
import { useParams } from 'react-router-dom';
import { setReadingStatus } from '../services/readingAPIs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MarkReadButton: FC = () => {
  const context = useContext(Appctx);
  const { bookId } = useParams();
  const { ownedReadingByBookId, setOwnedReadingByBookId, token } = context;
  const { settlement, isLoading, error } = ownedReadingByBookId;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());

  const onUpdateReadingStatus = useCallback(
    (hasRead: boolean, readAt?: Date) => {
      setOwnedReadingByBookId({ isLoading: true });
      setReadingStatus(hasRead, token, bookId, readAt)
        .then((data) => setOwnedReadingByBookId({ settlement: data }))
        .catch((error) => {
          setOwnedReadingByBookId({ error: error });
        })
        .finally(() => setOwnedReadingByBookId({ isLoading: false }));
    },
    [setReadingStatus]
  );

  const handleSubmit = (hasRead: boolean) => {
    onUpdateReadingStatus(hasRead, value);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    setValue(new Date());
  };

  const pickReadDate = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="read-edit-title">{'I have read the book on ...'}</DialogTitle>
        <DialogContent sx={{ mt: 3, mx: 2, px: 3 }}>
          <DialogContentText id="read-edit-description" sx={{ pt: 1, pb: 2, px: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date Picker"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue ? new Date(newValue) : new Date());
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            pb: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              p: 1,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit(true)}
            autoFocus
            sx={{
              mr: 2,
              p: 1,
            }}
          >
            Mark it read
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  {
    isLoading && <LoadingIndicator />;
  }
  {
    !isLoading && !isEmpty(error) && <Typography>{error}</Typography>;
  }
  if (settlement && settlement.has_read) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleSubmit(false)}>
          Reset it unread
        </Button>
        <Typography gutterBottom variant="subtitle2" component="div">
          You have read it on {settlement.last_update_read_at}.
        </Typography>
      </Box>
    );
  } else
    return (
      <>
        <Button variant="contained" sx={{ mr: 1, width: '200px' }} onClick={() => setOpen(true)}>
          Mark it read
        </Button>
        {pickReadDate()}
      </>
    );
};

export default MarkReadButton;
