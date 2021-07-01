import React, { useEffect } from 'react';
import RouteConfig from './routes.config';
import RouteView from '@/router/RouteView';
import { BrowserRouter } from 'react-router-dom';

type Props = ReturnType<typeof mapState>;

const AppRouter: React.FC<Props> = props => {
  return (
    <BrowserRouter basename={`/${process.env.REACT_APP_BASENAME || ''}`}>
      <RouteView children={RouteConfig} />
    </BrowserRouter>
  );
};

export default AppRouter;
