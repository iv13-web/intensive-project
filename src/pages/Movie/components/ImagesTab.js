import {useGetMovieImagesQuery} from '../../../services/moviesApi'
import Gallery from '../../../components/Gallery'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from './TabLoader'

export default function ImagesTab({id, title}) {
  const {data, isSuccess, isFetching} = useGetMovieImagesQuery(id)

  if (isSuccess && !data.length) {
    return <PagePlaceholder text={`No ${title} found`}/>
  }

  if (isFetching) {
    return <TabLoader/>
  }

  return isSuccess && <Gallery imgUrlsArray={data}/>
}