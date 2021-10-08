import {GENRES} from '../../../store/searchSlice/genres'
import {ToggleButton} from '@material-ui/lab'
import SelectFilterWrapper from './selectFilterWrapper'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'
import {setFilterQuery, setGenres} from '../../../store/searchSlice/searchSlice'

const useStyles = makeStyles(theme => ({
  toggleBtn: {
    flexGrow: 1,
    margin: 4
  }
}))

export default function GenresFilter() {
  const s = useStyles()
  const dispatch = useDispatch()
  const genres = useSelector(state => state.search.selectedGenres)

  const handleGenresSelect = (event, newGenres) => {
    dispatch(setGenres(newGenres))
    dispatch(setFilterQuery(genres))
  }

  return (
    <SelectFilterWrapper onChange={handleGenresSelect} value={genres}>
      {Object.keys(GENRES).map(key => (
        <ToggleButton
          key={key}
          value={key}
          aria-label={key}
          className={s.toggleBtn}
        >
          {GENRES[key]}
        </ToggleButton>
      ))}
    </SelectFilterWrapper>
  )
}