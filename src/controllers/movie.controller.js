import { Router } from "express";
import movieService from "../services/movieService.js";
import artistService from "../services/artistService.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const movieController = Router();

movieController.get('/search', async (req, res) => {

    const filter = req.query
    const movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter, pageTitle: 'Search Movies' });
});

movieController.get('/create', isAuthenticated, (req, res) => {
    res.render('movies/create', { pageTitle: 'Create Movie'});
});

movieController.post('/create', isAuthenticated, async (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    await movieService.create(movieData, userId);
    
    res.redirect('/');

}); 

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req?.user?.id;

    const movie = await movieService.getById(movieId);

    const isOwner = movie.userId && movie.userId === userId;
    
    const rating = Math.round(movie.rating);
    const ratingStars = '&#x2605;'.repeat(rating);

    res.render('movies/details', { movie, pageTitle: movie.title, ratingStars, isOwner });
});

movieController.get('/:movieId/attach', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    const artists = await artistService.getAll({ exclude: movie.cast.map(a => a.id)});

    res.render('movies/attach', { pageTitle: 'Attach Artist to Movie', movie, artists });

});

movieController.post('/:movieId/attach', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/delete', isAuthenticated, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    await movieService.onDelete(movieId, userId);
    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuthenticated, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    const movie = await movieService.getById(movieId);

    if (movie.userId !== userId) {
        return res.status(403).send('You are not authorized to edit this movie');
    }

    res.render('movies/edit', { pageTitle: 'Edit Movie', movie });
});

movieController.post('/:movieId/edit', isAuthenticated, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;
    const movieData = req.body;

    await movieService.update(movieId, movieData, userId);
    res.redirect(`/movies/${movieId}`);
});

export default movieController;