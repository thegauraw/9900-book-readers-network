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

interface EventFormProps {
  title: string | null;
  description: string | null;
  bookId: string | null;
  venue: string | null;
  eventTime: Date;
  mode: string;
  submitHandler: ({ title, description, eventTime, venue, bookId }: EventFormData) => void | null;
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

const EventForm: React.FC<EventFormProps> = ({ title, description, eventTime, venue, bookId, mode, submitHandler, closeHandler }) => {
  const [titleValue, setTitleValue] = React.useState(title);
  const [descriptionValue, setDescriptionValue] = React.useState(description);
  const [bookIdValue, setBookIdValue] = React.useState(bookId);
  const [venueValue, setVenueValue] = React.useState(venue);
  const [eventTimeValue, setEventTimeValue] = React.useState<Date | null>(new Date(eventTime));
  // const [eventTimeValue, setEventTimeValue] = React.useState<Date | null>(new Date());
  // const [eventTimeStrValue, setEventTimeStrValue] = React.useState(eventTime?.toString());

  const handleSubmit = () => {
    submitHandler({ title: titleValue, description: descriptionValue, eventTime: eventTimeValue, venue: venueValue, bookId: bookIdValue });
  };

  const handleBookSelect = (event: SelectChangeEvent) => {
    setBookIdValue(event.target.value as string);
  };

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {mode === 'edit' ? `Edit Event: '${title}'` : 'Add New Event'}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="title"
            label="Title"
            value={titleValue}
            onChange={(event) => {
              setTitleValue(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            id="description"
            label="Description"
            placeholder="Write something about the event"
            value={descriptionValue}
            onChange={(event) => {
              setDescriptionValue(event.target.value);
            }}
            multiline
            rows={6}
          />
        </Grid>

        <Grid item xs={12}>
          {/* <TextField
            fullWidth
            required
            id="eventTime"
            label="Event Time"
            value={eventTimeStrValue}
            onChange={(event) => {
              setEventTimeStrValue(event.target.value);
              // setEventTimeStrValue(new Date(event.target.value));
            }}
          /> */}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Time"
              // value=""
              value={eventTimeValue}
              onChange={(newValue) => {
                // setEventTimeValue(new Date(event.target.value));
                setEventTimeValue(newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="venue"
            label="Venue"
            value={venueValue}
            onChange={(event) => {
              setVenueValue(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="related-book-label">Book</InputLabel>
            <Select
              labelId="related-book-label"
              id="related-book"
              value={bookIdValue || ""}
              label="Book"
              onChange={handleBookSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="1">Harry Potter</MenuItem>
              <MenuItem value="20">The Alchemist</MenuItem>
            </Select>
            <FormHelperText>Select the book related to this event from the dropdown</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box sx={style.actionButtons}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={style.spacedButton}
            >
              {mode === 'edit' ? 'Update' : 'Create'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={closeHandler}
              sx={style.spacedButton}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventForm;
