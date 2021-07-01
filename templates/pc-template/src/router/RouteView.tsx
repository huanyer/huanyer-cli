import { Redirect, Route, Switch } from 'react-router-dom';
export interface IRouteViewProps {
  path?: string;
  redirect?: string;
  component?: any;
  exact?: boolean;
  children?: IRouteViewProps[];
}

const onEnter = (Component: any, item: any, props: any) => {
  const { children, title, path } = item;
  // 埋点，仅在线上环境，有标题且不是错误页面时，调用接口存日志
  return <Component {...props} children={children} />;
};

const RouteView = (props: IRouteViewProps) => {
  return (
    <Switch>
      {props.children &&
        props.children.map((item, index) => {
          if (item.redirect) {
            return <Redirect key={index} from={item.path} to={item.redirect} />;
          }
          return (
            <Route
              key={index}
              path={item.path}
              render={props => onEnter(item.component, item, props)}
              exact={item.exact || false}
            />
          );
        })}
    </Switch>
  );
};

export default RouteView;
