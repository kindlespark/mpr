import {Meteor} from "meteor/meteor";
import {StudentJournals} from "/imports/api/collections/both/student_journals.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";

Meteor.publish("student_journals", function(studentId) {
	return StudentJournals.publishJoinedCursors(StudentJournals.find({studentId:studentId,ownerId:this.userId}, {}));
});

Meteor.publish("student_journals_empty", function() {
	return StudentJournals.publishJoinedCursors(StudentJournals.find({_id:null,ownerId:this.userId}, {}));
});

Meteor.publish("student_journal", function(journalId) {
	return StudentJournals.publishJoinedCursors(StudentJournals.find({_id:journalId,ownerId:this.userId}, {}));
});

Meteor.publish("student_journals_paged", function(studentId, extraOptions) {
	extraOptions.doSkip = true;
	return StudentJournals.publishJoinedCursors(StudentJournals.find(databaseUtils.extendFilter({studentId:studentId,ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("student_journals_paged_count", function(studentId, extraOptions) {
	Counts.publish(this, "student_journals_paged_count", StudentJournals.find(databaseUtils.extendFilter({studentId:studentId,ownerId:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"studentJournalsPagedExport": function(studentId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = StudentJournals.find(databaseUtils.extendFilter({studentId:studentId,ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

