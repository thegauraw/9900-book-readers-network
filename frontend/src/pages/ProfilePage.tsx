import { Paper, Divider, Typography, Box } from '@mui/material';
import BadgesList from '../components/BadgesList';
import { useSearchParams } from 'react-router-dom';
import ProfileOverview from '../components/ProfileOverview';
import EditableProfile from '../components/EditableProfile';
import RecentCollectedBooksList from '../components/RecentCollectedBooksList';
export default function ProfilePage() {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      {searchParams.get('id') ? (
        <Paper
          sx={{
            maxWidth: '600px',
            minWidth: '400px',
            width: '50%',
            alignSelf: 'center',
            mt: 'auto',
            p: 3,
          }}
        >
          <Typography variant="subtitle1">PROFILE</Typography>
          <Divider />
          <ProfileOverview readerId={Number(searchParams.get('id'))} />

          <Typography variant="subtitle1">ACHIEVEMENTS</Typography>
          <Divider />
          <BadgesList readerId={Number(searchParams.get('id'))} />
          <RecentCollectedBooksList />
        </Paper>
      ) : (
        <EditableProfile />
      )}
    </>
  );
}
