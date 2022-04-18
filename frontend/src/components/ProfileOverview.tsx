import { FC, useState, useEffect, useContext, createElement } from 'react';
import { Appctx } from '../utils/LocalContext';
import { Box, Typography } from '@mui/material';
import { ProfileType } from '../types/ProfileTypes';
import { getReader, getReaderById } from '../services/readerAPIs';
import LoadingIndicator from './LoadingIndicator';
import isEmpty from 'lodash/isEmpty';
import * as Icons from '@mui/icons-material';

interface ProfileOverviewProps {
  readerId?: number;
}

const ProfileOverview: FC<ProfileOverviewProps> = ({ readerId }) => {
  const [profile, setProfile] = useState<ProfileType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const context = useContext(Appctx);
  const { token } = context;
  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = readerId ? await getReaderById(readerId) : await getReader({ token });
        setProfile(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const profileDetails = (iconName: keyof typeof Icons, label: string, value: string) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', py: 2 }}>
          {createElement(Icons[iconName])}
          <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </Box>
    );
  };

  const profileList = () => {
    return (
      <>
        {profileDetails('AccountCircle', 'Username', profile?.username ?? '')}
        {profileDetails('Man', 'Gender', profile?.gender ?? '')}
        {profileDetails('EmojiFoodBeverage', 'Age', String(profile?.age) ?? '')}
      </>
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
      {!isLoading && error && !isEmpty(error) && (
        <Typography variant="subtitle1">{error}</Typography>
      )}
      {!isLoading && profile && isEmpty(error) && !isEmpty(profile) && profileList()}
    </Box>
  );
};

export default ProfileOverview;
