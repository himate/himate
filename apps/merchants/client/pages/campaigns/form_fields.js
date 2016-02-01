// ----- private helpers -------------------------------------------------------
var translateFields = ['title', 'description', 'shortDescription', 'conditions'];
var mandatoryFields = ['title', 'shortDescription'];
var languages = ['de', 'en', 'ar'];

/**
 *
 */
var hideAutotranslation = function() {
    Session.set('translation', 'manual');
    $('.show-manual').show();
    $('.hide-manual').hide();
    $('[data-tab="tab-' + TAPi18n.getLanguage() + '"]').addClass('active');
};

/**
 *
 */
var showAutotranslation = function() {
    $('.tabular.menu .item').tab();
    $('.show-manual').hide();
    $('.hide-manual').show();
    $('.tabular.menu .item').removeClass('active');
    $('.tab').removeClass('active');
    $('.tab[data-tab="tab-' + TAPi18n.getLanguage() + '"]').addClass('active');
    $('.tab[data-tab="tab-' + TAPi18n.getLanguage() + '"] div.show-manual').show();
    Session.set('translation', 'auto');
};

/**
 *
 */
var translateField = function(field, from, to) {
    var fromKey = field + '.' + from;
    var toKey = field + '.' + to;

    var $from = $('[name="' + fromKey + '"]');
    var $to = $('[name="' + toKey + '"]');

    // target field is empty, but source is not
    if (!$to.val().length && $from.val().length) {
        return Meteor.callPromise('translate_text', $from.val(), from, to);
    }
};


// ----- template events -------------------------------------------------------
/**
 *
 */
Template.form_fields.events({

    /**
     *
     * @param {Object} event
     * @param {Object} template
     */
    'click button.manual-translation': function(event, template) {
        hideAutotranslation();
        return HiMate.Helpers.cancel(event);
    },

    /**
     *
     * @param {Object} event
     * @param {Object} template
     */
    'click button.auto-translation': function(event, template) {
        showAutotranslation();
        return HiMate.Helpers.cancel(event);
    },

    /**
     *
     * @param {Object} event
     * @param {Object} template
     */
    'click .save-voucher': function(event, template) {
        var promises = [];

        // each field to translate
        translateFields.forEach(function (field) {

            // each language to translate
            languages.forEach(function (lang) {

                // assumption: currently set language is source
                if (lang != TAPi18n.getLanguage()) {

                    // request transation
                    var promise = translateField(field, TAPi18n.getLanguage(), lang);

                    // if API call happens, promise is returned
                    if (promise) {

                        // fill in form field when promise is resolved
                        promise.then(function (err, data) {
                            var $to = $('[name="' + field + '.' +  lang + '"]');
                            $to.val(err, data);
                        });

                        // collect promises
                        promises.push(promise);
                    }
                }
            });
        });

        // if all translation completed: submit form
        Promise.all(promises).then(function () {
            $(event.delegateTarget).submit();
        });

        return HiMate.Helpers.cancel(event);
    },
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.form_fields.onRendered(function() {
    showAutotranslation();
});
