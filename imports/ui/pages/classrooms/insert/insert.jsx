import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Teachers} from "/imports/api/collections/both/teachers.js";
import {Classrooms} from "/imports/api/collections/both/classrooms.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class ClassroomsInsertPage extends Component {
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
						<ClassroomsInsertPageInsertForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const ClassroomsInsertPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("teacher_list"),
			Meteor.subscribe("classrooms_empty")
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

				teacher_list: Teachers.find({}, {sort:{teacher:1}}).fetch(),
				classrooms_empty: Classrooms.findOne({_id:null}, {})
			};
		

		
	}
	return { data: data };

})(ClassroomsInsertPage);

export class ClassroomsInsertPageInsertForm extends Component {
	constructor () {
		super();

		this.state = {
			classroomsInsertPageInsertFormErrorMessage: "",
			classroomsInsertPageInsertFormInfoMessage: ""
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
				{this.state.classroomsInsertPageInsertFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.classroomsInsertPageInsertFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ classroomsInsertPageInsertFormInfoMessage: "" });
		this.setState({ classroomsInsertPageInsertFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var classroomsInsertPageInsertFormMode = "insert";
			if(!$("#classrooms-insert-page-insert-form").find("#form-cancel-button").length) {
				switch(classroomsInsertPageInsertFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ classroomsInsertPageInsertFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("classrooms", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ classroomsInsertPageInsertFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("classroomsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("classrooms", objectUtils.mergeObjects(FlowRouter.current().params, {}));
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
			<div id="classrooms-insert-page-insert-form" className="">
				<h2 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					New classroom
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.classroomsInsertPageInsertFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.classroomsInsertPageInsertFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-name">
									<label htmlFor="name">
										Name
									</label>
									<div className="input-div">
										<input type="text" name="name" defaultValue="" className="form-control " autoFocus="autoFocus" required="required" />
										<span id="help-text" className="help-block" />
										<span id="error-text" className="help-block" />
									</div>
								</div>
										<div className="form-group  field-description">
						<label htmlFor="description">
							Description
						</label>
						<div className="input-div">
							<input type="text" name="description" defaultValue="" className="form-control " />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-teacher-id">
						<label htmlFor="teacherId">
							teacher
						</label>
						<div className="input-div">
							<select className="form-control " name="teacherId" defaultValue="" required="required">
								{this.props.data.teacher_list.map(function(item, index) { return(
								<option key={"dynamic-" + index} value={item._id}>									{item.lastName}</option>
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

