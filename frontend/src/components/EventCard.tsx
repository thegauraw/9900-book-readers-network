import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EventData } from '../types/eventTypes';
import EventView from './EventView';
import EventEdit from './EventEdit';
import EventDelete from './EventDelete';

import { format } from 'date-fns';


interface EventCardProps {
  event: EventData;
  buttonName: string;
  detailsPath: string;
  dataLoader: () => Promise<void>;
}

const style = {
  actionButtons: {
    float: 'right',
  },
  spacedButton: {
    display: 'flex',
    m: '5px',
  }
};

const EventCard: React.FC<EventCardProps> = ({ event, buttonName, detailsPath, dataLoader }) => {
  console.log(format(new Date(event.eventTime), 'MM/dd/yyyy'));

  let navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} lg={6}>
      <Card sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            // flexDirection: 'row',
            justifyContent: 'space-between',
            bgcolor: 'primary.main',
            px: 2,
            // py: 1,
            cursor: 'pointer',
            alignContent: 'center',
          }}
          // onClick={() => navigate(detailsPath)}
        >
          <Box>
            <Typography
              variant="h4"
              component="span"
              sx={{
                mr: 5,
                // py: 2,
              }}
            >
              {format(new Date(event.eventTime), 'eee MMM d, yyyy p')}
              {/* {event.eventTime} */}
            </Typography>
            <Typography variant="h3" component="span">
              {event.title}
            </Typography>
          </Box>
          <Box sx={style.spacedButton}>
            <EventView sx={style.spacedButton} eventId={event.id} dataLoader={dataLoader} />
            <EventEdit sx={style.spacedButton} eventId={event.id} dataLoader={dataLoader} />
            <EventDelete sx={style.spacedButton} eventId={event.id} dataLoader={dataLoader} />
          </Box>
        </Box>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: 5 }}
        >
          {event.description}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EventCard;
