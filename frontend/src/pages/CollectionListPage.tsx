import { FC, useContext, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import CollectionCover from '../components/CollectionCover';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchCollectionListData } from '../services/collectionAPIs';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
import { CollectionListData } from '../types/collectionTypes';

const CollectionListPage: FC = () => {
  const context = useContext(Appctx);
  const { collectionList, setCollectionList, token } = context;
  const { settlement, isLoading } = collectionList;

  useEffect(() => {
    (async function () {
      try {
        setCollectionList({ isLoading: true, settlement: null });
        const response = await fetchCollectionListData(token);
        setCollectionList({ settlement: response });
      } catch (error) {
        setCollectionList({ settlement: error });
      } finally {
        setCollectionList({ isLoading: false });
      }
    })();
  }, []);

  const collectionCards = (myCollections: CollectionListData[]) => {
    return myCollections.map((collection) => (
      <Grid item xs={12} sm={6} lg={4}>
        <CollectionCover
          collectionTitle={collection.title}
          collectionDescription={collection.description}
          buttonName={'Details'}
          buttonPath={`${NavMenuList.MyCollections}?id=${collection.id}`}
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
        </Grid>
      )}
    </Box>
  );
};

export default CollectionListPage;
