import * as React from 'react';
import { Appctx } from '../utils/LocalContext';
import { AuthenticationPaths } from '../config/paths';
import LoadingIndicator from './LoadingIndicator';
import { verifyToken } from '../services/authAPIs';
import { useNavigate, useLocation } from 'react-router-dom';

const GateKeeper: React.FC = ({ children }) => {
  const context = React.useContext(Appctx);
  const { token, setToken, setLogged } = context;
  const [isLoading, setIsLoading] = React.useState(false);
  const { pathname: currentPath } = useLocation();
  let navigate = useNavigate();
  React.useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        if (
          !/^\/sign-in/.test(currentPath) &&
          !/^\/sign-up/.test(currentPath) &&
          !/^\/forgottenPassword/.test(currentPath) &&
          !/^\/passwordReset/.test(currentPath)
        ) {
          await verifyToken(token);
        }
      } catch (error) {
        setLogged(false);
        setToken('');
        navigate(AuthenticationPaths.SignIn);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPath]);

  return <>{isLoading ? <LoadingIndicator /> : children}</>;
};

export default GateKeeper;
