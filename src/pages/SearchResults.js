import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useLazySearchMovieByNameQuery} from '../store/moviesApi'
import {useEffect} from 'react'
import CardContainer from '../components/CardContainer'
import MovieCard from '../components/MovieCard'
import Paginator from '../components/Paginatior'
import AuthModal from '../components/AuthModal'
import {setSearchResults} from '../store/searchSlice'
import useUpdatedEffect from '../hooks/useUpdatedEffect'
import PagePlaceholder from '../components/PagePlaceholder'
import noResultsImage from '../assets/search_error.png'
import ScrollToTop from '../layout/ScrollToTop'

export default function SearchResults() {
  const preloadedData = useSelector(state => state.search.searchResults)
  const dispatch = useDispatch()
  const [trigger, {data}] = useLazySearchMovieByNameQuery()
  const pagesCount = preloadedData?.totalPages || data?.totalPages
  const moviesData = preloadedData?.results || data?.results

  const queryParams = new URLSearchParams(useLocation().search)
  const {pathname} = useLocation()
  const query = queryParams.get('q')
  const page = queryParams.get('page')
  const history = useHistory()

  useEffect(() => {
    if (!preloadedData) {
      trigger({query, page})
    }
  }, [page, query])

  useUpdatedEffect(() => {
    dispatch(setSearchResults(null))
  }, [page, query])

  const handlePageChange = (e, page) => {
    dispatch(setSearchResults(null))
    history.push(`${pathname}?q=${query}&page=${page}`)
  }

  return (
    <>
      <ScrollToTop deps={[page, query]}/>
      <CardContainer>
        {moviesData && moviesData.map(movie => (
          <MovieCard
            data={movie}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </CardContainer>
      {pagesCount > 1 &&
        <Paginator
          count={pagesCount}
          page={Number(page)}
          handlePageChange={handlePageChange}
        />
      }
      {moviesData && !moviesData?.length &&
        <PagePlaceholder
          image={noResultsImage}
          text='NO RESULTS'
        />
      }
      <AuthModal/>
    </>
  )
}