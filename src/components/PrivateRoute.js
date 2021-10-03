import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest}) {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)

  return (
    <Route
      {...rest}
      render={props => (
        isSignedIn
          ? <Component {...props} />
          : <Redirect to='/signin'/>
      )}
    />
  )
}