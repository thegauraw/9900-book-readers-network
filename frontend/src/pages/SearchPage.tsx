import { FC, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import SearchResultFullList from '../components/SearchResultFullList';
import { Appctx } from '../utils/LocalContext';
import { Box, Grid } from '@mui/material';
import { SearchParams, SearchMethods } from '../types/SearchTypes';
import { searchBooksApi } from '../services/searchAPIs';
const SearchPage: FC = () => {
  const context = useContext(Appctx);
  let [searchParams, setSearchParams] = useSearchParams();
  const { setSearchResultList } = context;

  useEffect(() => {
    (async function () {
      const query = searchParams.get('q');
      if (query) {
        const toSearch: SearchParams = {
          q: query,
          by: searchParams.get('by') as SearchMethods,
          p: searchParams.get('p'),
          min: searchParams.get('min'),
        };
        try {
          setSearchResultList({ isLoading: true, settlement: null });
          const response = await searchBooksApi(toSearch);
          setSearchResultList({ settlement: response, error: null });
        } catch (error) {
          setSearchResultList({ error: error });
        } finally {
          setSearchResultList({ isLoading: false });
        }
      }
    })();
  }, [
    searchParams.get('q'),
    searchParams.get('p'),
    searchParams.get('by'),
    searchParams.get('min'),
  ]);

  const searchBoxOnly = () => (
    <Grid
      container
      sx={{
        height: '100vh',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Grid item xs={10} md={8} lg={7} xl={5}>
        <SearchBox showFullResults={true} />
      </Grid>
    </Grid>
  );

  const searchWithResults = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        p: 4,
      }}
    >
      <SearchBox showFullResults={true} />
      <SearchResultFullList />
    </Box>
  );
  return <>{searchParams.has('q') ? searchWithResults() : searchBoxOnly()}</>;
};

export default SearchPage;
