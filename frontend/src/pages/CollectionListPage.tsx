import { FC, useCallback, useContext, useEffect, } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import CollectionCover from '../components/CollectionCover';
import CollectionNew from '../components/CollectionNew';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchCollectionListData } from '../services/collectionAPIs';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
import { CollectionData } from '../types/collectionTypes';

const CollectionListPage: FC = () => {
  const context = useContext(Appctx);
  const { collectionList, setCollectionList, token } = context;
  const { settlement, isLoading } = collectionList;

  const fetchMyCollections = useCallback(async function () {
    try {
      setCollectionList({ isLoading: true, settlement: null });
      const response = await fetchCollectionListData(token);
      setCollectionList({ settlement: response });
    } catch (error) {
      setCollectionList({ settlement: error });
    } finally {
      setCollectionList({ isLoading: false });
    }
  }, [fetchCollectionListData]);

  useEffect(() => {
    fetchMyCollections();
  }, [fetchMyCollections]);

  const collectionCards = (myCollections: CollectionData[]) => {
    return myCollections.map((collection) => (
      <Grid item key={collection.id} xs={12} sm={6} lg={4}>
        <CollectionCover
          collection={collection}
          buttonName={'Details'}
          buttonPath={`${NavMenuList.MyCollections}?id=${collection.id}`}
          dataLoader={fetchMyCollections}
        />
      </Grid>
    ));
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', p: 2 }}>
      {isLoading && <LoadingIndicator />}
      {!isLoading && settlement && settlement instanceof Error && (
        <Typography>{(settlement as Error).message}</Typography>
      )}
      {settlement && !(settlement instanceof Error) && !isEmpty(settlement[0]) && !isLoading && (
        <Grid container spacing={2}>
          {collectionCards(settlement)}
          <CollectionNew dataLoader={fetchMyCollections} />
        </Grid>
      )}
      {settlement && !isLoading && (settlement instanceof Error || isEmpty(settlement[0])) && (
        <Grid container spacing={2}>
          <CollectionNew dataLoader={fetchMyCollections} />
        </Grid>
      )}
    </Box>
  );
};

export default CollectionListPage;
