import {useGetActorsQuery} from '../../../store/moviesApi'
import CardContainer from '../../../components/CardContainer'
import Card from '../../../components/Card'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from './TabLoader'

export default function ActorsTab({id, title}) {
  const {data, isSuccess, isFetching} = useGetActorsQuery(id)
  console.log(data)
  return (
    <>
      {isSuccess && data.length > 0 &&
        <CardContainer>
          {data.map(movie => (
            <Card
              type='actor'
              data={movie}
              key={movie.id}
              id={movie.id}
            />
          ))}
        </CardContainer>
      }
      {isSuccess && !data.length &&
        <PagePlaceholder text={`No ${title} found`}/>
      }
      {isFetching && <TabLoader/>}
    </>
  )
}