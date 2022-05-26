import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import path from "path";
import { User, getUserByUsername, getUserById } from "./api/user";
import Env from "./interfaces/Env";

export const initMiddleware = (app: Application): void => {
  const { SECRET } = process.env as Env;

  // Request parsers
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Enable CORS
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  // Parse cookies
  app.use(cookieParser(SECRET));
  // Handle Passport local session
  app.use(
    session({
      secret: SECRET!,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new Strategy(
      async (username: string, password: string, done): Promise<void> => {
        try {
          const user: User | undefined = await getUserByUsername(username);
          if (!user) return done(null, false);
          if (await bcrypt.compare(password, user.password))
            return done(null, user);
          else return done(null, false);
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser(
    (user: Express.User, cb: (err: any, id?: unknown) => void): void => {
      cb(null, (user as User).id);
    }
  );
  passport.deserializeUser((id: string, cb) => {
    getUserById(id)
      .catch((err) => {
        console.error(err);
        cb(err, null);
      })
      .then((user) => {
        const { username }: { username: string } = user!;
        cb(null, { username });
      });
  });
};
