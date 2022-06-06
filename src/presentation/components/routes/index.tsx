import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { SignUp } from '@/presentation/pages'

type RouterProps = {
  makeLogin: React.FC
}

const Router = ({ makeLogin }: RouterProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
