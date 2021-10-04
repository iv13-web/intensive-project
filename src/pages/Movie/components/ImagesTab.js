import {useGetMovieImagesQuery} from '../../../store/moviesApi'
import Gallery from '../../../components/Gallery'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from './TabLoader'

export default function ImagesTab({id, title}) {
  const {data, isSuccess, isFetching} = useGetMovieImagesQuery(id)

  return (
    <>
      {isSuccess && <Gallery imgUrlsArray={data}/>}
      {isSuccess && !data.length &&
        <PagePlaceholder text={`No ${title} found`}/>
      }
      {isFetching && <TabLoader/>}
    </>
  )
}