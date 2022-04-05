import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Paper } from '@mui/material';
import CollectionsOverview from '../components/CollectionsOverview';
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
          <Paper className={classes.componentPaper}>Search</Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.componentPaper}>
            <CollectionsOverview />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.componentPaper}>Goal</Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Paper className={classes.componentPaper}>Events</Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
