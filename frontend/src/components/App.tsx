import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import { globalParas, AppProvider } from '../utils/LocalContext';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import CollectionListPage from '../pages/CollectionListPage';
import LoginPage from '../pages/LoginPage';
import ForgottenPassword from '../pages/ForgottenPasswordPage';
import PasswordResetPage from '../pages/PasswordResetPage';
import ResetPasswordSuccessPage from '../pages/PasswordResetSuccessPage';
import BookPage from '../pages/BookPage';
import ProfilePage from '../pages/ProfilePage';
import Copyright from './Copyright';
import { NavMenuList, AuthenticationPaths } from '../config/paths';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <AppProvider value={globalParas}>
        <Router>
          <Header></Header>
          <Routes>
            <Route path={NavMenuList.Home} element={<HomePage />} />
            <Route path={NavMenuList.MyCollections} element={<CollectionListPage />} />
            <Route path={AuthenticationPaths.SignUp} element={<RegisterPage />} />
            <Route path={AuthenticationPaths.SignIn} element={<LoginPage />} />
            <Route path={AuthenticationPaths.ForgottenPassword} element={<ForgottenPassword />} />
            <Route path={AuthenticationPaths.PasswordReset} element={<PasswordResetPage />} />
            <Route
              path={AuthenticationPaths.ResetPasswordSuccess}
              element={<ResetPasswordSuccessPage />}
            />
            <Route path={NavMenuList.Profiles} element={<ProfilePage />} />
            <Route path="/books">
              <Route path=":bookId" element={<BookPage />} />
            </Route>
          </Routes>
          <Copyright />
        </Router>
      </AppProvider>
    </Box>
  );
};

export default App;
