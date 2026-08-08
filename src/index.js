import express from 'express';
import { engine } from 'express-handlebars';
import homeController from './controllers/home.controller.js';
import movieController from './controllers/movie.controller.js';
import routes from './routes.js';

const app = express();

//Setup express-handlebars
app.engine('hbs', engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');


//Setup static files
app.use(express.static('src/public'));

//Setup body parser
app.use(express.urlencoded());

//Setup routes 
app.use(routes);

app.listen(5000, () => console.log('Server is running on http://localhost:5000'));