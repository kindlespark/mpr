import {Mongo} from "meteor/mongo";

export const Activitys = new Mongo.Collection("activitys");

Activitys.userCanInsert = function(userId, doc) {
	return true;
};

Activitys.userCanUpdate = function(userId, doc) {
	return true;
};

Activitys.userCanRemove = function(userId, doc) {
	return true;
};
