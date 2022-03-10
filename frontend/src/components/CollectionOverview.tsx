import { FC, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import CollectionCover from './CollectionCover';
import LoadingIndicator from './LoadingIndicator';
import { fetchCollectionListData } from '../services/callableFunctions';
import { Appctx } from '../utils/LocalContext';
import { NavMenuList } from '../config/paths';
const CollectionOverview: FC = () => {
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

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && settlement && settlement instanceof Error && (
        <Typography>{(settlement as Error).message}</Typography>
      )}
      {settlement && !(settlement instanceof Error) && !isEmpty(settlement[0]) && !isLoading && (
        <CollectionCover
          bookCovers={settlement[0].recentBookCovers.slice(0, 3)}
          collectionName={settlement[0].name}
          totalCaption={`${settlement.length} Collections`}
          buttonName={'All Collections'}
          buttonPath={NavMenuList.Collections}
        />
      )}
    </>
  );
};

export default CollectionOverview;
