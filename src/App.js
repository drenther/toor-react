import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import {
	Account,
	Header,
	Footer,
	NoMatch,
	Landing,
	Feeds,
	Callback,
} from './components';
import auth from './utils/Auth';

class App extends Component {
	render() {
		const { handleAuthentication } = this.props;
		const { isAuthenticated, login } = auth;
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/feeds" render={() => <Feeds />} />
					<Route
						exact
						path="/account"
						render={props => {
							!isAuthenticated() && login();
							return <Account />;
						}}
					/>
					<Route
						exact
						path="/callback"
						render={props => {
							handleAuthentication(props);
							return <Callback />;
						}}
					/>
					<Route component={NoMatch} />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default App;
