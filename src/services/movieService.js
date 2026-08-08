import movieRepository from "../repositories/movieRepository.js";

function getAll() {
    return movieRepository.getAll();
}

function create(movieData) {
   return movieRepository.create(movieData);
}

function getById(movieId) {
    return movieRepository.getById(movieId);
}


const movieService = {
    getAll,
    create,
    getById,
};

export default movieService;