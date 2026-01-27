import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { ENV } from './env.config.js';
import { UnauthorizedError } from '../utils/app-error.js';
import { SYSTEM_MESSAGE } from '../config/response-message.config.js';

// Generic user type to avoid circular dependency
export interface IUserAuth {
  id: number;
  email: string;
  is_verified: boolean;
  is_locked: boolean;
  [key: string]: any;
}

export type VerifyUserFn = (id: number) => Promise<any>;

const extractJwtFromCookie = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['refresh_token'];
  }

  return token;
};

export const setupPassport = (verifyUser: VerifyUserFn) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV.ACCESS_TOKEN_KEY
  };

  passport.use("jwt", new JwtStrategy(opts, async (jwt_payload: { sub: string }, done) => {
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

  passport.use('jwt-refresh', new JwtStrategy({
    jwtFromRequest: extractJwtFromCookie,
    secretOrKey: ENV.REFRESH_TOKEN_KEY
  }, async (jwt_payload: { sub: string }, done) => {
    try {
      const user = { id: jwt_payload.sub }
      return user ? done(null, user) : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }));

};

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: IUserAuth, info: any) => {
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

    if (user.is_verified === false) {
      return next(new UnauthorizedError(SYSTEM_MESSAGE.UNAUTHORIZED.NOT_VERIFIED));
    }

    if (user.is_locked === true) {
      return next(new UnauthorizedError(SYSTEM_MESSAGE.UNAUTHORIZED.LOCKED));
    }

    (req as any).user = user;
    next();
  })(req, res, next);
};

export const authenticateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt-refresh", { session: false }, (err: any, user: any, info: any) => {
    if (err) return next(err);

    if (!user) {
      let message = "Invalid refresh token";
      if (info instanceof Error) message = info.message;
      return next(new UnauthorizedError(message));
    }

    (req as any).user = user;
    next();
  })(req, res, next);
};