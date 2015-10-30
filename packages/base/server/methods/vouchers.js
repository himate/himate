/**
 * Vouchers
 */
Meteor.methods({

    /**
     * add the <doc> to the vouchers collection
     * @param {Object} doc
     */
    "vouchers_add": function(doc) {

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
        check(doc.title, Object);
        check(doc.description, Match.Optional(Object));
        check(doc.userId, String);
        check(doc.categoryId, String);
        check(doc.published, Match.Optional(Date));
        check(doc.end, Match.Optional(Date));
        check(doc.quantity, Match.Optional(Number));
        check(doc.street, String);
        check(doc.number, String);
        check(doc.zipcode, String);
        check(doc.city, String);
        check(doc.country, String);
        check(doc.conditions, Object);
        check(doc.shortDescription, Object);

        //var translateFields = ['title','description','shortDescription','conditions'];
        //translateFields.forEach(function(field){
        //    doc[field].foreach(value, key){}
        //})


        // action
        return Vouchers.insert(doc);
    },

    /**
     * update the given <doc>
     * @param {Object} doc
     * @param {String} id
     */
    "vouchers_edit": function(doc, id) {

        // voucher should be owned by the current user
        var voucher = Vouchers.findOne(id);
        if (!voucher) {
            throw new Meteor.Error("not-found");
        }

        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            //nothing to do
        }
        else if (Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            if (voucher.userId != Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }
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
            "shortDescription.de": String,
            "shortDescription.en": String,
            "shortDescription.ar": String,
            "description.de":  Match.Optional(String),
            "description.en":  Match.Optional(String),
            "description.ar":  Match.Optional(String),
            "conditions.de":  Match.Optional(String),
            "conditions.en":  Match.Optional(String),
            "conditions.ar":  Match.Optional(String),
            conditions: Match.Optional(Object),
            categoryId: String,
            published: Date,
            end: Match.Optional(Date),
            quantity: Number,
            street: String,
            number: String,
            zipcode: String,
            city: String,
            country: String
        });

        // save update
        return Vouchers.update(id, doc);
    },

    /**
     * @param {Object} doc
     */
    "vouchers_remove": function(id) {

        // check user input
        check(id, String);

        var voucher = Vouchers.findOne(id);
        if (!voucher) {
            throw new Meteor.Error("not-found");
        }

        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            //nothing to do
        }
        else if (Roles.userIsInRole(Meteor.userId(), ['merchant'])) {
            if (voucher.userId != Meteor.userId()) {
                throw new Meteor.Error("not-authorized");
            }
        }
        else {
            throw new Meteor.Error("not-authorized");
        }

        // :TODO: delete corresponding reservations and send emails to reservation users
        // :TODO: perhaps we should flag as "deleted" instead?
        Vouchers.remove(voucher._id);

        return "ok";

    }

});
