import CardContainer from '../../../components/CardContainer'
import {useGetActorMoviesQuery} from '../../../services/moviesApi'
import PagePlaceholder from '../../../components/PagePlaceholder'
import MovieCard from '../../../components/MovieCard'
import TabLoader from '../../Movie/components/TabLoader'

export default function MoviesTab({id, title}) {
	const {data, isSuccess, isFetching} = useGetActorMoviesQuery(id)

	if (isSuccess && !data.length) {
		return <PagePlaceholder text={`No ${title} found`}/>
	}

	if (isFetching) {
		return <TabLoader/>
	}

	return (
		isSuccess && data.length > 0 &&
		<CardContainer>
			{data.map(movie => (
				<MovieCard
					type='movie'
					data={movie}
					key={movie.id}
					id={movie.id}
				/>
			))}
		</CardContainer>
	)
}