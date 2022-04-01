import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import { globalParas, AppProvider } from '../utils/LocalContext';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import CollectionPage from '../pages/CollectionPage';
import LoginPage from '../pages/LoginPage';
import ForgottenPassword from '../pages/ForgottenPasswordPage';
import PasswordResetPage from '../pages/PasswordResetPage';
import ResetPasswordSuccessPage from '../pages/PasswordResetSuccessPage';
import BookPage from '../pages/BookPage';
import Copyright from './Copyright';
import { NavMenuList, AuthenticationPaths } from '../config/paths';

const App: React.FC = () => {
  return (
    <AppProvider value={globalParas}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path={NavMenuList.Home} element={<HomePage />} />
          <Route path={NavMenuList.Collections} element={<CollectionPage />} />
          <Route path={AuthenticationPaths.SignUp} element={<RegisterPage />} />
          <Route path={AuthenticationPaths.SignIn} element={<LoginPage />} />
          <Route path={AuthenticationPaths.ForgottenPassword} element={<ForgottenPassword />} />
          <Route path={AuthenticationPaths.PasswordReset} element={<PasswordResetPage />} />
          <Route
            path={AuthenticationPaths.ResetPasswordSuccess}
            element={<ResetPasswordSuccessPage />}
          />
          <Route path="/books">
            <Route path=":bookId" element={<BookPage />} />
          </Route>
        </Routes>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Router>
    </AppProvider>
  );
};

export default App;
