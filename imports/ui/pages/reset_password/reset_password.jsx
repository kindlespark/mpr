import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {getFormData} from "/imports/modules/client/form_utils";
import {mergeObjects} from "/imports/modules/both/object_utils";


export class ResetPasswordPage extends Component {
	constructor () {
		super();
		this.state = {
			errorMessage: ""
		};
		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	renderErrorMessage() {
		return (
			<div className="alert alert-warning">
				{this.state.errorMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();

		this.setState({ errorMessage: "" });

		let self = this;

		let submitButton = $(e.target).find("button[type='submit']");

		getFormData(e.target, {
			onSuccess: function(values) {
				if(values.newPassword != values.newPasswordConfirm) {
					self.setState({ errorMessage: "Your password and confirm password doesn't match." });
					return false;
				}

				submitButton.button("loading");
				Accounts.resetPassword(self.props.routeParams.resetPasswordToken, values.newPassword, function(err) {
					submitButton.button("reset");
					if(err) {
						self.setState({ errorMessage: err.message });
						return false;
					}
				});
			},
			onError: function(message) {
				self.setState({ errorMessage: message });
			},
			fields: {
				newPassword: { required: true },
				newPasswordConfirm: { required: true }
			}
		});

		return false;
	}

	

	

	render() {
		if(this.props.data.dataLoading) {
			return (
				<Loading />
			);
		} else {
			return (
				<div className="page-container container" id="content">
					<form id="reset_password_form" className="account-form" role="form" onSubmit={this.onSubmit}>
						<h2 className="account-form-heading">
							Reset password
						</h2>
						{this.state.errorMessage ? this.renderErrorMessage() : null}
						<input id="new-password" type="password" className="form-control" name="newPassword" placeholder="Your new password" required autoFocus />
						<input id="new-password-confirm" type="password" className="form-control" name="newPasswordConfirm" placeholder="Confirm password" required />
						<button className="btn btn-lg btn-primary btn-block" type="submit" data-loading-text="Please wait...">
							Submit
						</button>
					</form>
				</div>
			);
		}
	}
}

export const ResetPasswordPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
		];
		let ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	let data = { dataLoading: true };

	if(isReady()) {
		

		data = {

			};
		

		
	}
	return { data: data };

})(ResetPasswordPage);

