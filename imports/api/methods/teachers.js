import {Teachers} from "/imports/api/collections/both/teachers.js";

Meteor.methods({
	"teachersInsert": function(data) {
		if(!Teachers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Teachers.insert(data);
	},

	"teachersUpdate": function(id, data) {
		var doc = Teachers.findOne({ _id: id });
		if(!Teachers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Teachers.update({ _id: id }, { $set: data });
	},

	"teachersRemove": function(id) {
		var doc = Teachers.findOne({ _id: id });
		if(!Teachers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Teachers.remove({ _id: id });
	}
});
