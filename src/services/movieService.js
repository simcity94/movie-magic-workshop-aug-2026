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


const movieService = {
    getAll,
    create,
    getById,
    attachArtist
};

export default movieService;