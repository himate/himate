/**
 * Users
 */
Meteor.methods({

    /**
     * save the currently selected language to user account, so we can send
     * emails in his preferred language
     *
     * @param {Object} lang
     */
    "set_default_language": function(lang) {

        // check user input
        check(lang, String);

        // action
        if (Meteor.user()) {
            var user = Meteor.user();
            Meteor.users.update({
                _id: user._id
            }, {
                $set: {
                    lastLanguage: lang
                }
            });
        }
    }
});
