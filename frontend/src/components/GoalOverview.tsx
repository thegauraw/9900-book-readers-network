import { FC, useContext, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import GoalItem from './GoalItem';
import GoalAddedButton from './GoalAddedButton';
import LoadingIndicator from './LoadingIndicator';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
import { getMonthlyGoalStatus } from '../services/goalAPIs';
import { useNavigate } from 'react-router-dom';
const GoalOverview: FC = () => {
  const context = useContext(Appctx);
  const { goals, setGoals, token } = context;
  const { settlement, isLoading, error } = goals;
  let navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        setGoals({ isLoading: true, settlement: null });
        const response = await getMonthlyGoalStatus(token);
        setGoals({ settlement: response, error: null });
      } catch (error) {
        setGoals({ error: error });
      } finally {
        setGoals({ isLoading: false });
      }
    })();
  }, []);

  const goalHeader = () => {
    return (
      <Box
        sx={{
          width: '100%',
          bgcolor: 'primary.main',
          p: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto',
        }}
      >
        <Typography variant="h4" component="div">
          My Reading Goal
        </Typography>
        <Button
          variant="outlined"
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            p: 1,
          }}
          onClick={() => navigate(NavMenuList.Goals)}
        >
          View Details
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading && settlement && isEmpty(error) && (
        <>
          {settlement.length > 0 ? (
            <GoalItem
              isOverview={true}
              isCurrent={true}
              goal={settlement[0]}
              key={settlement[0].month}
            />
          ) : (
            <GoalAddedButton />
          )}
          {goalHeader()}
        </>
      )}
    </Box>
  );
};

export default GoalOverview;
