import { FC, useContext, useEffect, useCallback } from 'react';
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

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && settlement && settlement instanceof Error && (
        <Typography>{(settlement as Error).message}</Typography>
      )}
      {settlement && !(settlement instanceof Error) && !isEmpty(settlement[0]) && !isLoading && (
        <CollectionCover
          collection={settlement[0]}
          buttonName={'All Collections'}
          buttonPath={NavMenuList.MyCollections}
          dataLoader={fetchMyCollections}
        />
      )}
    </>
  );
};

export default CollectionOverview;
