import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import GenresFilter from './components/GenresFilter'
import {useDispatch, useSelector} from 'react-redux'
import {clearFilters} from '../../store/searchSlice/searchSlice'
import {useHistory} from 'react-router-dom/cjs/react-router-dom'
import YearsFilter from './components/YearsFilter'
import {toast} from 'react-toastify'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    padding: '24px 24px 24px 0',
    maxWidth: 650
  },
  clear: {
    justifyContent: 'end'
  },
  buttonProgress: {
    color: theme.palette.primary.dark,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}))

export default function ExtendedSearch() {
  const s = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const {genres, year} = useSelector(state => state.search.filterQuery)
  const isYearValid = useSelector(state => state.search.isYearValid)
  const shouldDisableBtn = !genres && !year

  const handleSubmit = () => {
    if (genres || year) {
      isYearValid
        ? history.push(`/search?&genres=${genres}&year=${year}&page=1`)
        : toast.error('Enter a valid year, please')
    }
  }

  return (
    <Container component="main" maxWidth="xs" className={s.container}>
        <form className={s.form} noValidate onSubmit={handleSubmit}>
          <GenresFilter/>
          <YearsFilter/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={s.submit}
            disabled={shouldDisableBtn}
          >
            search
          </Button>
        </form>
        <Grid container className={s.clear}>
          <Grid item>
            <Button
              disabled={shouldDisableBtn}
              color='primary'
              onClick={() => dispatch(clearFilters())}
            >
              Clear filters
            </Button>
          </Grid>
        </Grid>
    </Container>
  )
}