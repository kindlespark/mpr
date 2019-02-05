import {Mongo} from "meteor/mongo";

export const StudentJournals = new Mongo.Collection("student_journals");

StudentJournals.userCanInsert = function(userId, doc) {
	return true;
};

StudentJournals.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

StudentJournals.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
};
