import {useGetMovieImagesQuery} from '../../../store/moviesApi'
import Gallery from '../../../components/Gallery'

export default function ImagesTab({id}) {
  const {data, isSuccess} = useGetMovieImagesQuery(id)

  return isSuccess && <Gallery data={data}/>
}