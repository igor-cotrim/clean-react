import { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

const PrivateRoute = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext)

  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route component={() => <Redirect to="/login" />} {...props} />
  )
}

export default PrivateRoute
