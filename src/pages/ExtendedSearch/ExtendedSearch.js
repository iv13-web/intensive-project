import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import GenresFilter from './components/GenresFilter'
import {useDispatch, useSelector} from 'react-redux'
import {clearFilters, setFilterQuery, setSearchResults} from '../../store/searchSlice/searchSlice'
import {useLazyDiscoverMovieQuery} from '../../store/moviesApi'
import {CircularProgress} from '@material-ui/core'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom/cjs/react-router-dom'

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
  const [trigger, {data, isSuccess, isFetching}] = useLazyDiscoverMovieQuery()
  const history = useHistory()
  const {genres} = useSelector(state => state.search.filterQuery)

  const handleSubmit = () => {
    trigger({genres})
    history.push(`/search?&genres=${genres}&page=1`)
  }

  useEffect(() => {
    data && dispatch(setSearchResults(data))
  }, [data])

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
            disabled={isFetching}
            onClick={() => dispatch(setFilterQuery())}
          >
            search
            {isFetching &&
              <CircularProgress size={24} className={s.buttonProgress} />
            }
          </Button>
        </form>
        <Grid container className={s.clear}>
          <Grid item>
            <Button color='primary' onClick={() => dispatch(clearFilters())}>
              Clear filters
            </Button>
          </Grid>
        </Grid>
    </Container>
  )
}