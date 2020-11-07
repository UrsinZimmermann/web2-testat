import bodyParser from 'body-parser';
import express from 'express';
import hbs from 'express-hbs';
import path from 'path';

import {noteRoutes} from './routes/noteRoutes.js';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set(path.resolve(), 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(noteRoutes);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
