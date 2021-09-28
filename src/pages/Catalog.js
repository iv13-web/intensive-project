import {useHistory, useParams} from 'react-router-dom/cjs/react-router-dom'
import {useGetMoviesQuery} from '../store/moviesApi'
import CardContainer from '../components/CardContainer'
import MovieCard from '../components/MovieCard'
import Paginator from '../components/Paginatior'
import {useDispatch} from 'react-redux'
import {storeCurrentPage} from '../store/pagesSlice'
import {useEffect} from 'react'

export default function Catalog() {
  const {list, page} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const {data, isSuccess} = useGetMoviesQuery({list, page})
  const pagesCount = data?.totalPages
  const moviesData = data?.results

  const handlePageChange = (e, page) => history.push(`/${list}/${page}`)

  useEffect(() => {
    dispatch(storeCurrentPage({list, page}))
  }, [list, page])
  
  return (
    <>
      <CardContainer>
        {isSuccess && moviesData.map(movie => (
          <MovieCard
            data={movie}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </CardContainer>
      <Paginator
        count={pagesCount}
        page={Number(page)}
        handlePageChange={handlePageChange}
      />
    </>
  )
}
