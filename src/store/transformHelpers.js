import {IMG_URL} from '../services/moviesApi'
import {numberWithSeparator} from '../utils/numberWithSeparator'
import {randomInteger} from '../utils/randomInteger'

const standardMovieTransform = movie => {
	return {
		poster: movie.poster_path ? IMG_URL + movie.poster_path : null,
		genres: movie.genre_ids,
		release: movie.release_date,
		title: movie.title,
		id: movie.id,
		rating: movie.vote_average,
		votesCount: movie.vote_count,
		overview: movie.overview,
	}
}

export const transformGetIntroMovie = response => {
	const result =  response.results[randomInteger(0, 19)]
	return standardMovieTransform(result)
}

export const transformGetMovies = response => {
	const totalPages = response.total_pages
	const totalResults = response.total_results
	const updated = response.results.map(standardMovieTransform)

	return {totalPages, results: updated, totalResults}
}

export const transformGetMoviesById = response => {
	return {
		poster: response.poster_path ? IMG_URL + response.poster_path : null,
		genres: response.genres.map(genre => genre.name).join(', '),
		release: response.release_date?.split('-').reverse().join('.'),
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

export const transformGetActorById = response => {
	return {
		biography: response.biography,
		birthday: response.birthday?.split('-').reverse().join('.'),
		deathday: response.deathday,
		name: response.name,
		birthplace: response.place_of_birth,
		photo: IMG_URL + response.profile_path
	}
}

export const transformGetMovieImages = response => {
	return [
		...response.backdrops.map(item => IMG_URL + item.file_path),
		...response.posters.map(item => IMG_URL + item.file_path)
	]
}

export const transformGetActorImages = response => {
	return response.profiles.map(item => IMG_URL + item.file_path)
}

export const transformGetActorMovies = response => {
	return response?.cast
		.filter(movie => movie.poster_path)
		.map(standardMovieTransform)
}

export const transformGetMovieTrailers = response => {
	return response.results.map(item => ({youtubeVideoId: item.key}))
}

export const transformGetActorsQuery = response => {
	return response.cast
		.filter(item => item.profile_path)
		.map(item => ({
			poster: IMG_URL + item.profile_path,
			name: item.name,
			character: item.character,
			id: item.id
		}))
}
