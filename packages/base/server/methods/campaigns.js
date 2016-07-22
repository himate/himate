/**
 * HiMate.Collections.Campaigns
 */
Meteor.methods({

    /**
     * add the <doc> to the campaigns collection
     * @param {Object} doc
     */
    "campaigns_add": function(doc) {

        // security checks
        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            //nothing to do
        }
        else if (Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            doc.userId = Meteor.userId();
        }
        else {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(doc, Object);
        check("title.de", String);
        check("title.en", String);
        check("title.ar", String);
        check("title.fr", String);
        check("shortDescription.de", String);
        check("shortDescription.en", String);
        check("shortDescription.ar", String);
        check("shortDescription.fr", String);
        check("description.de", Match.Optional(String));
        check("description.en", Match.Optional(String));
        check("description.ar", Match.Optional(String));
        check("description.fr", Match.Optional(String));
        check("conditions.de", Match.Optional(String));
        check("conditions.en", Match.Optional(String));
        check("conditions.ar", Match.Optional(String));
        check("conditions.fr", Match.Optional(String));
        check(doc.imageId, Match.Optional(String));
        check(doc.userId, Match.Optional(String));
        check(doc.categoryId, String);
        check(doc.published, Match.Optional(Date));
        check(doc.end, Match.Optional(Date));
        check(doc.quantity, Match.Optional(Number));
        check(doc.companyName, Match.Optional(String));
        check(doc.webAddress, Match.Optional(String));
        check(doc.street, String);
        check(doc.number, String);
        check(doc.zipcode, String);
        check(doc.city, String);
        check(doc.country, String);

        //var translateFields = ['title','description','shortDescription','conditions'];
        //translateFields.forEach(function(field){
        //    doc[field].foreach(value, key){}
        //})

        // action
        var id = HiMate.Collections.Campaigns.insert(doc, function(error, _id) {
            if (!error) {
                var campaign = HiMate.Collections.Campaigns.findOne(_id);
                Meteor.defer();
                Email.send({
                    from: 'noreply@himate.org',
                    //to: 'tr@delodi.net',
                    to: 'himate-reviewers@googlegroups.com',
                    subject: 'New Campaign created, please review it.',
                    text: '' + 'Title (en):' + campaign.title.en + "\n" + 'Title (de):' + campaign.title.de + "\n" + 'Title (ar):' + campaign.title.ar + "\n" + 'Title (fr):' + campaign.title.fr + "\n"
                });
            }
        });

        // fix image ownership, if admin adds the image
        if (Roles.userIsInRole(Meteor.userId(), ['admin']) && doc.imageId) {
            HiMate.Collections.Images.update(doc.imageId, {
                $set: {
                    userId: doc.userId
                }
            });
        }

        HiMate.Collections.Campaigns.countVouchers(id);

        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            entryId: id,
            role: (Meteor.user().roles ? Meteor.user().roles[0] : 'unknown'),
            route: 'pages_campaigns_edit',
            action: 'campaigns_add'
        });

        // return new id
        return id;
    },

    /**
     * update the given <doc>
     * @param {Object} doc
     * @param {String} id
     */
    "campaigns_edit": function(doc, id) {

        // campaign should be owned by the current user
        var campaign = HiMate.Collections.Campaigns.findOne(id);
        if (!campaign) {
            throw new Meteor.Error("not-found");
        }

        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            //nothing to do
        }
        else if (Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            if (campaign.userId != Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }
            doc.$set.userId = Meteor.userId();
        }
        else {
            throw new Meteor.Error("not-authorized");
        }

        // check user input
        check(id, String);
        check(doc, Object);
        check(doc.$set, {
            "title.de": String,
            "title.en": String,
            "title.ar": String,
            "title.fr": String,
            "shortDescription.de": String,
            "shortDescription.en": String,
            "shortDescription.ar": String,
            "shortDescription.fr": String,
            "description.de": Match.Optional(String),
            "description.en": Match.Optional(String),
            "description.ar": Match.Optional(String),
            "description.fr": Match.Optional(String),
            "conditions.de": Match.Optional(String),
            "conditions.en": Match.Optional(String),
            "conditions.ar": Match.Optional(String),
            "conditions.fr": Match.Optional(String),
            conditions: Match.Optional(Object),
            imageId: Match.Optional(String),
            userId: Match.Optional(String),
            categoryId: String,
            published: Date,
            end: Match.Optional(Date),
            approved: Match.Optional(Boolean),
            quantity: Number,
            companyName: Match.Optional(String),
            webAddress: Match.Optional(String),
            street: String,
            number: String,
            zipcode: String,
            city: String,
            country: String
        });

        // save update
        var result = HiMate.Collections.Campaigns.update(id, doc);

        // fix image ownership, if admin adds the image
        if (Roles.userIsInRole(Meteor.userId(), ['admin']) && doc.$set.imageId) {
            HiMate.Collections.Images.update(doc.$set.imageId, {
                $set: {
                    userId: doc.$set.userId
                }
            });
        }

        HiMate.Collections.Campaigns.countVouchers(id);

        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            entryId: id,
            role: (Meteor.user().roles ? Meteor.user().roles[0] : 'unknown'),
            route: 'pages_campaigns_edit',
            action: 'campaigns_edit'
        });

        return result;
    },

    /**
     * @param {Object} doc
     */
    "campaigns_remove": function(id) {

        // check user input
        check(id, String);

        var campaign = HiMate.Collections.Campaigns.findOne(id);
        if (!campaign) {
            throw new Meteor.Error("not-found");
        }

        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            //nothing to do
        }
        else if (Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            if (campaign.userId != Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }
        }
        else {
            throw new Meteor.Error("not-authorized");
        }

        // :TODO: delete corresponding reservations and send emails to reservation users
        // :TODO: perhaps we should flag as "deleted" instead?
        HiMate.Collections.Images.remove(campaign.imageId);
        HiMate.Collections.Campaigns.remove(campaign._id);

        HiMate.Collections.Activities.insert({
            username: Meteor.user().username,
            userId: Meteor.userId(),
            entryId: id,
            role: (Meteor.user().roles ? Meteor.user().roles[0] : 'unknown'),
            route: '',
            action: 'campaigns_remove'
        });

        return "ok";

    }
});
