import { BrowserRouter, Switch, Route } from 'react-router-dom'

type RouterProps = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router = (factory: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factory.makeLogin} />
        <Route path="/signup" exact component={factory.makeSignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
