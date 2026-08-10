import movieRepository from "../repositories/movieRepository.js";

function getAll(filter = {}) {
    return movieRepository.getAll(filter);
}

function attachArtist(movieId, artistId) {
    const movieIdNum = Number(movieId);
    const artistIdNum = Number(artistId);
    return movieRepository.attachArtist(movieIdNum, artistIdNum);
}

function create(movieData, userId) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    movieData.userId = userId;
    return movieRepository.create(movieData);
}

function getById(movieId) {
    const id = Number(movieId);
    return movieRepository.getById(id);
}

async function onDelete(movieId, userId) {
    const movie = await movieRepository.getById(movieId);

    if (!movie) {
        throw new Error('Movie not found');
    }

    if (movie.userId !== userId) {
        throw new Error('You are not authorized to delete this movie');
    }

    await movieRepository.deleteMovie(movieId, userId);
}

function update(movieId, movieData, userId) {
    movieData.rating = Number(movieData.rating);
    movieData.year = Number(movieData.year);
    movieData.userId = userId
    
    return movieRepository.edit(movieId, movieData, userId);
}

const movieService = {
    getAll,
    create,
    getById,
    attachArtist,
    onDelete,
    update
};

export default movieService;