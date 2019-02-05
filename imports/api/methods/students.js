import {Students} from "/imports/api/collections/both/students.js";

Meteor.methods({
	"studentsInsert": function(data) {
		if(!Students.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Students.insert(data);
	},

	"studentsUpdate": function(id, data) {
		var doc = Students.findOne({ _id: id });
		if(!Students.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Students.update({ _id: id }, { $set: data });
	},

	"studentsRemove": function(id) {
		var doc = Students.findOne({ _id: id });
		if(!Students.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Students.remove({ _id: id });
	}
});
