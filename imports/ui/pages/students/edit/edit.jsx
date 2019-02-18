import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Classrooms} from "/imports/api/collections/both/classrooms.js";
import {Students} from "/imports/api/collections/both/students.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class StudentsEditPage extends Component {
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
						<StudentsEditPageEditForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const StudentsEditPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("classroom_list"),
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

				classroom_list: Classrooms.find({}, {sort:{name:1}}).fetch(),
				student_details: Students.findOne({_id:props.routeParams.studentId}, {})
			};
		

		
	}
	return { data: data };

})(StudentsEditPage);

export class StudentsEditPageEditForm extends Component {
	constructor () {
		super();

		this.state = {
			studentsEditPageEditFormErrorMessage: "",
			studentsEditPageEditFormInfoMessage: ""
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
				{this.state.studentsEditPageEditFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.studentsEditPageEditFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ studentsEditPageEditFormInfoMessage: "" });
		this.setState({ studentsEditPageEditFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var studentsEditPageEditFormMode = "update";
			if(!$("#students-edit-page-edit-form").find("#form-cancel-button").length) {
				switch(studentsEditPageEditFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ studentsEditPageEditFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("students", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ studentsEditPageEditFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("studentsUpdate", self.props.data.student_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("students", objectUtils.mergeObjects(FlowRouter.current().params, {}));
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
			<div id="students-edit-page-edit-form" className="">
				<h2 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					Edit invoice
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.studentsEditPageEditFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.studentsEditPageEditFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-student-number">
									<label htmlFor="studentNumber">
										Student Number
									</label>
									<div className="input-div">
										<input type="text" name="studentNumber" defaultValue={this.props.data.student_details.studentNumber} className="form-control " autoFocus="autoFocus" required="required" />
										<span id="help-text" className="help-block" />
										<span id="error-text" className="help-block" />
									</div>
								</div>
										<div className="form-group  field-first-name">
						<label htmlFor="firstName">
							First Name
						</label>
						<div className="input-div">
							<input type="text" name="firstName" defaultValue={this.props.data.student_details.firstName} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-middle-name">
						<label htmlFor="middleName">
							Middle Name
						</label>
						<div className="input-div">
							<input type="text" name="middleName" defaultValue={this.props.data.student_details.middleName} className="form-control " />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-last-name">
						<label htmlFor="lastName">
							Last Name
						</label>
						<div className="input-div">
							<input type="text" name="lastName" defaultValue={this.props.data.student_details.lastName} className="form-control " required="required" />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-birth-date">
						<label htmlFor="birthDate">
							Birth date
						</label>
						<div className="input-div">
							<div className="input-group date">
								<input type="text" name="birthDate" defaultValue={dateUtils.formatDate(this.props.data.student_details.birthDate, 'MM-DD-YYYY')} className="form-control " required="required" data-type="date" data-format="MM-DD-YYYY" />
								<span className="input-group-addon">
									<i className="fa fa-calendar" />
								</span>
							</div>
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-classroom-id">
						<label htmlFor="classroomId">
							Classroom
						</label>
						<div className="input-div">
							<select className="form-control " name="classroomId" defaultValue={this.props.data.student_details.classroomId} required="required">
								{this.props.data.classroom_list.map(function(item, index) { return(
								<option key={"dynamic-" + index} value={item._id}>									{item.name}</option>
								); }) }
							</select>
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

