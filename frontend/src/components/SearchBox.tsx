import { FC, useState } from 'react';
import {
  Box,
  FormControl,
  InputBase,
  InputAdornment,
  IconButton,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import isEmpty from 'lodash/isEmpty';
import { useSearchParams, createSearchParams, useNavigate } from 'react-router-dom';
import { NavMenuList } from '../config/paths';
interface SearchBoxProps {
  //Unused variable
  //In case we want to search without jumping to a new page.
  //If showFullResults == false, we can call search api and show brief results here.
  showFullResults: boolean;
}
const SearchBox: FC<SearchBoxProps> = ({ showFullResults }) => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('q') ?? '');
  const [method, setMethod] = useState(searchParams.get('by') ?? 'all');

  const handleChange = (event: any) => {
    setMethod(event?.target?.value ?? '');
  };
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      if (!isEmpty(input))
        navigate({
          pathname: NavMenuList.Explore,
          search: createSearchParams({
            q: input,
            by: method,
          }).toString(),
        });
    }
  };

  const handleShowFullResultsSearch = () => {
    if (!isEmpty(input))
      navigate({
        pathname: NavMenuList.Explore,
        search: createSearchParams({
          q: input,
          by: method,
        }).toString(),
      });
  };

  return (
    <Paper sx={{ p: 2 }} elevation={0}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <InputBase
          sx={{
            border: '1px solid',
            borderRadius: 2,
            width: '100%',
            borderColor: 'primary.main',
            backgroundColor: 'background.default',
          }}
          placeholder="Search books"
          inputProps={{ 'aria-label': 'search books' }}
          autoFocus={showFullResults}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyPress}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  ml: 1,
                  color: 'primary.main',
                }}
              />
            </InputAdornment>
          }
          endAdornment={
            input ? (
              <IconButton aria-label="clear" size="small" onClick={handleClear}>
                <CancelIcon color="disabled" />
              </IconButton>
            ) : null
          }
        />
        <Button
          variant="contained"
          onClick={handleShowFullResultsSearch}
          sx={{
            ml: 2,
            px: 3,
            py: 1,
          }}
        >
          Search
        </Button>
      </Box>
      <FormControl sx={{ pt: 1, pl: 1 }}>
        <RadioGroup
          row
          name="search-buttons-group"
          sx={{ color: 'primary.secondary' }}
          value={method}
          onChange={handleChange}
        >
          <FormControlLabel value="all" control={<Radio size={'small'} />} label="all" />
          <FormControlLabel value="books" control={<Radio size={'small'} />} label="title" />
          <FormControlLabel value="authors" control={<Radio size={'small'} />} label="author" />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default SearchBox;
