import auth0 from 'auth0-js';

import history from './History';

class Auth {
	auth0 = new auth0.WebAuth({
		domain: 'toor-india.auth0.com',
		clientID: '416uL-jwIO0aVAcBg0WuGyVEn-jMlxgb',
		redirectUri: 'https://toor-india.surge.sh/callback',
		audience: 'https://toor-india.auth0.com/userinfo',
		responseType: 'token id_token',
		scope: 'openid profile email',
	});

	login = () => {
		this.auth0.authorize();
	};

	handleAuthentication = () => {
		this.auth0.parseHash((err, authResult) => {
			console.log(authResult);
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				history.replace('/');
			} else if (err) {
				history.replace('/');
				console.error(err);
			}
		});
	};

	setSession = authResult => {
		let expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
		history.replace('/');
	};

	logout = () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		history.replace('/');
	};

	isAuthenticated = () => {
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	};
}

export default new Auth();
