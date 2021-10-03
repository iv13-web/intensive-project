import {IMG_URL} from './moviesApi'
import {numberWithSeparator} from '../utils/numberWithSeparator'

export const transformGetMovies = response => {
	const totalPages = response.total_pages
	const updated = response.results.map(movie => ({
		poster: movie.poster_path ? IMG_URL + movie.poster_path : null,
		genres: movie.genre_ids,
		release: movie.release_date,
		title: movie.title,
		id: movie.id,
		rating: movie.vote_average,
		votesCount: movie.vote_count
	}))

	return {totalPages, results: updated}
}

export const transformGetMoviesById = response => {
	return {
		poster: response.poster_path ? IMG_URL + response.poster_path : null,
		genres: response.genres.map(genre => genre.name).join(', '),
		release: response.release_date.split('-').reverse().join('.'),
		overview: response.overview,
		title: response.title,
		id: response.id,
		tagline: response.tagline,
		countries: response.production_countries.map(country => country.name).join(', '),
		rating: response.vote_average + ' / 10',
		votesCount: response.vote_count,
		runtime: response.runtime + ' min',
		budget: numberWithSeparator(response.budget) + '$',
		revenue: numberWithSeparator(response.revenue) + '$',
		companies: response.production_companies.map(company => company.name).join(', ')
	}
}

export const transformGetMovieImages = response => {
	return [
		...response.backdrops.map(item => IMG_URL + item.file_path),
		...response.posters.map(item => IMG_URL + item.file_path)
	]
}

export const transformGetMovieTrailers = response => {
	return response.results.map(item => ({youtubeVideoId: item.key}))
}

export const transformGetActorsQuery = response => {
	return response.cast.filter(item => {
		return item.profile_path && {
			image: IMG_URL + item.profile_path,
			name: item.name,
			character: item.character
		}
	})
}