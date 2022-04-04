import { FC, useState, useContext } from 'react';
import { Box, Grid, InputBase, InputAdornment, IconButton, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import isEmpty from 'lodash/isEmpty';
import { Appctx } from '../utils/LocalContext';
import { useSearchParams } from 'react-router-dom';
interface SearchBoxProps {
  //Unused variable
  //In case we want to search without jumping to a new page.
  //If showFullResults == false, we can call search api and show brief results here.
  showFullResults: boolean;
}
const SearchBox: FC<SearchBoxProps> = ({ showFullResults }) => {
  const context = useContext(Appctx);
  let [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('q') ?? '');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      if (!isEmpty(input)) setSearchParams({ q: input, by: 'all' });
    }
  };

  const handleShowFullResultsSearch = () => {
    if (!isEmpty(input)) setSearchParams({ q: input, by: 'all' });
  };

  return (
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
  );
};

export default SearchBox;
