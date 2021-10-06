import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useLazySearchMovieByNameQuery} from '../store/moviesApi'
import {useEffect, useRef} from 'react'
import CardContainer from '../components/CardContainer'
import Paginator from '../components/Paginatior'
import AuthModal from '../components/AuthModal'
import {setSearchResults} from '../store/searchSlice/searchSlice'
import PagePlaceholder from '../components/PagePlaceholder'
import noResultsImage from '../assets/search_error.png'
import ScrollToTop from '../layout/ScrollToTop'
import MovieCard from '../components/MovieCard'

export default function SearchResults() {
  const dispatch = useDispatch()
  const storedSearchResult = useSelector(state => state.search.searchResults)
  const [trigger, {data, isSuccess}] = useLazySearchMovieByNameQuery()
  const moviesData = storedSearchResult?.results
  const pagesCount = storedSearchResult?.totalPages
  const queryParams = new URLSearchParams(useLocation().search)
  const page = queryParams.get('page')
  const query = queryParams.get('q')
  const {pathname} = useLocation()
  const history = useHistory()
  const prevRenderQuery = useRef()
  const prevRenderPage = useRef()

  useEffect(() => {
    if (!storedSearchResult) {
      trigger({query: query, page})
    }
    if (prevRenderPage.current !== page || prevRenderQuery.current !== query) {
      trigger({query: query, page})
    }
  }, [query, page])

  useEffect(() => {
    prevRenderPage.current = page
    prevRenderQuery.current = query
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSearchResults(data))
      prevRenderPage.current = page
    }
  }, [isSuccess, data])

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
            type='movie'
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