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
    if (!$to.val().length) {
        if ($from.val().length) {
            Meteor.call('translate_text', $from.val(), from, to, function(err, data) {
                $to.val(data);
                checkTranslationsAndCommit();
            });
        }
        else {
            checkTranslationsAndCommit();
        }
    }
    else {
        checkTranslationsAndCommit();
    }
};

/**
 *
 */
var checkTranslationsAndCommit = function() {

    var submit = true;
    translateFields.forEach(function(field) {
        languages.forEach(function(lang) {
            var $input = $('[name="' + field + '.' + lang + '"]');
            var $srcInput = $('[name="' + field + '.' + TAPi18n.getLanguage() + '"]');
            if (!$input || !$input.val() || !$input.val().length) {
                if (mandatoryFields.indexOf(field) >= 0 && !$srcInput.val().length) {
                    console.log('nosubmit', field, lang, $srcInput);
                    submit = false;
                }
            }
        });
    });

    console.log('submit', submit);

    if (submit) {
        if ($('#pages_campaigns_add').length) {
            $("#pages_campaigns_add").submit();
        }
        else {
            $("#pages_campaigns_edit").submit();
        }
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
        return Waslchiraa.Helpers.cancel(event);
    },

    /**
     *
     * @param {Object} event
     * @param {Object} template
     */
    'click button.auto-translation': function(event, template) {
        showAutotranslation();
        return Waslchiraa.Helpers.cancel(event);
    },

    /**
     *
     * @param {Object} event
     * @param {Object} template
     */
    'click .save-voucher': function(event, template) {
        translateFields.forEach(function(field) {
            languages.forEach(function(lang) {
                if (lang != TAPi18n.getLanguage()) {
                    translateField(field, TAPi18n.getLanguage(), lang);
                }
            });
        });
        checkTranslationsAndCommit();
        return Waslchiraa.Helpers.cancel(event);
    },
});

// ----- template hooks --------------------------------------------------------
/**
 *
 */
Template.form_fields.onRendered(function() {
    showAutotranslation();
});
