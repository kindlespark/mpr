import {Meteor} from "meteor/meteor";
import {Teachers} from "/imports/api/collections/both/teachers.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";

Meteor.publish("teacher_list", function() {
	return Teachers.find({}, {sort:{teacher:1}});
});

Meteor.publish("teachers_empty", function() {
	return Teachers.find({_id:null}, {});
});

Meteor.publish("teacher_details", function(teacherId) {
	return Teachers.find({_id:teacherId}, {});
});

Meteor.publish("teacher_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Teachers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{teacher:1}}, extraOptions));
});

Meteor.publish("teacher_list_paged_count", function(extraOptions) {
	Counts.publish(this, "teacher_list_paged_count", Teachers.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"teacherListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Teachers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{teacher:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

