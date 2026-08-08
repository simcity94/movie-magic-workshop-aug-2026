import { Router } from 'express';
import movieRepository from '../repositories/movieRepository.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const result = await movieRepository.getAll();

    res.render('home', { movies: result });
});

homeController.get('/about', (req, res) => {
    res.render('about')
});

export default homeController;