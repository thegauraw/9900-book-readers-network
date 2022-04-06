import { FC, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import CollectionCover from './CollectionCover';
import LoadingIndicator from './LoadingIndicator';
import { fetchCollectionListData } from '../services/collectionAPIs';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
const CollectionOverview: FC = () => {
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

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && settlement && settlement instanceof Error && (
        <Typography>{(settlement as Error).message}</Typography>
      )}
      {settlement && !(settlement instanceof Error) && !isEmpty(settlement[0]) && !isLoading && (
        <CollectionCover
          collectionTitle={settlement[0].title}
          collectionDescription={settlement[0].description}
          buttonName={'All Collections'}
          buttonPath={NavMenuList.MyCollections}
        />
      )}
    </>
  );
};

export default CollectionOverview;
