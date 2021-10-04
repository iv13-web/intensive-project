import CardContainer from '../../../components/CardContainer'
import Card from '../../../components/Card'
import {useGetRecommendationsQuery} from '../../../store/moviesApi'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from './TabLoader'

export default function RecommendationsTab({id, title}) {
	const {data, isSuccess, isFetching} = useGetRecommendationsQuery(id)
	const moviesData = data?.results

	return (
		<>
			{isSuccess && moviesData.length > 0 &&
				<CardContainer>
					{moviesData.map(movie => (
						<Card
							type='movie'
							data={movie}
							key={movie.id}
							id={movie.id}
						/>
					))}
				</CardContainer>
			}
			{isSuccess && !moviesData.length &&
				<PagePlaceholder text={`No ${title} found`}/>
			}
			{isFetching && <TabLoader/>}
		</>
	)
}