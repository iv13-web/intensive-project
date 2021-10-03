import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Link as BrowserLink, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {signin} from '../store/authSlice'
import {useFormik} from 'formik'
import * as yup from 'yup'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(4, 'Password is too short - should be 4 chars minimum')
    .required('Password is required'),
})

const WRONG_PASSWORD_TEXT = 'Incorrect password, please, check again'
const WRONG_EMAIL_TEXT = 'No user with such email in db, create an account'

export default function SignIn() {
  const s = useStyles()
  const users = useSelector(state => state.auth.users)
  const history = useHistory()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signin(values))
      if (!users?.[values.email]) {
        return formik.setFieldError('email', WRONG_EMAIL_TEXT)
      }
      if(users?.[values.email]?.password !== values.password) {
        return formik.setFieldError('password', WRONG_PASSWORD_TEXT)
      }
      history.push('/')
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <div className={s.paper}>
        <Avatar className={s.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={s.form} noValidate onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={s.submit}
          >
            Sign In
          </Button>
        </form>
        <Grid container style={{justifyContent: 'end'}}>
          <Grid item>
            <Link
              component={BrowserLink}
              to='/signup'
              variant="body2"
              onMouseDown={() => history.push('/signup')}
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}
