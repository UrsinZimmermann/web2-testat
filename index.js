import bodyParser from 'body-parser';
import express from 'express';
import handlebars from 'express-hbs';
import path from 'path';
import {noteRoutes} from './routes/noteRoutes.js';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const hbs = handlebars.create({
    helpers: {
        displayDate: function (date) {
            return new Date(date).toISOString().substring(0, 10);
        }
    }
})

app.engine('hbs', hbs.express4({defaultLayout: "views/layout"}));
app.set(path.resolve(), 'views');
app.set('view engine', 'hbs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(noteRoutes);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});