import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Layout } from '@/components/features/Layout';
import { CategoryPage } from '@/pages/Category';
import { GoodsDetailPage } from '@/pages/Goods/Detail';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { MyAccountPage } from '@/pages/MyAccount';
import { OrderPage } from '@/pages/Order';
import KakaoCallbackPage from '@/pages/Login/KakaoCallbackPage';

import { PrivateRoute } from './components/PrivateRoute';
import { RouterPath } from './path';

const AppRoutes = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={RouterPath.root} element={<Layout />}>
          <Route path={RouterPath.home} element={<HomePage />} />
          <Route path={RouterPath.category} element={<CategoryPage />} />
          <Route path={RouterPath.productsDetail} element={<GoodsDetailPage />} />
          <Route path={RouterPath.myAccount} element={<PrivateRoute />}>
            <Route path={RouterPath.myAccount} element={<MyAccountPage />} />
          </Route>
          <Route path={RouterPath.order} element={<PrivateRoute />}>
            <Route path={RouterPath.order} element={<OrderPage />} />
          </Route>
          <Route path={RouterPath.notFound} element={<Navigate to={RouterPath.home} />} />
        </Route>
        <Route path={RouterPath.login} element={<LoginPage />} />
        <Route path={RouterPath.redirect} element={<KakaoCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
