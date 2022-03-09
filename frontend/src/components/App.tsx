import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './Header';
import { globalParas, AppProvider } from '../utils/LocalContext';
import RegisterPage from '../pages/RegisterPage';
import Copyright from './Copyright';

const App: React.FC = () => {
  return (
    <AppProvider value={globalParas}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/sign-up" element={<RegisterPage />}/>
        </Routes>
        <Copyright sx={{ mt: 5 }} />
      </Router>
    </AppProvider>
  );
};

export default App;
