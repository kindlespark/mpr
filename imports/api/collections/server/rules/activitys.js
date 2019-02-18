import {Activitys} from "/imports/api/collections/both/activitys.js";

Activitys.allow({
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

Activitys.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Activitys.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Activitys.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Activitys.before.remove(function(userId, doc) {
	
});

Activitys.after.insert(function(userId, doc) {
	
});

Activitys.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Activitys.after.remove(function(userId, doc) {
	
});
