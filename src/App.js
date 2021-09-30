import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import {useDispatch} from 'react-redux'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Favorite from './pages/Favorite'
import Layout from './layout/Layout'
import ScrollToTop from './layout/ScrollToTop'
import Movie from './pages/Movie/Movie'
import {init} from './store/appSlice'

export default function App() {
  const dispatch = useDispatch()
  dispatch(init())

  return (
    <HashRouter basename='/'>
      <Layout>
        {/*<ScrollToTop/>*/}
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/favorite' component={Favorite}/>
          <Route path='/movie/:id/:tab/' component={Movie}/>
          <Route path='/:list/:page' component={Catalog}/>
        </Switch>
      </Layout>
    </HashRouter>
  )
}
