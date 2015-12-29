/**
 * some generic schemas for translated db fields
 *
 * @todo auto generate schemas based on available languages (TAPi18n.getLanguages())
 */
HiMate.Schemas.TranslationSchemaOptional = new SimpleSchema({
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
HiMate.Schemas.TranslationSchemaOptionalTextarea = new SimpleSchema({
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
HiMate.Schemas.TranslationSchema = new SimpleSchema({
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
HiMate.Schemas.TranslationSchemaTextarea = new SimpleSchema({
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
