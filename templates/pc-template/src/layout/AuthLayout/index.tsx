import React, { useState, useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { Layout, message, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import RouteView, { IRouteViewProps } from '@/router/RouteView';
import { RootState } from '@/store';
import './index.less';

const { Content } = Layout;

interface ILayoutProps extends IRouteViewProps {
  location: Location;
}

type Props = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  ILayoutProps;



const AuthLayout: React.FC<Props> = props => {
  const history = useHistory();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    setLogin(true);
  }, [history]);

  return (
    <>
      {!isLogin ? (
        <Spin className='layout-loading' tip='数据加载中' />
      ) : (
        <Layout className='page-basic'>
          <Suspense fallback={<Spin className='spin-loading' />}>
            <Content className='content'>
              <RouteView {...props} />
            </Content>
          </Suspense>
        </Layout>
      )}
    </>
  );
};

const mapState = (state: RootState) => ({ user: state.user });
const mapDispatch = (dispatch: any) => ({});

export default connect(mapState, mapDispatch)(AuthLayout);
