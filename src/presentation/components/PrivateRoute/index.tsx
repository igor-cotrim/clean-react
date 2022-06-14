import { Redirect, Route, RouteProps } from 'react-router-dom'

const PrivateRoute = (props: RouteProps) => {
  return <Route component={() => <Redirect to="/login" />} {...props} />
}

export default PrivateRoute
