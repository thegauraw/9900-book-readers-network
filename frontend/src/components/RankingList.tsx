import { FC } from 'react';
import { Box } from '@mui/material';
import RankingListBlock from './RankingListBlock';
import { getRankings } from '../services/rankingAPIs';

const RankingList: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <RankingListBlock title="TOP RATED" callableFunction={getRankings} />
        <RankingListBlock title="MOST COLLECTED" callableFunction={getRankings} />
      </Box>
    </Box>
  );
};

export default RankingList;
