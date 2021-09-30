import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest}) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <Route
      {...rest}
      render={props => (
        isLoggedIn
          ? <Component {...props} />
          : <Redirect to='/signin'/>
      )}
    />
  )
}