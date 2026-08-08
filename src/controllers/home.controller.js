import { Router } from 'express';
import movieRepository from '../repositories/movieRepository.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const movies = await movieRepository.getAll();

    res.render('home', { movies, pageTitle: 'Home' });
});

homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About' });
});

export default homeController;