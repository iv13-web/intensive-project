import {GENRES} from '../../../store/searchSlice/genres'
import {ToggleButton} from '@material-ui/lab'
import SelectFilterWrapper from './selectFilterWrapper'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch, useSelector} from 'react-redux'
import {setGenres} from '../../../store/searchSlice/searchSlice'

const useStyles = makeStyles(theme => ({
  toggleBtn: {
    flexGrow: 1,
    margin: 4
  }
}))

export default function GenresFilter() {
  const s = useStyles()
  const dispatch = useDispatch()
  const genres = useSelector(state => state.search.genres)

  const handleGenresSelect = (event, newGenres) => dispatch(setGenres(newGenres))

  return (
    <SelectFilterWrapper onChange={handleGenresSelect} value={genres}>
      {Object.keys(GENRES).map(key => (
        <ToggleButton
          key={key}
          value={GENRES[key]}
          aria-label={key}
          className={s.toggleBtn}
        >
          {key}
        </ToggleButton>
      ))}
    </SelectFilterWrapper>
  )
}