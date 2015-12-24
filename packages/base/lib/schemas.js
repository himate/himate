/**
 * some generic schemas for translated db fields
 *
 * @todo auto generate schemas based on available languages (TAPi18n.getLanguages())
 */
Waslchiraa.Schemas.TranslationSchemaOptional = new SimpleSchema({
    de: {
        type: String,
        optional: true
    },
    en: {
        type: String,
        optional: true
    },
    ar: {
        type: String,
        optional: true
    }

});

/**
 *
 */
Waslchiraa.Schemas.TranslationSchemaOptionalTextarea = new SimpleSchema({
    de: {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    },
    en: {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    },
    ar: {
        type: String,
        optional: true,
        autoform: {
            rows: 5
        }
    }
});

/**
 *
 */
Waslchiraa.Schemas.TranslationSchema = new SimpleSchema({
    de: {
        type: String
    },
    en: {
        type: String
    },
    ar: {
        type: String
    }
});

/**
 *
 */
Waslchiraa.Schemas.TranslationSchemaTextarea = new SimpleSchema({
    de: {
        type: String,
        autoform: {
            rows: 5
        }
    },
    en: {
        type: String,
        autoform: {
            rows: 5
        }
    },
    ar: {
        type: String,
        autoform: {
            rows: 5
        }
    }
});
