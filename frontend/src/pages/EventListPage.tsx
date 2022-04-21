import { FC, useState, useContext, useEffect, } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import EventCard from '../components/EventCard';
import EventNew from '../components/EventNew';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchEventListData } from '../services/eventAPIs';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
import { EventData } from '../types/eventTypes';

// for tabs
import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const EventListPage: FC = () => {
  const context = useContext(Appctx);
  const { eventList, setEventList, token } = context;
  const { settlement, isLoading } = eventList;

  const [value, setValue] = useState('upcoming');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const fetchMyEvents = async function () {
    try {
      setEventList({ isLoading: true, settlement: null });
      const response = await fetchEventListData(token, value);
      setEventList({ settlement: response });
    } catch (error) {
      setEventList({ settlement: error });
    } finally {
      setEventList({ isLoading: false });
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [value]);

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
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upcoming" value="upcoming" />
              <Tab label="Past" value="past" />
              <Tab label="Participation" value="participate" />
              <Tab label="My" value="organise" />
              <EventNew dataLoader={fetchMyEvents} />
            </TabList>
          </Box>
          <TabPanel value={value}>
            {isLoading && <LoadingIndicator />}
            {!isLoading && settlement && settlement instanceof Error && (
              <Typography>{(settlement as Error).message}</Typography>
            )}
            {settlement && !(settlement instanceof Error) && !isEmpty(settlement[0]) && !isLoading && (
              <Grid container spacing={2}>
                {eventCards(settlement)}
              </Grid>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default EventListPage;
