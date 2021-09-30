import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import {useDispatch} from 'react-redux'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Favorite from './pages/Favorite'
import Layout from './layout/Layout'
import Movie from './pages/Movie/Movie'
import {init} from './store/appSlice'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  const dispatch = useDispatch()
  dispatch(init())

  return (
    <HashRouter basename='/'>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home}/>
          <PrivateRoute path='/favorite' component={Favorite}/>
          <Route path='/movie/:id/:tab/' component={Movie}/>
          <Route path='/:list/:page' component={Catalog}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </Layout>
    </HashRouter>
  )
}
