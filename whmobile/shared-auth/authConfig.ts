import * as AuthSession from 'expo-auth-session';

// ✅ Use this in dev
export const redirectUri = AuthSession.makeRedirectUri({
  native:'com.googleusercontent.apps.807110668374-skjoprepfpn386htfkil86is43tejb7o:/oauth2redirect/google',
  useProxy: false,
  
} as any);

console.log('🔮 Redirect URI:', redirectUri);