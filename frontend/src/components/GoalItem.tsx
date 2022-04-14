import { FC, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import BookThumbnailList from './BookThumbnailList';
import { useNavigate } from 'react-router-dom';
import { NavMenuList } from '../config/paths';
import { MonthlyGoalStatus } from '../types/GoalTypes';
import GoalEdit from './GoalEdit';
import EditIcon from '@mui/icons-material/Edit';
import { iconSizes } from '../config/constants';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface GoalItemProps {
  isOverview: boolean;
  isCurrent: boolean;
  goal: MonthlyGoalStatus;
}

const GoalItem: FC<GoalItemProps> = ({ isOverview, isCurrent, goal }) => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const bookList = isOverview ? goal.book_list.slice(0, 3) : goal.book_list;
  const goalHeader = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Typography variant="h4" component="span" sx={{ color: 'primary.main', mr: 1 }}>
            {goal.month}
          </Typography>
          <Typography variant="h4" component="span" sx={{ color: 'secondary.main' }}>
            {'| '}Read {goal.goal_num} book(s) per month
          </Typography>
        </Box>
        {isCurrent && (
          <Button
            variant={isOverview ? 'outlined' : 'contained'}
            onClick={() => setOpen(!open)}
            sx={{
              display: 'flex',
            }}
          >
            <EditIcon sx={{ ...iconSizes.small, mr: 1 }} />
            Edit My Goal
          </Button>
        )}
        {isCurrent && (
          <GoalEdit
            open={open}
            handleClick={setOpen}
            toCreate={false}
            numberOfBooksToRead={goal.goal_num}
          />
        )}
      </Box>
    );
  };

  const goalStatus = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MenuBookIcon />
          <Typography variant="subtitle1" component="div">
            {` ${goal.read_num} book(s) has read.`}
          </Typography>
        </Box>
        <Typography variant="subtitle1" component="div">
          {goal.finish
            ? `Congratulation! You've achieved your monthly goal on ${goal.finish_date}.`
            : `${goal.goal_num - goal.read_num} more book(s) to reach your goal!`}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 2,
        px: 2,
        width: '100%',
      }}
    >
      {goalHeader()}
      <BookThumbnailList
        bookList={bookList}
        isOverview={isOverview}
        detailPath={NavMenuList.Goals}
      />
      {goalStatus()}
    </Box>
  );
};

export default GoalItem;
