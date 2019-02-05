import {Mongo} from "meteor/mongo";

export const Students = new Mongo.Collection("students");

Students.userCanInsert = function(userId, doc) {
	return true;
};

Students.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

Students.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
};
