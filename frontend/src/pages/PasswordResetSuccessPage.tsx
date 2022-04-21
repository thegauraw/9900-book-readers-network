import { Avatar, Box, Container, Typography } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function ResetPasswordSuccessPage() {
  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', mt: 5, mb: 10, p: 10 }}>
          <Typography component="h2" variant="h2" sx={{ mt: 3, mb: 4 }}>
            Password Reset
          </Typography>
          <Typography component="h4" variant="h4" sx={{ mt: 1 }}>
            An email with a password reset link has been sent to your email.
          </Typography>
          <Typography component="h4" variant="h4" sx={{ mt: 1, mb: 4 }}>
            Check your email and click on the link to process!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPasswordSuccessPage;
