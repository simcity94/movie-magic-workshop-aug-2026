import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {

    const searchQuery = req.query || '';
    console.log(searchQuery);
    const movies = await movieService.getAll();
    res.render('movies/search', { movies });
});

movieController.get('/create', (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', async (req, res) => {
    const movieData = req.body;

    await movieService.create(movieData);
    res.redirect('/');

}); 

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getById(movieId);

    res.render('movies/details', { movie });
});

export default movieController;