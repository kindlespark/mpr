import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Teachers} from "/imports/api/collections/both/teachers.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class TeachersDetailsPage extends Component {
	constructor () {
		super();
		
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

	

	

	render() {
		if(this.props.data.dataLoading) {
			return (
				<Loading />
			);
		} else {
			return (
				<div>
					<div className="page-container container" id="content">
						<div className="row" id="title_row">
							<div className="col-md-12">
							</div>
						</div>
						<TeachersDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const TeachersDetailsPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("teacher_details", props.routeParams.teacherId)
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

				teacher_details: Teachers.findOne({_id:props.routeParams.teacherId}, {})
			};
		

		
	}
	return { data: data };

})(TeachersDetailsPage);

export class TeachersDetailsPageDetailsForm extends Component {
	constructor () {
		super();

		this.state = {
			teachersDetailsPageDetailsFormErrorMessage: "",
			teachersDetailsPageDetailsFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
		$("input[type='file']").fileinput();
	}

	renderErrorMessage() {
		return(
			<div className="alert alert-warning">
				{this.state.teachersDetailsPageDetailsFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.teachersDetailsPageDetailsFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ teachersDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ teachersDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var teachersDetailsPageDetailsFormMode = "read_only";
			if(!$("#teachers-details-page-details-form").find("#form-cancel-button").length) {
				switch(teachersDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ teachersDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ teachersDetailsPageDetailsFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("teachers", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("teachers", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		let self = this;
		return (
			<div id="teachers-details-page-details-form" className="">
				<h2 id="component-title">
					<span id="form-back-button">
						<a href="#" className="btn btn-default" title="back" onClick={this.onBack}>
							<span className="fa fa-chevron-left">
							</span>
						</a>
						&nbsp;
					</span>
					<span id="component-title-icon" className="">
					</span>
					Details
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.teachersDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.teachersDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-last-name">
									<label htmlFor="lastName">
										Last Name
									</label>
									<div className="input-div">
										<p className="form-control-static  control-field-last-name">
											{this.props.data.teacher_details.lastName}
										</p>
									</div>
								</div>
										<div className="form-group  field-first-name">
						<label htmlFor="firstName">
							First Name
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-first-name">
								{this.props.data.teacher_details.firstName}
							</p>
						</div>
					</div>
					<div className="form-group  field-email">
						<label htmlFor="email">
							Email
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-email">
								{this.props.data.teacher_details.email}
							</p>
						</div>
					</div>
					<div className="form-group  field-school-school-name">
						<label htmlFor="school.schoolName">
							school
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-school-school-name">
								{this.props.data.teacher_details.school.schoolName}
							</p>
						</div>
					</div>
					<div className="form-group">
						<div className="submit-div btn-toolbar">
							<a href="#" id="form-close-button" className="btn btn-primary" onClick={this.onClose}>
								OK
							</a>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

