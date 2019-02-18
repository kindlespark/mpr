import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";


export class HomePublicPage extends Component {
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
						<HomePublicPageHomeJumbotron data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const HomePublicPageContainer = withTracker(function(props) {



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

})(HomePublicPage);

export class HomePublicPageHomeJumbotron extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		
	}

	

	

	render() {
		return (
			<div className="jumbotron ">
				<div id="content" className="container">
					<h1 id="component-title">
						<span id="component-title-icon" className="">
						</span>
						Montessori Progress Report
					</h1>
					<p id="jumbotron-text">
						<b>The Montessori Method of education developed by Maria Montessori, is a child-centered educational approach based on scientific observations of children. </b><br />The Montessori method views the child as one who is naturally eager for knowledge and capable of initiating learning in a supportive, thoughtfully prepared learning environment. It attempts to develop children physically, socially, emotionally and cognitively.<br />
					</p>
					<p id="jumbotron-button">
						<a href={pathFor('login')} className="btn btn-primary btn-lg" role="button">
							Continue &raquo;
						</a>
					</p>
				</div>
			</div>
		);
	}
}

