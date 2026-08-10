import { prisma } from '../lib/prisma.js';

async function getAll(filter = {}) {
    let movies = await prisma.movie.findMany();

    // Partial case insensitive search
    if (filter.search) {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    }

    // Exact search
    if (filter.year) {
        movies = movies.filter(movie => movie.year === filter.year);
    }

    // Exact case insensitive
    if (filter.genre) {
        movies = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    }

    return movies;
}

async function getById(movieId) {

    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId
        },
        include: {
            cast: true
        }
    });

    if (!movie) {
        throw new Error('No movie found!');
    }

    return movie;
}

async function create(movieData) {
    const movie = await prisma.movie.create({
        data: movieData
    })
    return movie;
}

async function attachArtist(movieId, artistId) {
    const result = await prisma.movie.update({
        where: {
            id: movieId
        },
        data: {
            cast: {
                connect: { id: artistId }
            }
        }
    });

    return result;
}

export async function deleteMovie(movieId, userId) {
    await prisma.movie.delete({
        where: {
            id: movieId,
            userId: userId
        }
    });
}

const movieRepository = {
    getAll,
    create,
    getById,
    attachArtist,
    deleteMovie
};

export default movieRepository;