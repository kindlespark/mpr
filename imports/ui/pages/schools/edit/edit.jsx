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


export class SchoolsEditPage extends Component {
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
						<SchoolsEditPageEditForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const SchoolsEditPageContainer = withTracker(function(props) {



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

})(SchoolsEditPage);

export class SchoolsEditPageEditForm extends Component {
	constructor () {
		super();

		this.state = {
			schoolsEditPageEditFormErrorMessage: "",
			schoolsEditPageEditFormInfoMessage: ""
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
				{this.state.schoolsEditPageEditFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.schoolsEditPageEditFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ schoolsEditPageEditFormInfoMessage: "" });
		this.setState({ schoolsEditPageEditFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var schoolsEditPageEditFormMode = "update";
			if(!$("#schools-edit-page-edit-form").find("#form-cancel-button").length) {
				switch(schoolsEditPageEditFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ schoolsEditPageEditFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("schools", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ schoolsEditPageEditFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("schoolsUpdate", self.props.data.school_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("schools", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	

	

	render() {
		let self = this;
		return (
			<div id="schools-edit-page-edit-form" className="">
				<h2 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					Edit school
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.schoolsEditPageEditFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.schoolsEditPageEditFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-school-code">
									<label htmlFor="schoolCode">
										School Code
									</label>
									<div className="input-div">
										<input type="text" name="schoolCode" defaultValue={this.props.data.school_details.schoolCode} className="form-control " autoFocus="autoFocus" required="required" />
										<span id="help-text" className="help-block" />
										<span id="error-text" className="help-block" />
									</div>
								</div>
										<div className="form-group  field-school-name">
						<label htmlFor="schoolName">
							School Name
						</label>
						<div className="input-div">
							<input type="text" name="schoolName" defaultValue={this.props.data.school_details.schoolName} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-school-address">
						<label htmlFor="schoolAddress">
							School Address
						</label>
						<div className="input-div">
							<input type="text" name="schoolAddress" defaultValue={this.props.data.school_details.schoolAddress} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group">
						<div className="submit-div btn-toolbar">
							<a href="#" id="form-cancel-button" className="btn btn-default" onClick={this.onCancel}>
								Cancel
							</a>
							<button id="form-submit-button" className="btn btn-success" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

