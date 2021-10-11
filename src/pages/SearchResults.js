import {useHistory, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useLazySearchMoviesQuery} from '../services/moviesApi'
import {useEffect, useLayoutEffect} from 'react'
import CardContainer from '../components/CardContainer'
import Paginator from '../components/Paginatior'
import AuthModal from '../components/AuthModal'
import {saveToHistory, setSearchResults, setSearchResultsCount} from '../store/searchSlice/searchSlice'
import PagePlaceholder from '../components/PagePlaceholder'
import noResultsImage from '../assets/search_error.png'
import ScrollToTop from '../layout/ScrollToTop'
import MovieCard from '../components/MovieCard'
import SkeletonCardLayout from '../components/SkeletonCardLayout'
import {CARDS_PER_REQUEST} from './Catalog'

export default function SearchResults() {
  const dispatch = useDispatch()
  const storedSearchResult = useSelector(state => state.search.searchResults)
  const currentUser = useSelector(state => state.auth.currentUser)
  const [trigger, {data, isSuccess, isError, isFetching}] = useLazySearchMoviesQuery()
  const moviesData = storedSearchResult?.results
  const pagesCount = storedSearchResult?.totalPages
  const queryParams = new URLSearchParams(useLocation().search)
  const query = queryParams.get('q')
  const page = queryParams.get('page')
  const genres = queryParams.get('genres')
  const year = queryParams.get('year')
  const {pathname, search, state} = useLocation()
  const history = useHistory()

  useLayoutEffect(() => {
    if (!query && !genres && !year) {
      return history.push('/s')
    }
    dispatch(setSearchResults(null))
    trigger({query, page, genres, year})
  }, [query, page, genres, year])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSearchResults(data))
      dispatch(setSearchResultsCount(data.totalResults))
      if (state?.fromFilters) {
        const path = pathname + search
        dispatch(saveToHistory({
          type: 'fromFilters',
          id: search,
          path,
          currentUser,
          genres,
          year
        }))
      }
    }
    return () => {
      dispatch(setSearchResultsCount(null))
    }
  }, [isSuccess, data, currentUser])

  const handlePageChange = (e, page) => {
    dispatch(setSearchResults(null))
    if (query) {
      return history.push(`${pathname}?q=${query}&page=${page}`)
    }
    history.push(`${pathname}?&genres=${genres}&page=${page}`)
  }

  if (moviesData?.length && (!pagesCount || isError)) {
    return (
      <PagePlaceholder
        image={noResultsImage}
        text='NO RESULTS'
      />
    )
  }

  if (isFetching) {
    return <SkeletonCardLayout cardsCount={CARDS_PER_REQUEST}/>
  }

  return (
    moviesData?.length > 0 &&
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
        {pagesCount > 1 &&
          <Paginator
            count={pagesCount}
            page={Number(page)}
            handlePageChange={handlePageChange}
          />
        }
        <AuthModal/>
      </>
  )
}