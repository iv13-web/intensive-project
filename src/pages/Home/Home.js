import Intro from './components/Intro'
import Slider from './components/Slider'

const slidersConfig = [
	{title: 'Now playing', list: 'now_playing'},
	{title: 'Popular', list: 'popular'},
	{title: 'Top rated', list: 'top_rated'},
	{title: 'Upcoming', list: 'upcoming'},
]

export default function Home() {

	return (
		<>
			<Intro/>
			{slidersConfig.map(slider => (
				<Slider
					key={slider.list}
					title={slider.title}
					list={slider.list}
				/>
			))}
		</>
	)
}
