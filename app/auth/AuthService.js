import Auth0 from 'react-native-auth0';
import {clientId, domain} from './auth0-credentials.json';

const auth0 = new Auth0({ domain, clientId });

class AuthService {
    constructor() {}

    login() {
        return auth0.webAuth.authorize({
            scope: 'openid profile email',
            audience: `https://${domain}/userinfo`
        });
    }

    logout() {
        return auth0.webAuth.clearSession({});
    }
}

export default AuthService;
