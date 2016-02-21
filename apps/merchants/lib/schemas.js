
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
    name: {
        type: String,
        optional: true
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

// simplified schema for merchant profile updates
UserSchema = new SimpleSchema({
    profile: {
        type: UserProfileSchema,
        label: HiMate.Helpers.i18nLabel('profile'),
        optional: true
    }
});
