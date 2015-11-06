
UserProfileSchema = new SimpleSchema({
    company: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('company'),
        optional: false
    },
    salutation: {
        type: String,
        optional: false,
        label: Waslchiraa.Helpers.i18nLabel('salutation'),
        autoform: {
            options: [
                {label: "Mr", value: "mr"},
                {label: "Mrs", value: "mrs"},
            ]
        }
    },
    firstName: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('first_name'),
        optional: false
    },
    lastName: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('last_name'),
        optional: false
    },
    street: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('street'),
        optional: false
    },
    number: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('number'),
        optional: false
    },
    zipcode: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('zipcode'),
        optional: false
    },
    city: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('city'),
        optional: false
    },
    country: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('country'),
        optional: false
    },
    tel: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('phone'),
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
        label: Waslchiraa.Helpers.i18nLabel('username'),
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object],
        label: Waslchiraa.Helpers.i18nLabel('emails'),
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
        label: Waslchiraa.Helpers.i18nLabel('created'),
        optional: true,
    },
    profile: {
        type: UserProfileSchema,
        label: Waslchiraa.Helpers.i18nLabel('profile'),
        optional: true
    },
    services: {
        type: Object,
        label: Waslchiraa.Helpers.i18nLabel('services'),
        optional: true,
        blackbox: true
    }
}));
