import { makeRedirectUri } from 'expo-auth-session';


interface RedirectUriOptions {
  native?: string;
  path?: string;
  scheme?: string;
  preferLocalhost?: boolean;
  isTripleSlashed?: boolean;
  queryParams?: Record<string, string>;
  useProxy?: boolean;
}


export const redirectUri = makeRedirectUri({
  // This will log the redirect URI to the console
    useProxy: true,
    // For web, you can use the following line instead:
    scheme: 'whimlore',
    path: 'redirect',

  } as RedirectUriOptions); // This is the correct way to set the redirect URI for Expo AuthSession

  console.log('Redirect URI:', makeRedirectUri())