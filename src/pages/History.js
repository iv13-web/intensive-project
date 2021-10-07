import {useSelector} from 'react-redux'
import MovieCard from '../components/MovieCard'
import ExtendedSearchCard from '../components/ExtendedSearchCard'
import CardContainer from '../components/CardContainer'

export default function History() {
  const searchHistoryItems = useSelector(state => state.search.history)
  const isIterable = Boolean(Object.keys(searchHistoryItems)?.length)

  return (
    isIterable &&
    <CardContainer>
      {Object.keys(searchHistoryItems).map(item => {
        const foo = searchHistoryItems[item]
        console.log(item)
        return foo.type === 'fromSuggest'
          ? <MovieCard data={foo} key={item}/>
          : null
      })}
    </CardContainer>
  )
}