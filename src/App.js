import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import {Provider} from 'react-redux'
import {store} from './store/store'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Favorite from './pages/Favorite'
import Layout from './layout/Layout'

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter basename='/'>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/favorite' component={Favorite}/>
            <Route path='/:list' component={Catalog}/>
          </Switch>
        </Layout>
      </HashRouter>
    </Provider>
  )
}