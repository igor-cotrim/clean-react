import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Login } from '@/presentation/pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
