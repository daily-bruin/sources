import * as google from 'googleapis';
import * as url from 'url';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
);
const Profile = google.oauth2('v2'); // to obtain profile details

export function redirectToAuthURL(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authURL = oauth2Client.generateAuthUrl({ scope: 'email' });
  res.redirect(authURL);
}

export function authCallback(req: Request, res: Response, next: NextFunction) {
  const response = url.parse(req.url, true).query; // get authentication code

  if (response.error) {
    res.redirect('/login'); // send user back to login to try again
  } else {
    oauth2Client.getToken(response.code, (err, tokens) => {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (!err) {
        oauth2Client.credentials = tokens; // See https://github.com/google/google-api-nodejs-client/issues/869
        res.redirect('/');
      }
    });
  }
}
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  Profile.userinfo.v2.me.get(
    {
      auth: oauth2Client,
    },
    (err, response) => {
      if (err || response.hd !== 'media.ucla.edu') {
        res.redirect('/login');
      } else {
        return next();
      }
    }
  );
}
