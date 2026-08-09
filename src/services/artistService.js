import artistRepository from "../repositories/artistRepository.js";

export function create(artistData) {
    artistData.age = Number(artistData.age);
    return artistRepository.create(artistData);
}

export function getAll() {
    return artistRepository.getAll();
}

const artistService = {
    create,
    getAll,
};

export default artistService;