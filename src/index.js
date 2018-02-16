import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import auth from './utils/Auth';
import history from './utils/History';

import './index.css';

const handleAuthentication = (nextState, replace) => {
	if (/access_token|id_token|error/.test(nextState.location.hash)) {
		auth.handleAuthentication();
	}
};

ReactDOM.render(
	<Router history={history}>
		<App handleAuthentication={handleAuthentication} />
	</Router>,
	document.getElementById('root')
);
registerServiceWorker();
