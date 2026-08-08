import { Router } from "express";
import homeController from './controllers/home.controller.js';
import movieController from './controllers/movie.controller.js';

const routes = Router();

routes.use('/', homeController);
routes.use('/movies', movieController);

routes.get('*url', (req, res) => {
    res.render('movies/404');
});

export default routes;