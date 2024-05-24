import { Navigate, useRoutes } from 'react-router-dom';
import { LoginPage, NotFoundPage, ProfilePage, RegisterPage } from './elements';
import AuthGuard from '../auth/AuthGuard';

const Router = () => {
  const routes = useRoutes([
    { element: <Navigate to='/profile' />, index: true },
    {
      path: 'auth',
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
      ]
    },
    { path: 'profile', element: <AuthGuard><ProfilePage /></AuthGuard> },
    { path: '*', element: <NotFoundPage /> },
  ]);

    return routes;
}

export default Router