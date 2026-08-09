import {Router} from 'express';
import artistService from '../services/artistService.js';

const artistController = Router();

artistController.get('/create', (req, res) => {
    res.render('artists/create', { pageTitle: 'Create Artist' });
});

artistController.post('/create', async (req, res) => {
    const artist = req.body;

    await artistService.create(artist);

    res.redirect('/');
});

export default artistController;