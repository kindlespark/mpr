import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Schools} from "/imports/api/collections/both/schools.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class SchoolsDetailsPage extends Component {
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
						<SchoolsDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const SchoolsDetailsPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("school_details", props.routeParams.schoolId)
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

				school_details: Schools.findOne({_id:props.routeParams.schoolId}, {})
			};
		

		
	}
	return { data: data };

})(SchoolsDetailsPage);

export class SchoolsDetailsPageDetailsForm extends Component {
	constructor () {
		super();

		this.state = {
			schoolsDetailsPageDetailsFormErrorMessage: "",
			schoolsDetailsPageDetailsFormInfoMessage: ""
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
				{this.state.schoolsDetailsPageDetailsFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.schoolsDetailsPageDetailsFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ schoolsDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ schoolsDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var schoolsDetailsPageDetailsFormMode = "read_only";
			if(!$("#schools-details-page-details-form").find("#form-cancel-button").length) {
				switch(schoolsDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ schoolsDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ schoolsDetailsPageDetailsFormErrorMessage: message });
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

		FlowRouter.go("schools", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("schools", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		let self = this;
		return (
			<div id="schools-details-page-details-form" className="">
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
					{this.state.schoolsDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.schoolsDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-school-code">
									<label htmlFor="schoolCode">
										School Code
									</label>
									<div className="input-div">
										<p className="form-control-static  control-field-school-code">
											{this.props.data.school_details.schoolCode}
										</p>
									</div>
								</div>
										<div className="form-group  field-school-name">
						<label htmlFor="schoolName">
							School Name
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-school-name">
								{this.props.data.school_details.schoolName}
							</p>
						</div>
					</div>
					<div className="form-group  field-school-address">
						<label htmlFor="schoolAddress">
							School Address
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-school-address">
								{this.props.data.school_details.schoolAddress}
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

