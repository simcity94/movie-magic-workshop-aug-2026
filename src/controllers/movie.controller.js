import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', async (req, res) => {
    const movieData = req.body;

    await movieService.create(movieData);
    res.redirect('/');

}); 

export default movieController;