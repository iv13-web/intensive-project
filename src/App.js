import {HashRouter, Route, Switch} from "react-router-dom"
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
import SearchResults from './pages/SearchResults'
import ExtendedSearch from './pages/ExtendedSearch/ExtendedSearch'
import Actor from './pages/Actor/Actor'
import History from './pages/History'
import {ToastContainer} from 'react-toastify'
import {Slide} from 'react-toastify'

export default function App() {
  const dispatch = useDispatch()
  dispatch(init())

  return (
    <HashRouter basename='/'>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/s' component={ExtendedSearch}/>
          <Route path='/search' component={SearchResults}/>
          <Route path='/movie/:id/:tab/' component={Movie}/>
          <Route path='/actor/:id' component={Actor}/>
          <Route path='/:list/:page' component={Catalog}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <PrivateRoute path='/favorite' component={Favorite}/>
          <PrivateRoute path='/history' component={History} showModal/>
        </Switch>
      </Layout>
      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={2000}
        hideProgressBar
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </HashRouter>
  )
}
