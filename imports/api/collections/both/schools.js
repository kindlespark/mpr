import {Mongo} from "meteor/mongo";

export const Schools = new Mongo.Collection("schools");

Schools.userCanInsert = function(userId, doc) {
	return true;
};

Schools.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

Schools.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
};
