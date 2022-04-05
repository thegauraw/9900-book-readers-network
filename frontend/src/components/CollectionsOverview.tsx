import { FC, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import CollectionsCover from './CollectionsCover';
import LoadingIndicator from './LoadingIndicator';
import { fetchMyCollectionsData } from '../services/collectionAPIs';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
const CollectionOverview: FC = () => {
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

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && settlement && settlement instanceof Error && (
        <Typography>{(settlement as Error).message}</Typography>
      )}
      {settlement && !(settlement instanceof Error) && !isEmpty(settlement[0]) && !isLoading && (
        <CollectionsCover
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
