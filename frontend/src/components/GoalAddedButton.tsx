import { FC, useState } from 'react';
import { Box, Button } from '@mui/material';
import GoalEdit from './GoalEdit';
import { iconSizes } from '../config/constants';
import AddIcon from '@mui/icons-material/Add';

const GoalAddedButton: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        mt: 'auto',
      }}
    >
      <Button
        variant={'text'}
        onClick={() => setOpen(!open)}
        sx={{
          display: 'flex',
          mt: 'auto',
        }}
      >
        <AddIcon sx={{ ...iconSizes.large, mr: 1 }} />
        Create my monthly reading goal
      </Button>
      <GoalEdit open={open} handleClick={setOpen} toCreate={true} numberOfBooksToRead={0} />
    </Box>
  );
};

export default GoalAddedButton;
