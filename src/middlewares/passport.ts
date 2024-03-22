import passport from "passport";
import GooglePassport from "passport-google-oauth20";
import { config } from "dotenv";

config();

const GoogleWay = GooglePassport.Strategy;

interface UserAuthType {
  id: string;
  emails: {
    value: string;
  }[];
  name: { familyName: string; givenName: string };
  photos: [{ value: string }];
  provider: string;
}

const userProfile = (profile: UserAuthType) => {
  const { id, name, emails, provider } = profile;
  let firstName, lastName, email;
  let imageUrl = profile.photos[0].value;

  if (name.givenName) firstName = name.givenName;
  if (emails && emails.length) email = emails[0].value;
  if (name.familyName) lastName = name.familyName;
  return {
    id,
    firstName,
    lastName,
    email,
    provider,
    imageUrl,
  };
};

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser((id: any, done) => {
  done(null, id);
});

passport.use(
  new GoogleWay(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:8000/api/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    (req: any, accessToken: any, refreshToken: any, profile: any, cb: any) => {
      cb(null, userProfile(profile));
    }
  )
);
