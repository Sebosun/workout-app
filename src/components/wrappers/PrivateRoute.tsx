import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export type PrivateRouteProps = {
  authenticationPath: string;
} & RouteProps;

export default function PrivateRoute({
  authenticationPath,
  ...routeProps
}: PrivateRouteProps) {
  const { currentUser }: any = useAuth();
  if (currentUser) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
}
