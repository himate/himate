/**
 * schema admin user form
 */
Waslchiraa.Schemas.NewUser = new SimpleSchema({
    email: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('email'),
        regEx: SimpleSchema.RegEx.Email
    },
    firstName: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('first_name'),
        regEx: /^[äöüÄÖÜßa-zA-Z- ]{2,50}$/,
        optional: true
    },
    lastName: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('last_name'),
        regEx: /^[äöüÄÖÜßa-zA-Z- ]{2,50}$/,
        optional: true
    },
    role: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('role'),
        allowedValues: ['merchant', 'customer']
    },
    password: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('password'),
        min: 10,
        optional: true
    },
    password2: {
        type: String,
        label: Waslchiraa.Helpers.i18nLabel('password2'),
        min: 10,
        optional: true
    }
});
