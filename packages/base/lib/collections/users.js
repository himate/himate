
UserProfileSchema = new SimpleSchema({
    company: {
        type: String,
        label: HiMate.Helpers.i18nLabel('company'),
        optional: false
    },
    salutation: {
        type: String,
        optional: false,
        label: HiMate.Helpers.i18nLabel('salutation'),
        autoform: {
            options: [
                {label: "Mr", value: "mr"},
                {label: "Mrs", value: "mrs"},
            ]
        }
    },
    firstName: {
        type: String,
        label: HiMate.Helpers.i18nLabel('first_name'),
        optional: false
    },
    lastName: {
        type: String,
        label: HiMate.Helpers.i18nLabel('last_name'),
        optional: false
    },
    street: {
        type: String,
        label: HiMate.Helpers.i18nLabel('street'),
        optional: false
    },
    number: {
        type: String,
        label: HiMate.Helpers.i18nLabel('number'),
        optional: false
    },
    zipcode: {
        type: String,
        label: HiMate.Helpers.i18nLabel('zipcode'),
        optional: false
    },
    city: {
        type: String,
        label: HiMate.Helpers.i18nLabel('city'),
        optional: false
    },
    country: {
        type: String,
        label: HiMate.Helpers.i18nLabel('country'),
        optional: false
    },
    tel: {
        type: String,
        label: HiMate.Helpers.i18nLabel('phone'),
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
        label: HiMate.Helpers.i18nLabel('username')
    },
    emails: {
        type: [Object],
        label: HiMate.Helpers.i18nLabel('emails'),
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
        label: HiMate.Helpers.i18nLabel('created'),
        optional: true,
    },
    status: {
        type: Object,
        blackbox: true,
        optional: true
    },
    profile: {
        type: UserProfileSchema,
        label: HiMate.Helpers.i18nLabel('profile'),
        optional: true
    },
    services: {
        type: Object,
        label: HiMate.Helpers.i18nLabel('services'),
        optional: true,
        blackbox: true
    },
    lastLanguage: {
        type: String,
        defaultValue: "en",
        optional: true
    },
    disabled: {
        type: Boolean,
        defaultValue: false
    },
    roles: {
        type: [String],
        label: HiMate.Helpers.i18nLabel('roles'),
        optional: true
    }
}));
