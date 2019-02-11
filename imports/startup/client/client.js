import "/imports/modules/client/globals/init.js";

import "/imports/api/collections/both/teachers.js";
import "/imports/api/collections/both/student_journals.js";
import "/imports/api/collections/both/students.js";
import "/imports/api/collections/both/activitys.js";
import "/imports/api/collections/both/classrooms.js";

import "/imports/api/collections/both/joins/joins.js";

import "/imports/ui/router/router.jsx";

import "/imports/ui/stylesheets/framework/bootstrap3/js/bootstrap.js";

import "/imports/ui/stylesheets/framework/bootstrap3-plugins/plugins.js";

this.globalOnRendered = function() {};

Meteor.startup(() => {
  /*
    navigator.serviceWorker
    .register("/sw.js")
    .then()
    .catch(error => console.log("ServiceWorker registration failed: ", err));
  */
});
