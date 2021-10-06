import {TextField, Typography} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {setFilterQuery, setYear, setYearValidity} from '../../../store/searchSlice/searchSlice'

export default function YearsFilter() {
  const dispatch = useDispatch()
  const year = useSelector(state => state.search.enteredYear)
  const isYearValid = useSelector(state => state.search.isYearValid)

  const handleYearPrint = e => {
    dispatch(setYear(e.target.value))
    dispatch(setYearValidity(e.target.value))
    dispatch(setFilterQuery(year))
  }

  return (
    <>
      <Typography variant='h6' color='primary' gutterBottom>
        Enter year
      </Typography>
      <TextField
        variant='outlined'
        size='small'
        fullWidth
        value={year}
        error={!isYearValid}
        onChange={handleYearPrint}
      />
    </>
  )
}