import * as React from 'react';
import { Appctx } from '../utils/LocalContext';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
} from '@mui/material';
import { createEvent } from '../services/eventAPIs';
import { EventFormData } from '../types/eventTypes';
import EventForm from './EventForm';

const style = {
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  actionButton: {
    float: 'right',
  },
};

interface EventNewProps {
  dataLoader: () => Promise<void>;
}

const EventNew: React.FC<EventNewProps> = ({dataLoader}) => {
  const context = React.useContext(Appctx);
  const { event, setEvent, token } = context;
  const { settlement, isLoading, error } = event;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitData = React.useCallback(
    ({ title, description, eventTime, venue, bookId }: EventFormData) => {
      setEvent({ isLoading: true });
      createEvent({ title, description, eventTime, venue, bookId }, token)
        .then((data) => setEvent({ settlement: data }))
        .catch((error) => {
          setEvent({ error: error });
        })
        .finally(() => {
          setEvent({ isLoading: false });
          handleClose();
          dataLoader();
      });
    },
    [createEvent]
  );

  return (
    <Grid item xs={12} sm={6}>
      <Card sx={{ width: '100%' }}>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 12 }}
        >
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
            Add New Event
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-new-event"
        aria-describedby="modal-new-event"
      >
        <Box sx={style.modal}>
          <EventForm title="" description="" eventTime={new Date(new Date().getTime()+(7*24*60*60*1000))} venue="" bookId="" submitHandler={handleSubmitData} closeHandler={handleClose} mode="add" />
        </Box>
      </Modal>
    </Grid>
  );
};

export default EventNew;
