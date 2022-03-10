import { FC, useContext, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import CollectionCover from '../components/CollectionCover';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchCollectionListData } from '../services/callableFunctions';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
import { CollectionListData } from '../types/ResponseTypes';
const CollectionPage: FC = () => {
  const context = useContext(Appctx);
  const { collectionList, setCollectionList } = context;
  const { settlement, isLoading } = collectionList;

  useEffect(() => {
    (async function () {
      try {
        setCollectionList({ isLoading: true, settlement: null });
        const response = await fetchCollectionListData();
        setCollectionList({ settlement: response });
      } catch (error) {
        setCollectionList({ settlement: error });
      } finally {
        setCollectionList({ isLoading: false });
      }
    })();
  }, []);

  const collectionListCard = (collectionList: CollectionListData[]) => {
    return collectionList.map((collection) => (
      <Grid item xs={12} sm={6} lg={4}>
        <CollectionCover
          bookCovers={collection.recentBookCovers.slice(0, 3)}
          collectionName={collection.name}
          totalCaption={`${collection.bookNumber} Books`}
          buttonName={'Details'}
          buttonPath={`${NavMenuList.Collections}/${collection.id}`}
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
          {collectionListCard(settlement)}
        </Grid>
      )}
    </Box>
  );
};

export default CollectionPage;
