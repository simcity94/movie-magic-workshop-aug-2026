import {Router} from 'express';
import artistService from '../services/artistService.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const artistController = Router();

artistController.get('/create', isAuthenticated, (req, res) => {
    res.render('artists/create', { pageTitle: 'Create Artist' });
});

artistController.post('/create', isAuthenticated, async (req, res) => {
    const artist = req.body;

    await artistService.create(artist);

    res.redirect('/');
});

export default artistController;