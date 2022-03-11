import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import { globalParas, AppProvider } from '../utils/LocalContext';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import Copyright from './Copyright';
import { NavMenuList, AuthenticationPaths } from '../config/paths';

const App: React.FC = () => {
  return (
    <AppProvider value={globalParas}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path={NavMenuList.Home} element={<HomePage />} />
          <Route path={AuthenticationPaths.SignUp} element={<RegisterPage />} />
        </Routes>
        <Copyright sx={{ mt: 5 }} />
      </Router>
    </AppProvider>
  );
};

export default App;
