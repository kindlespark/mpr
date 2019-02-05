import {StudentJournals} from "/imports/api/collections/both/student_journals.js";

StudentJournals.allow({
	insert: function (userId, doc) {
		return false;
	},

	update: function (userId, doc, fields, modifier) {
		return false;
	},

	remove: function (userId, doc) {
		return false;
	}
});

StudentJournals.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

StudentJournals.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

StudentJournals.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

StudentJournals.before.remove(function(userId, doc) {
	
});

StudentJournals.after.insert(function(userId, doc) {
	
});

StudentJournals.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

StudentJournals.after.remove(function(userId, doc) {
	
});
