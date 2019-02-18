import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Students} from "/imports/api/collections/both/students.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class StudentsDetailsPage extends Component {
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
				<div className="page-container container">
					<div className="row">
						<div className="col-md-12" id="content">
							<div className="row" id="title_row">
								<div className="col-md-12">
								</div>
							</div>
							<StudentsDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12" id="menu">
						</div>
					</div>
					<div className="row">
						<div className="col-md-12" id="subcontent">
							{this.props.subcontent}
						</div>
					</div>
				</div>
			);
		}
	}
}

export const StudentsDetailsPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("student_details", props.routeParams.studentId)
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

				student_details: Students.findOne({_id:props.routeParams.studentId}, {})
			};
		

		
	}
	return { data: data };

})(StudentsDetailsPage);

export class StudentsDetailsPageDetailsForm extends Component {
	constructor () {
		super();

		this.state = {
			studentsDetailsPageDetailsFormErrorMessage: "",
			studentsDetailsPageDetailsFormInfoMessage: ""
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
				{this.state.studentsDetailsPageDetailsFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.studentsDetailsPageDetailsFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ studentsDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ studentsDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var studentsDetailsPageDetailsFormMode = "read_only";
			if(!$("#students-details-page-details-form").find("#form-cancel-button").length) {
				switch(studentsDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ studentsDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ studentsDetailsPageDetailsFormErrorMessage: message });
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

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("students", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		let self = this;
		return (
			<div id="students-details-page-details-form" className="">
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
					Student details
				</h2>
				<form role="form" onSubmit={this.onSubmit} className="form-horizontal">
					{this.state.studentsDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.studentsDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-student-number">
									<label htmlFor="studentNumber" className="col-sm-3 control-label">
										Student Number
									</label>
									<div className="input-div col-sm-9">
										<p className="form-control-static  control-field-student-number">
											{this.props.data.student_details.studentNumber}
										</p>
									</div>
								</div>
										<div className="form-group  field-first-name">
						<label htmlFor="firstName" className="col-sm-3 control-label">
							First Name
						</label>
						<div className="input-div col-sm-9">
							<p className="form-control-static  control-field-first-name">
								{this.props.data.student_details.firstName}
							</p>
						</div>
					</div>
					<div className="form-group  field-middle-name">
						<label htmlFor="middleName" className="col-sm-3 control-label">
							Middle Name
						</label>
						<div className="input-div col-sm-9">
							<p className="form-control-static  control-field-middle-name">
								{this.props.data.student_details.middleName}
							</p>
						</div>
					</div>
					<div className="form-group  field-last-name">
						<label htmlFor="lastName" className="col-sm-3 control-label">
							Last Name
						</label>
						<div className="input-div col-sm-9">
							<p className="form-control-static  control-field-last-name">
								{this.props.data.student_details.lastName}
							</p>
						</div>
					</div>
					<div className="form-group  field-birth-date">
						<label htmlFor="birthDate" className="col-sm-3 control-label">
							Birth date
						</label>
						<div className="input-div col-sm-9">
							<p className="form-control-static  control-field-birth-date">
								{dateUtils.formatDate(this.props.data.student_details.birthDate, 'MM-DD-YYYY')}
							</p>
						</div>
					</div>
					<div className="form-group  field-classroom-name">
						<label htmlFor="classroom.name" className="col-sm-3 control-label">
							Classroom
						</label>
						<div className="input-div col-sm-9">
							<p className="form-control-static  control-field-classroom-name">
								{this.props.data.student_details.classroom.name}
							</p>
						</div>
					</div>
					<div className="form-group">
						<div className="submit-div btn-toolbar col-sm-9 col-sm-offset-3">
						</div>
					</div>
				</form>
			</div>
		);
	}
}

