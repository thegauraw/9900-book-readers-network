import { FC, useCallback, useContext, useEffect, } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import EventCard from '../components/EventCard';
import EventNew from '../components/EventNew';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchEventListData } from '../services/eventAPIs';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
import { EventData } from '../types/eventTypes';

const EventListPage: FC = () => {
  const context = useContext(Appctx);
  const { eventList, setEventList, token } = context;
  const { settlement, isLoading } = eventList;

  const fetchMyEvents = useCallback(async function () {
    try {
      setEventList({ isLoading: true, settlement: null });
      const response = await fetchEventListData(token);
      // console.log('this is resposne');
      // console.log(response)
      setEventList({ settlement: response });
    } catch (error) {
      setEventList({ settlement: error });
    } finally {
      setEventList({ isLoading: false });
    }
  }, [fetchEventListData]);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const eventCards = (myEvents: EventData[]) => {
    return myEvents.map((event) => (
      <Grid item key={event.id} xs={12}>
        <EventCard
          event={event}
          buttonName={'Details'}
          detailsPath={`${NavMenuList.Events}?id=${event.id}`}
          dataLoader={fetchMyEvents}
        />
      </Grid>
    ));
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', p: 2 }}>
      {isLoading && <LoadingIndicator />}
      {!isLoading && settlement && settlement instanceof Error && (
        <Typography>{(settlement as Error).message}</Typography>
      )}
      {settlement && !(settlement instanceof Error) && !isEmpty(settlement[0]) && !isLoading && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h2" component="h6">
              Upcoming events
            </Typography>
          </Grid>

          {eventCards(settlement)}
          <EventNew dataLoader={fetchMyEvents} />
        </Grid>
      )}
    </Box>
  );
};

export default EventListPage;
