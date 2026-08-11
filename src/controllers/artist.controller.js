import {Router} from 'express';
import artistService from '../services/artistService.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { createArtistSchema } from '../schemas/artistSchema.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const artistController = Router();

artistController.get('/create', isAuthenticated, (req, res) => {
    res.render('artists/create', { pageTitle: 'Create Artist' });
});

artistController.post('/create', isAuthenticated, async (req, res) => {
    const artist = req.body;

    try {
        const artistData = createArtistSchema.parse(artist);

        await artistService.create(artistData);
        res.redirect('/');
    
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('artists/create', { pageTitle: 'Create Artist', error: errorMessage, artist });
    }
});

export default artistController;