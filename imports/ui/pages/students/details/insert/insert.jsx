import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Activitys} from "/imports/api/collections/both/activitys.js";
import {StudentJournals} from "/imports/api/collections/both/student_journals.js";
import {Students} from "/imports/api/collections/both/students.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class StudentsDetailsInsertPage extends Component {
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
						<StudentsDetailsInsertPageInsertForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const StudentsDetailsInsertPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("activity_list"),
			Meteor.subscribe("student_journals_empty"),
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

				activity_list: Activitys.find({}, {sort:{activity:1}}).fetch(),
				student_journals_empty: StudentJournals.findOne({_id:null}, {}),
				student_details: Students.findOne({_id:props.routeParams.studentId}, {})
			};
		

		
	}
	return { data: data };

})(StudentsDetailsInsertPage);

export class StudentsDetailsInsertPageInsertForm extends Component {
	constructor () {
		super();

		this.state = {
			studentsDetailsInsertPageInsertFormErrorMessage: "",
			studentsDetailsInsertPageInsertFormInfoMessage: ""
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
				{this.state.studentsDetailsInsertPageInsertFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.studentsDetailsInsertPageInsertFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ studentsDetailsInsertPageInsertFormInfoMessage: "" });
		this.setState({ studentsDetailsInsertPageInsertFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var studentsDetailsInsertPageInsertFormMode = "insert";
			if(!$("#students-details-insert-page-insert-form").find("#form-cancel-button").length) {
				switch(studentsDetailsInsertPageInsertFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ studentsDetailsInsertPageInsertFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("students.details", objectUtils.mergeObjects(FlowRouter.current().params, {studentId: self.props.routeParams.studentId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ studentsDetailsInsertPageInsertFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.studentId = self.props.routeParams.studentId;

				Meteor.call("studentJournalsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("students.details", objectUtils.mergeObjects(FlowRouter.current().params, {studentId: self.props.routeParams.studentId}));
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
			<div id="students-details-insert-page-insert-form" className="">
				<h2 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					Add item
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.studentsDetailsInsertPageInsertFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.studentsDetailsInsertPageInsertFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-subject">
									<label htmlFor="subject">
										Subject
									</label>
									<div className="input-div">
										<input type="text" name="subject" defaultValue="" className="form-control " autoFocus="autoFocus" required="required" />
										<span id="help-text" className="help-block" />
										<span id="error-text" className="help-block" />
									</div>
								</div>
										<div className="form-group  field-activity-id">
						<label htmlFor="activityId">
							Activity
						</label>
						<div className="input-div">
							<select className="form-control " name="activityId" defaultValue="" required="required">
								{this.props.data.activity_list.map(function(item, index) { return(
								<option key={"dynamic-" + index} value={item._id}>									{item.activity}</option>
								); }) }
							</select>
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-activity-date">
						<label htmlFor="activityDate">
							Activity Date
						</label>
						<div className="input-div">
							<div className="input-group date">
								<input type="text" name="activityDate" defaultValue={dateUtils.formatDate('today', 'MM-DD-YYYY')} className="form-control " required="required" data-type="date" data-format="MM-DD-YYYY" />
								<span className="input-group-addon">
									<i className="fa fa-calendar" />
								</span>
							</div>
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-note">
						<label htmlFor="note">
							Note
						</label>
						<div className="input-div">
							<input type="text" name="note" defaultValue="" className="form-control " />
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

