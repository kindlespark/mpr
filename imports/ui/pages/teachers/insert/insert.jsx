import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Schools} from "/imports/api/collections/both/schools.js";
import {Teachers} from "/imports/api/collections/both/teachers.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class TeachersInsertPage extends Component {
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
						<TeachersInsertPageInsertForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const TeachersInsertPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("school_list"),
			Meteor.subscribe("teachers_empty")
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

				school_list: Schools.find({}, {sort:{school:1}}).fetch(),
				teachers_empty: Teachers.findOne({_id:null}, {})
			};
		

		
	}
	return { data: data };

})(TeachersInsertPage);

export class TeachersInsertPageInsertForm extends Component {
	constructor () {
		super();

		this.state = {
			teachersInsertPageInsertFormErrorMessage: "",
			teachersInsertPageInsertFormInfoMessage: ""
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
				{this.state.teachersInsertPageInsertFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.teachersInsertPageInsertFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ teachersInsertPageInsertFormInfoMessage: "" });
		this.setState({ teachersInsertPageInsertFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var teachersInsertPageInsertFormMode = "insert";
			if(!$("#teachers-insert-page-insert-form").find("#form-cancel-button").length) {
				switch(teachersInsertPageInsertFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ teachersInsertPageInsertFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("teachers", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ teachersInsertPageInsertFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("teachersInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("teachers", objectUtils.mergeObjects(FlowRouter.current().params, {}));
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
			<div id="teachers-insert-page-insert-form" className="">
				<h2 id="component-title">
					<span id="component-title-icon" className="">
					</span>
					New teacher
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.teachersInsertPageInsertFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.teachersInsertPageInsertFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-last-name">
									<label htmlFor="lastName">
										Last Name
									</label>
									<div className="input-div">
										<input type="text" name="lastName" defaultValue="" className="form-control " autoFocus="autoFocus" required="required" />
										<span id="help-text" className="help-block" />
										<span id="error-text" className="help-block" />
									</div>
								</div>
										<div className="form-group  field-first-name">
						<label htmlFor="firstName">
							First Name
						</label>
						<div className="input-div">
							<input type="text" name="firstName" defaultValue="" className="form-control " />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-email">
						<label htmlFor="email">
							Email
						</label>
						<div className="input-div">
							<input type="text" name="email" defaultValue="" className="form-control " />
							<span id="help-text" className="help-block" />
							<span id="error-text" className="help-block" />
						</div>
					</div>
					<div className="form-group  field-school-id">
						<label htmlFor="schoolId">
							School
						</label>
						<div className="input-div">
							<select className="form-control " name="schoolId" defaultValue="" required="required">
								{this.props.data.school_list.map(function(item, index) { return(
								<option key={"dynamic-" + index} value={item._id}>									{item.schoolName}</option>
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

