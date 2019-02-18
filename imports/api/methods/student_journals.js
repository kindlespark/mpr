import {StudentJournals} from "/imports/api/collections/both/student_journals.js";

Meteor.methods({
	"studentJournalsInsert": function(data) {
		if(!StudentJournals.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return StudentJournals.insert(data);
	},

	"studentJournalsUpdate": function(id, data) {
		var doc = StudentJournals.findOne({ _id: id });
		if(!StudentJournals.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		StudentJournals.update({ _id: id }, { $set: data });
	},

	"studentJournalsRemove": function(id) {
		var doc = StudentJournals.findOne({ _id: id });
		if(!StudentJournals.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		StudentJournals.remove({ _id: id });
	}
});
