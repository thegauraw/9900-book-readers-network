import { FC, useContext, useState } from 'react';
import { Appctx } from '../utils/LocalContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Input,
  Button,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
} from '@mui/material';
import { createMonthlyGoal, updateMonthlyGoal, getMonthlyGoalStatus } from '../services/goalAPIs';

interface GoalEditProps {
  open: boolean;
  handleClick: Function;
  toCreate: boolean;
  numberOfBooksToRead: number;
}

const GoalEdit: FC<GoalEditProps> = ({ open, handleClick, toCreate, numberOfBooksToRead }) => {
  const context = useContext(Appctx);
  const { goals, setGoals, token } = context;
  const [value, setValue] = useState(numberOfBooksToRead);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.currentTarget.value));
  };

  const callableApi = toCreate ? createMonthlyGoal : updateMonthlyGoal;

  const onSubmit = () => {
    (async function () {
      try {
        handleClick(false);
        setGoals({ isLoading: true });
        await callableApi(token, value);
        const response = await getMonthlyGoalStatus(token);
        setGoals({ settlement: response, error: null });
      } catch (error) {
        setGoals({ error: error });
      } finally {
        setGoals({ isLoading: false });
      }
    })();
  };

  const onClose = () => {
    handleClick(false);
    setValue(numberOfBooksToRead);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="goal-edit-title">{'Set my monthly reading goal'}</DialogTitle>
      <DialogContent sx={{ mt: 3, mx: 2, px: 3 }}>
        <DialogContentText id="goal-edit-description">
          I would like to read{' '}
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              type: 'number',
            }}
            sx={{ textAlignLast: 'center' }}
          />{' '}
          book(s) per month.
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <RemoveIcon sx={{ mr: 2 }} />
            <Slider
              value={typeof value === 'number' ? value : 0}
              onChange={(event, newValue: number | number[]) => setValue(Number(newValue))}
            />
            <AddIcon sx={{ ml: 1 }} />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          pb: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            mr: 2,
            p: 1,
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          autoFocus
          sx={{
            mr: 2,
            p: 1,
          }}
        >
          {toCreate ? 'Create' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GoalEdit;
