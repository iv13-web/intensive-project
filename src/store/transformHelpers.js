import {IMG_URL} from './moviesApi'

export const transformGetMovies = (response) => {
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

export const transformGetMoviesById = (response) => {
	return {
		poster: response.poster_path ? IMG_URL + response.poster_path : null,
		genres: response.genres.map(genre => genre.name).join(', '),
		release: response.release_date.split('-').reverse().join('-'),
		overview: response.overview,
		title: response.title,
		id: response.id,
		tagline: response.tagline,
		countries: response.production_countries.map(country => country.name).join(', '),
		rating: response.vote_average,
		votesCount: response.vote_count,
		runtime: response.runtime + ' min'
	}
}