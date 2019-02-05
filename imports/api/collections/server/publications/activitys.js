import {Meteor} from "meteor/meteor";
import {Activitys} from "/imports/api/collections/both/activitys.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";

Meteor.publish("activity_list", function() {
	return Activitys.find({}, {sort:{activity:1}});
});

Meteor.publish("activitys_empty", function() {
	return Activitys.find({_id:null}, {});
});

Meteor.publish("activity_details", function(activityId) {
	return Activitys.find({_id:activityId}, {});
});

Meteor.publish("activity_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Activitys.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{activity:1}}, extraOptions));
});

Meteor.publish("activity_list_paged_count", function(extraOptions) {
	Counts.publish(this, "activity_list_paged_count", Activitys.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"activityListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Activitys.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{activity:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

