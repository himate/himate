
UserProfileSchema = new SimpleSchema({
    company: {
        type: String,
        optional: false
    },
    salutation: {
        type: String,
        optional: false,
        autoform: {
            options: [
                {label: "Mr", value: "mr"},
                {label: "Mrs", value: "mrs"},
            ]
        }
    },
    firstName: {
        type: String,
        optional: false
    },
    lastName: {
        type: String,
        optional: false
    },
    street: {
        type: String,
        optional: false
    },
    number: {
        type: String,
        optional: false
    },
    zipcode: {
        type: String,
        optional: false
    },
    city: {
        type: String,
        optional: false
    },
    country: {
        type: String,
        optional: false
    },
    tel: {
        type: String,
        optional: true,
        autoform: {
            label: 'Phone'
        }

    }
});

Meteor.users.attachSchema(new SimpleSchema({
    username: {
        type: String,
        optional: true,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        optional: true,
    },
    profile: {
        type: UserProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
}));
