/**
 * schema admin user form
 */
HiMate.Schemas.NewUser = new SimpleSchema({
    email: {
        type: String,
        label: HiMate.Helpers.i18nLabel('email'),
        regEx: SimpleSchema.RegEx.Email
    },
    verifiedEmail: {
        type: Boolean,
        label: HiMate.Helpers.i18nLabel('verified_email'),
        defaultValue: true,
        optional: true
    },
    firstName: {
        type: String,
        label: HiMate.Helpers.i18nLabel('first_name'),
        regEx: /^[äöüÄÖÜßa-zA-Z- ]{2,50}$/,
        optional: true
    },
    lastName: {
        type: String,
        label: HiMate.Helpers.i18nLabel('last_name'),
        regEx: /^[äöüÄÖÜßa-zA-Z- ]{2,50}$/,
        optional: true
    },
    role: {
        type: String,
        label: HiMate.Helpers.i18nLabel('role'),
        allowedValues: ['merchant', 'customer', 'admin']
    },
    password: {
        type: String,
        label: HiMate.Helpers.i18nLabel('password'),
        min: 10,
        optional: true
    },
    password2: {
        type: String,
        label: HiMate.Helpers.i18nLabel('password2'),
        min: 10,
        optional: true
    }
});
