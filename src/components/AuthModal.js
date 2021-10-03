import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {useDispatch, useSelector} from 'react-redux'
import {setAuthModalOpened} from '../store/authSlice'
import {useHistory} from 'react-router-dom'

const AUTH_MODAL_TEXT = 'In order to use all features of current application, please login or create a new account.'

export default function AuthModal({title = 'You must be signed in'}) {
  const history = useHistory()
  const isModalOpened = useSelector(state => state.auth.isAuthModalOpened)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(setAuthModalOpened(false))

  const handleSignInRedirect = () => {
    history.push('/signin')
    dispatch(setAuthModalOpened(false))
  }
  const handleSignUpRedirect = () => {
    history.push('/signup')
    dispatch(setAuthModalOpened(false))
  }

  return (
    <Dialog
      open={isModalOpened}
      onClose={handleClose}
      aria-labelledby="authentication-dialog-title"
      aria-describedby="authentication-dialog-description"
    >
      <DialogTitle id="authentication-dialog-title">{`${title}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="authentication-dialog-description">
          {AUTH_MODAL_TEXT}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignInRedirect} color="primary">Sign in</Button>
        <Button onClick={handleSignUpRedirect} color="primary" autoFocus>Sign up</Button>
      </DialogActions>
    </Dialog>
  )
}
