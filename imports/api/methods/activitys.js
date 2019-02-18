import {Activitys} from "/imports/api/collections/both/activitys.js";

Meteor.methods({
	"activitysInsert": function(data) {
		if(!Activitys.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Activitys.insert(data);
	},

	"activitysUpdate": function(id, data) {
		var doc = Activitys.findOne({ _id: id });
		if(!Activitys.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Activitys.update({ _id: id }, { $set: data });
	},

	"activitysRemove": function(id) {
		var doc = Activitys.findOne({ _id: id });
		if(!Activitys.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Activitys.remove({ _id: id });
	}
});
