import {useDispatch, useSelector} from 'react-redux'
import MovieCard from '../components/MovieCard'
import ExtendedSearchCard from '../components/ExtendedSearchCard'
import CardContainer from '../components/CardContainer'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {clearHistory} from '../store/searchSlice/searchSlice'
import PagePlaceholder from '../components/PagePlaceholder'
import noSearchHistory from '../assets/no-search-history.png'

const useStyles = makeStyles(theme => ({
  btn: {
    marginBottom: 16,
    width: 'fit-content',
    alignSelf: 'flex-end'
  }
}))

export default function History() {
  const s = useStyles()
  const searchHistoryItems = useSelector(state => state.search.history)
  const anyHistoryItems = Boolean(Object.keys(searchHistoryItems)?.length)
  const dispatch = useDispatch()

  const handleClearHistory = () => dispatch(clearHistory())

  if (!anyHistoryItems) {
    return <PagePlaceholder
      text='No search history yet'
      image={noSearchHistory}
    />
  }

  return (
    anyHistoryItems &&
      <>
        <Button className={s.btn} onClick={handleClearHistory}>
          clear history
        </Button>
        <CardContainer>
          {Object.keys(searchHistoryItems).map(item => {
            const searchItem = searchHistoryItems[item]
            return searchItem.type === 'fromSuggest'
              ? <MovieCard data={searchItem} key={item}/>
              : <ExtendedSearchCard data={searchItem} key={item}/>
          })}
        </CardContainer>
      </>

  )
}