import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import { globalParas, AppProvider } from '../utils/LocalContext';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import CollectionListPage from '../pages/CollectionListPage';
import CollectedBooksPage from '../pages/CollectedBooksPage';
import LoginPage from '../pages/LoginPage';
import ForgottenPassword from '../pages/ForgottenPasswordPage';
import PasswordResetPage from '../pages/PasswordResetPage';
import ResetPasswordSuccessPage from '../pages/PasswordResetSuccessPage';
import BookPage from '../pages/BookPage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import GoalPage from '../pages/GoalPage';
import NotFoundPage from '../pages/NotFoundPage';
import Copyright from './Copyright';
import { NavMenuList, AuthenticationPaths, bookPath, NotFoundPath } from '../config/paths';
import { Box } from '@mui/material';
import GateKeeper from './GateKeeper';

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
          <GateKeeper>
            <Header></Header>
            <Routes>
              <Route path={NavMenuList.Home} element={<HomePage />} />
              <Route path={NavMenuList.MyCollections}>
                <Route path=":collectionId" element={<CollectedBooksPage />} />
                <Route index element={<CollectionListPage />} />
              </Route>
              <Route path={AuthenticationPaths.SignUp} element={<RegisterPage />} />
              <Route path={AuthenticationPaths.SignIn} element={<LoginPage />} />
              <Route path={AuthenticationPaths.ForgottenPassword} element={<ForgottenPassword />} />
              <Route path={AuthenticationPaths.PasswordReset} element={<PasswordResetPage />} />
              <Route
                path={AuthenticationPaths.ResetPasswordSuccess}
                element={<ResetPasswordSuccessPage />}
              />
              <Route path={NavMenuList.Profiles} element={<ProfilePage />} />
              <Route path={bookPath}>
                <Route path=":bookId" element={<BookPage />} />
              </Route>
              <Route path={NavMenuList.Explore} element={<SearchPage />} />
              <Route path={NavMenuList.Goals} element={<GoalPage />} />
              <Route path={NotFoundPath} element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </GateKeeper>
          <Copyright />
        </Router>
      </AppProvider>
    </Box>
  );
};

export default App;
