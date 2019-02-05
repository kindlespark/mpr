import {Mongo} from "meteor/mongo";

export const Teachers = new Mongo.Collection("teachers");

Teachers.userCanInsert = function(userId, doc) {
	return true;
};

Teachers.userCanUpdate = function(userId, doc) {
	return true;
};

Teachers.userCanRemove = function(userId, doc) {
	return true;
};
