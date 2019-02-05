import {Meteor} from "meteor/meteor";
import {Students} from "/imports/api/collections/both/students.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";

Meteor.publish("student_list", function() {
	return Students.publishJoinedCursors(Students.find({ownerId:this.userId}, {sort:{studentNumber:-1}}));
});

Meteor.publish("students_empty", function() {
	return Students.publishJoinedCursors(Students.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("student_details", function(studentId) {
	return Students.publishJoinedCursors(Students.find({_id:studentId,ownerId:this.userId}, {}));
});

Meteor.publish("student_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Students.publishJoinedCursors(Students.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{studentNumber:-1}}, extraOptions)));
});

Meteor.publish("student_list_paged_count", function(extraOptions) {
	Counts.publish(this, "student_list_paged_count", Students.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"studentListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Students.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{studentNumber:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

