import { Box, Typography } from '@mui/material';

const SearchNotFound = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h3">No more results.</Typography>
      <Typography variant="h3">Try different keywords.</Typography>
    </Box>
  );
};

export default SearchNotFound;
