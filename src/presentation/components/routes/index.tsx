import { BrowserRouter, Switch, Route } from 'react-router-dom'

type RouterProps = {
  makeLogin: React.FC
}

const Router = ({ makeLogin }: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
