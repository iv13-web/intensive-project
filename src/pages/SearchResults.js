import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useLazySearchMoviesQuery} from '../store/moviesApi'
import {useEffect, useLayoutEffect, useRef} from 'react'
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
  const [trigger, {data, isSuccess}] = useLazySearchMoviesQuery()
  const moviesData = storedSearchResult?.results
  const pagesCount = storedSearchResult?.totalPages

  const queryParams = new URLSearchParams(useLocation().search)
  const page = queryParams.get('page')
  const genres = queryParams.get('genres')
  const query = queryParams.get('q')

  const {pathname} = useLocation()
  const history = useHistory()
  const prevRenderQuery = useRef()
  const prevRenderPage = useRef()
  const prevRenderGenres = useRef()

  useLayoutEffect(() => {
    if (!query && !genres) {
      return history.push('/s')
    }
    if (!storedSearchResult) {
      trigger({query, page, genres})
    }
    if (prevRenderPage.current !== page ||
        prevRenderQuery.current !== query ||
        prevRenderGenres.current !== genres
    ) {
      trigger({query, page, genres})
    }
  }, [query, page, genres])

  useEffect(() => {
    prevRenderPage.current = page
    prevRenderQuery.current = query
    prevRenderGenres.current = genres
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSearchResults(data))
      prevRenderPage.current = page
    }
  }, [isSuccess, data])

  const handlePageChange = (e, page) => {
    dispatch(setSearchResults(null))
    if (query) {
      return history.push(`${pathname}?q=${query}&page=${page}`)
    }
    history.push(`${pathname}?&genres=${genres}&page=${page}`)
  }

  return (
    <>
      {moviesData?.length > 0 &&
        <>
          <ScrollToTop deps={[page, query]}/>
          <CardContainer>
            {moviesData.map(movie => (
              <MovieCard
                type='movie'
                data={movie}
                key={movie.id}
                id={movie.id}
              />
            ))}
          </CardContainer>
          <AuthModal/>
        </>
      }
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
    </>
  )
}