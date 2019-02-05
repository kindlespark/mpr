import {Students} from "/imports/api/collections/both/students.js";
import {Classrooms} from "/imports/api/collections/both/classrooms.js";
import {StudentJournals} from "/imports/api/collections/both/student_journals.js";
import {Activitys} from "/imports/api/collections/both/activitys.js";

// Students
Students.join(Classrooms, "classroomId", "classroom", ["name"]);

// StudentJournals
StudentJournals.join(Activitys, "activityId", "activity", ["activity"]);

