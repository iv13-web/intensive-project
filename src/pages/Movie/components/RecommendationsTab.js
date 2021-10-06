import CardContainer from '../../../components/CardContainer'
import {useGetRecommendationsQuery} from '../../../store/moviesApi'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from './TabLoader'
import MovieCard from '../../../components/MovieCard'

export default function RecommendationsTab({id, title}) {
	const {data, isSuccess, isFetching} = useGetRecommendationsQuery(id)
	const moviesData = data?.results

	if (isSuccess && !moviesData.length) {
		return <PagePlaceholder text={`No ${title} found`}/>
	}

	if (isFetching) {
		return <TabLoader/>
	}

	return (
		isSuccess && moviesData.length > 0 &&
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

	)
}