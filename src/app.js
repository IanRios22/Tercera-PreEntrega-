import 'dotenv/config';
import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import appRouter from './routes/app.routes.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import setupSocket from './chat/socket.js';
import cors from 'cors';

const PORT = 8080;
const app = express();
const httpserver = app.listen(PORT, () => console.log("Server up."));

// Conectar a la base de datos
const connectionString = "mongodb://127.0.0.1:27017/dbprueba";

mongoose.connect(connectionString)
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos: " + error);
        process.exit(1);
    });

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false
};

const port = PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine({
    defaultLayout: 'main',
    extname: '.handlebars',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    },
}));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session(mongoStoreOptions));
initPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use('/', appRouter);

setupSocket(httpserver);

