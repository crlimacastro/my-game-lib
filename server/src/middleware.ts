import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';

// import passportConfig from "./passportConfig";

export default (app: Application) => {
  const { PORT, SECRET } = process.env;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: `http://localhost:${PORT}`,
      credentials: true,
    }),
  );
  app.use(
    session({
      secret: SECRET!,
      resave: true,
      saveUninitialized: true,
    }),
  );
  app.use(cookieParser(SECRET));
  app.use(passport.initialize());
  app.use(passport.session());
  // passportConfig(passport);
};
