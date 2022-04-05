import { FC, useContext, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import CollectionsCover from '../components/CollectionsCover';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchMyCollectionsData } from '../services/collectionAPIs';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
import { MyCollectionsData } from '../types/collectionTypes';

const CollectionsPage: FC = () => {
  const context = useContext(Appctx);
  const { myCollections, setMyCollections, token } = context;
  const { settlement, isLoading } = myCollections;

  useEffect(() => {
    (async function () {
      try {
        setMyCollections({ isLoading: true, settlement: null });
        const response = await fetchMyCollectionsData(token);
        setMyCollections({ settlement: response });
      } catch (error) {
        setMyCollections({ settlement: error });
      } finally {
        setMyCollections({ isLoading: false });
      }
    })();
  }, []);

  const collectionCards = (myCollections: MyCollectionsData[]) => {
    return myCollections.map((collection) => (
      <Grid item xs={12} sm={6} lg={4}>
        <CollectionsCover
          collectionTitle={collection.title}
          collectionDescription={collection.description}
          buttonName={'Details'}
          buttonPath={`${NavMenuList.Collections}?id=${collection.id}`}
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

export default CollectionsPage;
