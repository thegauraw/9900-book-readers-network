import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Paper } from '@mui/material';
import CollectionListOverview from '../components/CollectionListOverview';
import GoalOverview from '../components/GoalOverview';
import RankingList from '../components/RankingList';
import SearchBox from '../components/SearchBox';
const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  componentPaper: {
    display: 'flex',
    minHeight: '261.34px', //using the height of collection overview as a temp placeholder height
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Paper className={classes.componentPaper}>Profile</Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Paper className={classes.componentPaper} sx={{ flexDirection: 'column' }}>
            <SearchBox showFullResults={true} />
            <RankingList />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.componentPaper}>
            <CollectionListOverview />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.componentPaper}>
            <GoalOverview />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Paper className={classes.componentPaper}>Events</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
