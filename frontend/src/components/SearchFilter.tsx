import { FC, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const SearchFilter: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('min') ?? '0');

  const handleChange = (selectedValue: string) => {
    setValue(selectedValue);
    const newParams = {
      q: searchParams.get('q') ?? '',
      by: searchParams.get('by') ?? 'all',
      p: searchParams.get('p') ?? '1',
      min: selectedValue,
    };
    setSearchParams(newParams);
  };

  return (
    <FormControl
      size="small"
      sx={{
        m: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FormHelperText>Filter by the average rating</FormHelperText>
      <Select
        value={value}
        onChange={(event) => handleChange(event?.target?.value ?? '0')}
        sx={{ minWidth: '150px' }}
      >
        <MenuItem value={'0'}>None</MenuItem>
        <MenuItem value={'4.5'}>Over 4.5</MenuItem>
        <MenuItem value={'4'}>Over 4.0</MenuItem>
        <MenuItem value={'3.5'}>Over 3.5</MenuItem>
        <MenuItem value={'3'}>Over 3.0</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SearchFilter;
