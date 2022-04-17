import { FC, useState, useEffect, useContext } from 'react';
import { Appctx } from '../utils/LocalContext';
import { Box, Typography, Divider, CardMedia } from '@mui/material';
import { BadgesType } from '../types/AchievementTypes';
import { getOwnedBadges, getBadgesByReader } from '../services/achievementAPI';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';
import { badgeSizes } from '../config/constants';
interface BadgesListProps {
  readerId?: number;
}

const BadgesList: FC<BadgesListProps> = ({ readerId }) => {
  const [badgesList, setBadgesList] = useState<BadgesType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const context = useContext(Appctx);
  const { token } = context;
  const callableFunction = readerId ? getBadgesByReader(readerId) : getOwnedBadges(token);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await callableFunction;
        setBadgesList(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const badgeItem = (badge: BadgesType) => {
    const imgURL = require(`../assets/badges/${badge.image}.png`);
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}
        key={badge.id}
      >
        <CardMedia component="img" sx={{ mx: 1, ...badgeSizes.large }} image={imgURL} />
        <Typography variant="subtitle2" component="div">
          {badge.description}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 2,
      }}
    >
      {isLoading && <LoadingIndicator />}
      {!isLoading && error && !isEmpty(error) && <Typography>{error}</Typography>}
      {!isLoading &&
        badgesList &&
        isEmpty(error) &&
        (badgesList.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {badgesList.map((badge) => badgeItem(badge))}
          </Box>
        ) : (
          <></>
        ))}
    </Box>
  );
};

export default BadgesList;
