import {useGetActorsQuery} from '../../../services/moviesApi'
import CardContainer from '../../../components/CardContainer'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from './TabLoader'
import ActorCard from '../../../components/ActorCard'

export default function ActorsTab({id, title}) {
  const {data, isSuccess, isFetching} = useGetActorsQuery(id)

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
          <ActorCard
            data={movie}
            key={movie.id}
            id={movie.id}
          />
        ))}
      </CardContainer>

  )
}
