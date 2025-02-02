import { Suspense, lazy } from "react";
import Preloader from "../components/loading/Preloader";

const Loadable = (Component: any) => (props: any) => (
    <Suspense fallback={<Preloader />}><Component {...props} /></Suspense>
);

export const NotFoundPage = Loadable(lazy(() => import('../pages/NotFoundPage')));

export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));

export const ProfilePage = Loadable(lazy(() => import('../pages/app/ProfilePage')));