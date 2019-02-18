import {Classrooms} from "/imports/api/collections/both/classrooms.js";
import {Teachers} from "/imports/api/collections/both/teachers.js";
import {Students} from "/imports/api/collections/both/students.js";
import {StudentJournals} from "/imports/api/collections/both/student_journals.js";
import {Activitys} from "/imports/api/collections/both/activitys.js";
import {Schools} from "/imports/api/collections/both/schools.js";

// Classrooms
Classrooms.join(Teachers, "teacherId", "teacher", ["lastName"]);

// Students
Students.join(Classrooms, "classroomId", "classroom", ["name"]);

// StudentJournals
StudentJournals.join(Activitys, "activityId", "activity", ["activity"]);

// Teachers
Teachers.join(Schools, "schoolId", "school", ["schoolName"]);

