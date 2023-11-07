import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Login from 'src/pages/login/Login';

type RequireAuthProps = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <Login />;
  }

  return children;
};

export default RequireAuth;
