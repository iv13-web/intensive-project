import {useHistory, useParams} from 'react-router-dom/cjs/react-router-dom'
import {useGetMoviesQuery} from '../services/moviesApi'
import CardContainer from '../components/CardContainer'
import Paginator from '../components/Paginatior'
import {useDispatch} from 'react-redux'
import {storeCurrentPage} from '../store/pagesSlice'
import {useEffect} from 'react'
import ScrollToTop from '../layout/ScrollToTop'
import AuthModal from '../components/AuthModal'
import MovieCard from '../components/MovieCard'
import PagePlaceholder from '../components/PagePlaceholder'
import notFound404 from '../assets/404-not-found.png'
import SkeletonCardLayout from '../components/SkeletonCardLayout'

export const CARDS_PER_REQUEST = 20

export default function Catalog() {
  const {list, page} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {data, isFetching, isError} = useGetMoviesQuery({list, page})
  const pagesCount = data?.totalPages
  const moviesData = data?.results

  const handlePageChange = (e, page) => history.push(`/${list}/${page}`)

  useEffect(() => {
    page > pagesCount
      ? dispatch(storeCurrentPage({list, page: 1}))
      : dispatch(storeCurrentPage({list, page}))
  }, [list, page])

  if (isFetching) {
    return (
      <>
        <ScrollToTop deps={[list, page]}/>
        <SkeletonCardLayout cardsCount={CARDS_PER_REQUEST}/>
      </>
    )
  }

  if (isError || page > pagesCount) {
    return (
      <PagePlaceholder
        image={notFound404}
      />
    )
  }

  return (
    moviesData?.length > 0 &&
      <>
        <ScrollToTop deps={[list, page]}/>
        <CardContainer>
          {moviesData.map(movie => (
            <MovieCard
              data={movie}
              key={movie.id}
              id={movie.id}
            />
          ))}
        </CardContainer>
        <Paginator
          count={pagesCount}
          page={Number(page > pagesCount ? 1 : page)}
          handlePageChange={handlePageChange}
        />
        <AuthModal/>
      </>
  )
}
