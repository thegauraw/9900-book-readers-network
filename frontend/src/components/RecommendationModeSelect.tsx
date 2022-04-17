import { FC } from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { RecommendationModes } from '../types/SearchTypes';

interface RecommendationModeSelectProps {
  value: RecommendationModes;
  handleChange: Function;
}
const RecommendationModeSelect: FC<RecommendationModeSelectProps> = ({ value, handleChange }) => {
  return (
    <FormControl
      size="small"
      sx={{
        m: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Select
        value={value}
        onChange={(event) =>
          handleChange((event?.target?.value as RecommendationModes) ?? RecommendationModes.title)
        }
        sx={{ minWidth: '240px' }}
      >
        <MenuItem value={RecommendationModes.title}>Similar Books</MenuItem>
        <MenuItem value={RecommendationModes.author}>Recommend By Author</MenuItem>
        <MenuItem value={RecommendationModes.category}>Recommend By Category</MenuItem>
        <MenuItem value={RecommendationModes.publisher}>Recommend By Publisher</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RecommendationModeSelect;
