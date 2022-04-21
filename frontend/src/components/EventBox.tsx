import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  // Select,
  TextField,
  Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { EventFormData } from '../types/eventTypes';
import { format } from 'date-fns';


interface EventBoxProps {
  title: string | null;
  description: string | null;
  bookId: string | null;
  venue: string | null;
  eventTime: Date;
  mode: string;
  // submitHandler: ({ title, description, eventTime, venue, bookId }: EventFormData) => void | null;
  submitHandler: () => void | null;
  closeHandler: () => void | null;
}

const style = {
  actionButtons: {
    float: 'right',
  },
  spacedButton: {
    m: '5px',
  }
};

const EventBox: React.FC<EventBoxProps> = ({
  title,
  description,
  eventTime,
  venue,
  bookId,
  mode,
  submitHandler,
  closeHandler,
}) => {

  const handleSubmit = () => {
    submitHandler();
  };

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography id="modal-modal-title" variant="h3" component="h3">
            {title}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography component="span" sx={{ mr: 5, py: 4, float: 'left', width: '60%' }}>
            {description}
          </Typography>

          <Grid item xs={4} sx={{ mr: 5, py: 4, float: 'left', width: '60%' }}>
            <img src="https://via.placeholder.com/150" alt="`Book ${bookId}`" />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" component="div" sx={{ mr: 5, py: 2 }}>
            <b>When: </b>
            {format(new Date(eventTime), 'eee MMM d, yyyy p')}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" component="div" sx={{ mr: 5, py: 2 }}>
            <b>Where: </b>
            {venue}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={style.actionButtons}>
            {mode === 'participate' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={style.spacedButton}
              >
                Cancel my registration
              </Button>
            )}
            {mode !== 'participate' && mode !== 'past' && (
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                sx={style.spacedButton}
              >
                Register for this event
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={closeHandler}
              sx={style.spacedButton}
            >
              Back
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default EventBox;
