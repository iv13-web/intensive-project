import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import GenresFilter from './components/GenresFilter'
import {useDispatch, useSelector} from 'react-redux'
import {setFilterQuery} from '../../store/searchSlice/searchSlice'
import {useLazyDiscoverMovieQuery} from '../../store/moviesApi'

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
  }
}))

export default function ExtendedSearch() {
  const s = useStyles()
  const dispatch = useDispatch()
  const [trigger, {isSuccess}] = useLazyDiscoverMovieQuery()
  const {
    genres
  } = useSelector(state => state.search.filterQuery)

  const handleSubmit = () => {
    console.log(genres)
    trigger({genres})
  }

  return (
    <Container component="main" maxWidth="xs" className={s.container}>
        <form className={s.form} noValidate onSubmit={handleSubmit}>
          <GenresFilter/>



          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={s.submit}
            onClick={() => dispatch(setFilterQuery())}
          >
            search
          </Button>
        </form>
        <Grid container className={s.clear}>
          <Grid item>
            <Button color='primary' onClick={() => {}}>
              Clear filters
            </Button>
          </Grid>
        </Grid>
    </Container>
  )
}