import {useGetActorImagesQuery} from '../../../services/moviesApi'
import Gallery from '../../../components/Gallery'
import PagePlaceholder from '../../../components/PagePlaceholder'
import TabLoader from '../../Movie/components/TabLoader'

export default function PhotosTab({id, title}) {
	const {data, isSuccess, isFetching} = useGetActorImagesQuery(id)

	if (isSuccess && !data.length) {
		return <PagePlaceholder text={`No ${title} found`}/>
	}

	if (isFetching) {
		return <TabLoader/>
	}

	return isSuccess && <Gallery imgUrlsArray={data}/>
}
