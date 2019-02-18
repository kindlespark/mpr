import { Users } from "meteor-user-roles";
import "/imports/api/collections/both/teachers.js";
import "/imports/api/collections/both/student_journals.js";
import "/imports/api/collections/both/schools.js";
import "/imports/api/collections/both/students.js";
import "/imports/api/collections/both/activitys.js";
import "/imports/api/collections/both/classrooms.js";

import "/imports/api/collections/both/joins/joins.js";

import "/imports/api/collections/server/rules/teachers.js";
import "/imports/api/collections/server/rules/student_journals.js";
import "/imports/api/collections/server/rules/schools.js";
import "/imports/api/collections/server/rules/students.js";
import "/imports/api/collections/server/rules/activitys.js";
import "/imports/api/collections/server/rules/classrooms.js";

import "/imports/api/collections/server/publications/teachers.js";
import "/imports/api/collections/server/publications/student_journals.js";
import "/imports/api/collections/server/publications/schools.js";
import "/imports/api/collections/server/publications/students.js";
import "/imports/api/collections/server/publications/activitys.js";
import "/imports/api/collections/server/publications/classrooms.js";

import "/imports/api/methods/teachers.js";
import "/imports/api/methods/student_journals.js";
import "/imports/api/methods/schools.js";
import "/imports/api/methods/students.js";
import "/imports/api/methods/activitys.js";
import "/imports/api/methods/classrooms.js";

import "/imports/api/server_routes/router.js";

var verifyEmail = false;

Accounts.config({ sendVerificationEmail: verifyEmail });

Meteor.startup(function() {
  console.log(`server|startup`);
  // read environment variables from Meteor.settings
  if (Meteor.settings && Meteor.settings.env) {
    for (var variableName in Meteor.settings.env) {
      process.env[variableName] = Meteor.settings.env[variableName];
    }
  }

  // Email templates config
  if (Accounts.emailTemplates) {
    Accounts.emailTemplates.siteName = "MPR v0.0.1";
    Accounts.emailTemplates.from = "";
  }

  //
  // Setup OAuth login service configuration (read from Meteor.settings)
  //
  // Your settings file should look like this:
  //
  // {
  //     "oauth": {
  //         "google": {
  //             "clientId": "yourClientId",
  //             "secret": "yourSecret"
  //         },
  //         "github": {
  //             "clientId": "yourClientId",
  //             "secret": "yourSecret"
  //         }
  //         "linkedin": {
  //             "clientId": "yourClientId",
  //             "secret": "yourSecret"
  //         },
  //         "auth0": {
  //              "domain": "",
  //              "clientId": "",
  //              "secret": ""
  //         }
  //     }
  // }
  //
  if (
    Accounts &&
    Accounts.loginServiceConfiguration &&
    Meteor.settings &&
    Meteor.settings.oauth
  ) {
    // google
    if (Meteor.settings.oauth.google) {
      // remove old configuration
      Accounts.loginServiceConfiguration.remove({
        service: "google"
      });

      var settingsObject = Meteor.settings.oauth.google;
      settingsObject.service = "google";

      // add new configuration
      Accounts.loginServiceConfiguration.insert(settingsObject);
    }
    // github
    if (Meteor.settings.oauth.github) {
      // remove old configuration
      Accounts.loginServiceConfiguration.remove({
        service: "github"
      });

      var settingsObject = Meteor.settings.oauth.github;
      settingsObject.service = "github";

      // add new configuration
      Accounts.loginServiceConfiguration.insert(settingsObject);
    }
    // linkedin
    if (Meteor.settings.oauth.linkedin) {
      // remove old configuration
      Accounts.loginServiceConfiguration.remove({
        service: "linkedin"
      });

      var settingsObject = Meteor.settings.oauth.linkedin;
      settingsObject.service = "linkedin";

      // add new configuration
      Accounts.loginServiceConfiguration.insert(settingsObject);
    }
    // facebook
    if (Meteor.settings.oauth.facebook) {
      // remove old configuration
      Accounts.loginServiceConfiguration.remove({
        service: "facebook"
      });

      var settingsObject = Meteor.settings.oauth.facebook;
      settingsObject.service = "facebook";

      // add new configuration
      Accounts.loginServiceConfiguration.insert(settingsObject);
    }
    // twitter
    if (Meteor.settings.oauth.twitter) {
      // remove old configuration
      Accounts.loginServiceConfiguration.remove({
        service: "twitter"
      });

      var settingsObject = Meteor.settings.oauth.twitter;
      settingsObject.service = "twitter";

      // add new configuration
      Accounts.loginServiceConfiguration.insert(settingsObject);
    }
    // meteor
    if (Meteor.settings.oauth.meteor) {
      // remove old configuration
      Accounts.loginServiceConfiguration.remove({
        service: "meteor-developer"
      });

      var settingsObject = Meteor.settings.oauth.meteor;
      settingsObject.service = "meteor-developer";

      // add new configuration
      Accounts.loginServiceConfiguration.insert(settingsObject);
    }
    // auth0
    if (Meteor.settings.oauth.auth0) {
      // remove old configuration
      Accounts.loginServiceConfiguration.remove({
        service: "auth0"
      });

      var settingsObject = Meteor.settings.oauth.auth0;
      settingsObject.service = "auth0";

      // add new configuration
      Accounts.loginServiceConfiguration.insert(settingsObject);
    }
  }
});

var getUserOAuthProfile = function(doc) {
  console.log(`server|getUserOAuthProfile`);
  console.log(`server|getUserOAuthProfile|doc`, JSON.stringify(doc));
  if (doc.services) {
    doc.profile = doc.profile || {};
    doc.private = doc.private || {};
    // google e-mail
    if (doc.services.google && doc.services.google.email) {
      doc.private.email = doc.services.google.email;
      doc.private.picture = doc.services.google.picture;
      console.log(
        `server|getUserOAuthProfile|email`,
        JSON.stringify(doc.private.email)
      );
      console.log(
        `server|getUserOAuthProfile|picture`,
        JSON.stringify(doc.private.picture)
      );
    } else {
      // github e-mail
      if (doc.services.github && doc.services.github.accessToken) {
        var github = new GitHub({
          version: "3.0.0",
          timeout: 5000
        });

        github.authenticate({
          type: "oauth",
          token: doc.services.github.accessToken
        });

        try {
          var result = github.user.getEmails({});
          var email = _.findWhere(result, { primary: true });
          if (!email && result.length && _.isString(result[0])) {
            email = { email: result[0] };
          }

          if (email) {
            doc.private.email = email.email;
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        // linkedin email
        if (doc.services.linkedin && doc.services.linkedin.emailAddress) {
          doc.profile.name =
            doc.services.linkedin.firstName +
            " " +
            doc.services.linkedin.lastName;
          doc.profile.firstName = doc.services.linkedin.firstName;
          doc.profile.lastName = doc.services.linkedin.lastName;
          doc.private.email = doc.services.linkedin.emailAddress;
        } else {
          if (doc.services.facebook && doc.services.facebook.email) {
            // facebook
            doc.private.email = doc.services.facebook.email;
          } else {
            if (doc.services.twitter && doc.services.twitter.email) {
              // twitter
              doc.private.email = doc.services.twitter.email;
            } else {
              if (
                doc.services["meteor-developer"] &&
                doc.services["meteor-developer"].emails &&
                doc.services["meteor-developer"].emails.length
              ) {
                // meteor
                doc.private.email =
                  doc.services["meteor-developer"].emails[0].address;
              } else {
                if (doc.services.auth0) {
                  // auth0
                  doc.profile.name =
                    doc.services.auth0.given_name +
                    " " +
                    doc.services.auth0.family_name;
                  doc.profile.firstName = doc.services.auth0.given_name;
                  doc.profile.lastName = doc.services.auth0.family_name;
                  doc.private.email = doc.services.auth0.email;
                }
              }
            }
          }
        }
      }
    }
  }
  return doc;
};

Accounts.onCreateUser(function(options, user) {
  user.roles = [];

  if (options.profile) {
    user.profile = options.profile;
  }

  user.private = user.private || {};

  Meteor.call("detectUsersCountryCode", function(e, r) {
    if (e) {
      console.log(e);
    }

    Users.update({ _id: user._id }, { $set: { "private.countryCode": r } });
  });

  if (user.services) {
    user = getUserOAuthProfile(user);
  }

  if (!Users.findOne({ roles: "admin" }) && user.roles.indexOf("admin") < 0) {
    user.roles = ["admin"];
  }

  return user;
});

Accounts.validateLoginAttempt(function(info) {
  // reject users with role "blocked"
  if (info.user && Users.isInRole(info.user._id, "blocked")) {
    throw new Meteor.Error(403, "Your account is blocked.");
  }

  // reject user without verified e-mail address
  if (
    verifyEmail &&
    info.user &&
    info.user.emails &&
    info.user.emails.length &&
    !info.user.emails.find(function(em) {
      return em.verified;
    })
  ) {
    throw new Meteor.Error(499, "E-mail not verified.");
  }

  return true;
});

Accounts.onLogin(function(info) {
  if (info.user && info.user.services) {
    var user = getUserOAuthProfile(info.user);
    Users.update(
      { _id: user._id },
      { $set: { profile: user.profile, private: user.private } }
    );
  }
});

Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl("reset_password/" + token);
};

Accounts.urls.verifyEmail = function(token) {
  return Meteor.absoluteUrl("verify_email/" + token);
};

Accounts.urls.enrollAccount = function(token) {
  return Meteor.absoluteUrl("create_password/" + token);
};

Meteor.methods({
  createUserAccount: function(options) {
    if (!Users.isAdmin(Meteor.userId())) {
      throw new Meteor.Error(403, "Access denied.");
    }

    var userOptions = {};
    if (options.username) userOptions.username = options.username;
    if (options.email) userOptions.email = options.email;
    if (options.password) userOptions.password = options.password;
    if (options.profile) userOptions.profile = options.profile;
    Accounts.createUser(userOptions);
  },
  updateUserAccount: function(userId, data) {
    if (!data || !Object.keys(data).length) {
      return;
    }

    // Only admin or owner
    if (!(Users.isAdmin(this.userId) || userId == this.userId)) {
      throw new Meteor.Error(403, "Access denied.");
    }

    // non-admin user can change only .profile, .private and .public
    var userData = JSON.parse(JSON.stringify(data));
    if (!Users.isAdmin(this.userId)) {
      let allowedKeys = ["profile", "private", "public"];
      for (var key in userData) {
        if (allowedKeys.indexOf(key) < 0) {
          throw new Meteor.Error(
            403,
            'You are not allowed to modify "' + key + '".'
          );
        }
      }
    }

    // flatten: convert { x: { y: "val" }} into { "x.y": "val" }
    for (var key in userData) {
      var obj = userData[key];
      if (_.isObject(obj) && !_.isArray(obj)) {
        for (var k in obj) {
          userData[key + "." + k] = obj[k];
        }
        delete userData[key];
      }
    }

    // update
    Users.update(userId, { $set: userData });
  },
  detectUsersCountryCode: function() {
    var ip = null;
    if (this.connection) {
      ip = this.connection.clientAddress || null;
      if (!ip && this.connection.httpHeaders) {
        ip = this.connection.httpHeaders["x-forwarded-for"] || null;
      }
    }

    if (!ip) {
      return "";
    }

    var res = HTTP.get("https://ipinfo.io/" + ip);
    if (res && res.statusCode == 200 && res.data && !res.data.bogon) {
      return res.data.country;
    }

    return "";
  }
});