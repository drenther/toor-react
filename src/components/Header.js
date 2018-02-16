import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from '../utils/Auth';

export default class Header extends Component {
	static propTypes = {};

	render() {
		const { isAuthenticated, login, logout } = auth;
		return (
			<div className="header">
				<NavLink to="/" activeClassName="header__brand--active">
					Toor
				</NavLink>
				<div className="header__nav">
					<NavLink to="/feeds" activeClassName="header__nav--active">
						Feeds
					</NavLink>
					{isAuthenticated() ? (
						<Fragment>
							<NavLink to="/account" activeClassName="header__nav--active">
								Account
							</NavLink>
							<button className="header__nav-signout" onClick={logout}>
								Sign Out
							</button>
						</Fragment>
					) : (
						<button className="header__nav-signin" onClick={login}>
							Sign In
						</button>
					)}
				</div>
			</div>
		);
	}
}
