import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import {Provider} from 'react-redux'
import {store} from './store/store'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Favorite from './pages/Favorite'
import Layout from './layout/Layout'
import ScrollToTop from './layout/ScrollToTop'
import {SnackbarProvider} from 'notistack'
import Movie from './pages/Movie/Movie'

export default function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
        <HashRouter basename='/'>
          <Layout>
            <ScrollToTop/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/favorite' component={Favorite}/>
              <Route path='/movie/:id' component={Movie}/>
              <Route path='/:list/:page' component={Catalog}/>
            </Switch>
          </Layout>
        </HashRouter>
      </SnackbarProvider>
    </Provider>
  )
}
