import * as React from 'react';
import { Appctx } from '../utils/LocalContext';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@mui/material';
import { deleteEvent } from '../services/eventAPIs';

interface EventEditProps {
  dataLoader: () => Promise<void>;
  eventId: string;
  sx: object;
}

const EventEdit: React.FC<EventEditProps> = ({ eventId, dataLoader, sx }) => {
  const context = React.useContext(Appctx);
  const { event, setEvent, token } = context;
  const { settlement, isLoading, error } = event;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log('deleting');
    console.log(eventId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = React.useCallback(() => {
    setEvent({ isLoading: true });
    deleteEvent(eventId, token)
      .then((data) => setEvent({ settlement: data }))
      .catch((error) => {
        setEvent({ error: error });
      })
      .finally(() => {
        setEvent({ isLoading: false });
        handleClose();
        dataLoader();
      });
  }, [deleteEvent]);

  return (
    <Grid item sx={sx} xs={12} sm={6} lg={4}>
      <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleOpen}></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{'Delete this event'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this event? You will not be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2 }}>
          <Button variant="outlined" sx={{ mr: 2, p: 1 }} onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus sx={{ mr: 2, p: 1 }}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EventEdit;
