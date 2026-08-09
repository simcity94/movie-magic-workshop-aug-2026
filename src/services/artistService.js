import artistRepository from "../repositories/artistRepository.js";

export function create(artistData) {
    artistData.age = Number(artistData.age);
    return artistRepository.create(artistData);
}

export function getAll(filter = {}) {
    return artistRepository.getAll(filter);
}

const artistService = {
    create,
    getAll,
};

export default artistService;