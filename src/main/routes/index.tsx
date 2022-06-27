import { BrowserRouter, Switch, Route } from 'react-router-dom'

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { ApiContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'

//Routes
import {
  makeLogin,
  makeSignUp,
  makeSurveyList,
  makeSurveyResult
} from '@/main/factories/pages'

const Router = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
