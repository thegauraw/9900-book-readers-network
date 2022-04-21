import * as React from 'react';
import { Appctx } from '../utils/LocalContext';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Modal } from '@mui/material';
import { getEventById, updateEvent } from '../services/eventAPIs';
import { EventData, EventFormData } from '../types/eventTypes';
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
};

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
    (async function () {
      try {
        setEvent({ isLoading: true, settlement: null });
        const response = await getEventById(eventId, token);
        setEvent({ settlement: response, error: null });
      } catch (error) {
        setEvent({ error: null });
      } finally {
        setEvent({ isLoading: false });
        setOpen(true);
      }
    })();
  };
  const handleClose = () => setOpen(false);

  const handleSubmitData = React.useCallback(
    ({ title, description, eventTime, venue, bookId }: EventFormData) => {
      setEvent({ isLoading: true });
      updateEvent({ title, description, eventTime, venue, bookId }, eventId, token)
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
    [updateEvent]
  );

  return (
    <Grid item sx={sx} xs={12} sm={6} lg={4}>
      <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-edit-event"
        aria-describedby="modal-edit-event"
      >
        <Box sx={style.modal}>
          <EventForm
            title={settlement?.title || ''}
            description={settlement?.description || ''}
            eventTime={settlement?.eventTime || new Date()}
            venue={settlement?.venue || ''}
            bookId={settlement?.bookId || ''}
            submitHandler={handleSubmitData}
            closeHandler={handleClose}
            mode="edit"
          />
        </Box>
      </Modal>
    </Grid>
  );
};

export default EventEdit;
