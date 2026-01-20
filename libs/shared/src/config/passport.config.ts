import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { ENV } from './env.config.js';
import { UnauthorizedError } from '../utils/app-error.js';

export type VerifyUserFn = (id: number) => Promise<any>;

export const setupPassport = (verifyUser: VerifyUserFn) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV.ACCESS_TOKEN_KEY
  };

  passport.use(new JwtStrategy(opts, async (jwt_payload: { sub: string }, done) => {
    try {
      // Use the injected callback instead of direct db call
      const user = await verifyUser(+jwt_payload.sub);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
};

export const passportAuthenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      let message = "Unauthorized access";
      if (info instanceof Error) {
        message = info.message;
      }
      return next(new UnauthorizedError(message));
    }

    (req as any).user = user;
    next();
  })(req, res, next);
};