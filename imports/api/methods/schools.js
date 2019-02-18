import {Schools} from "/imports/api/collections/both/schools.js";

Meteor.methods({
	"schoolsInsert": function(data) {
		if(!Schools.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Schools.insert(data);
	},

	"schoolsUpdate": function(id, data) {
		var doc = Schools.findOne({ _id: id });
		if(!Schools.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Schools.update({ _id: id }, { $set: data });
	},

	"schoolsRemove": function(id) {
		var doc = Schools.findOne({ _id: id });
		if(!Schools.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Schools.remove({ _id: id });
	}
});
