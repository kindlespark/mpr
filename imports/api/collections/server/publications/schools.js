import {Meteor} from "meteor/meteor";
import {Schools} from "/imports/api/collections/both/schools.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";

Meteor.publish("school_list", function() {
	return Schools.find({ownerId:this.userId}, {sort:{school:1}});
});

Meteor.publish("schools_empty", function() {
	return Schools.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("school_details", function(schoolId) {
	return Schools.find({_id:schoolId,ownerId:this.userId}, {});
});

Meteor.publish("school_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Schools.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{school:1}}, extraOptions));
});

Meteor.publish("school_list_paged_count", function(extraOptions) {
	Counts.publish(this, "school_list_paged_count", Schools.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"schoolListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Schools.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{school:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

