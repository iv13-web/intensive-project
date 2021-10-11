import FavoriteButton from '../components/FavoriteButton'

export default {
	title: 'FavoriteButton',
	component: FavoriteButton,
	argTypes: {onClick: {action: 'toggleFavorite'}}
}

export const Standard = args => <FavoriteButton {...args}/>

Standard.args = {
	checked: false,
	isSignedIn: true,
}
