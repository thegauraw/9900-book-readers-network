import { FC, useContext, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import GoalItem from '../components/GoalItem';
import LoadingIndicator from '../components/LoadingIndicator';
import GoalAddedButton from '../components/GoalAddedButton';
import { Appctx } from '../utils/LocalContext';
import { getMonthlyGoalStatus } from '../services/goalAPIs';
const GoalPage: FC = () => {
  const context = useContext(Appctx);
  const { goals, setGoals, token } = context;
  const { settlement, isLoading, error } = goals;

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

  return (
    <Box sx={{ display: 'flex', p: 2, width: '100%' }}>
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading &&
        settlement &&
        isEmpty(error) &&
        (settlement.length > 0 ? (
          settlement.map((goal, index) => {
            if (index === 0)
              return <GoalItem isOverview={false} isCurrent={true} goal={goal} key={goal.month} />;
            else
              return <GoalItem isOverview={false} isCurrent={false} goal={goal} key={goal.month} />;
          })
        ) : (
          <GoalAddedButton />
        ))}
    </Box>
  );
};

export default GoalPage;
