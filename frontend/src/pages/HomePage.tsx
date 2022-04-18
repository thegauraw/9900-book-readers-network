import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import CollectionListOverview from '../components/CollectionListOverview';
import GoalOverview from '../components/GoalOverview';
import RankingList from '../components/RankingList';
import SearchBox from '../components/SearchBox';
import ProfileOverview from '../components/ProfileOverview';
import BadgesList from '../components/BadgesList';
import { NavMenuList } from '../config/paths';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) => ({
  mainContainer: {
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
  },
  componentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 2,
  },
  componentPaper: {
    display: 'flex',
    margin: theme.spacing(2),
    flexDirection: 'column',
    width: '88.5%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  componentPaperHalf: {
    display: 'flex',
    height: '300px',
    overflow: 'auto',
    width: '40%',
    minWidth: '550px',
    margin: theme.spacing(2),
    flexDirection: 'column',
  },
}));

const HomePage: React.FC = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.componentPaper}>
        <SearchBox showFullResults={true} />
        <RankingList />
      </Box>
      <Box className={classes.componentContainer}>
        <Paper className={classes.componentPaperHalf}>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'primary.main',
              px: 2,
              py: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" component="div">
              My Profile
            </Typography>
            <Button
              variant="outlined"
              sx={{
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
              }}
              onClick={() => navigate(NavMenuList.Profiles)}
            >
              View Details
            </Button>
          </Box>
          <Box sx={{ alignSelf: 'center' }}>
            <ProfileOverview />
          </Box>
        </Paper>
        <Paper className={classes.componentPaperHalf} sx={{ p: 2 }}>
          <Typography variant="subtitle1">MY ACHIEVEMENTS</Typography>
          <Divider />
          <BadgesList />
        </Paper>
      </Box>
      <Box className={classes.componentContainer}>
        <Paper className={classes.componentPaperHalf}>
          <CollectionListOverview />
        </Paper>
        <Paper className={classes.componentPaperHalf}>
          <GoalOverview />
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;
