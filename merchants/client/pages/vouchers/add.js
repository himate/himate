// ----- template hooks --------------------------------------------------------

var translateFields = ['title', 'description', 'shortDescription', 'conditions'];
var languages = ['de', 'en', 'ar'];

/**
 *
 */
Template.pages_vouchers_add.onCreated(function () {
    Session.set('pageTitle', 'vouchers_add');
});

Template.pages_vouchers_add.onRendered(function () {
    showAutotranslation();
});

Template.pages_vouchers_add.events({
    'click button.manual-translation': function (event, template) {
        event.preventDefault();
        hideAutotranslation();
    },
    'click button.auto-translation': function (event, template) {
        event.preventDefault();
        showAutotranslation();
    },
    'click .save-voucher': function (event, template) {
        event.preventDefault();
        Session.set('translation_count', 0);
        translateFields.forEach(function (field) {
            languages.forEach(function (lang) {
                if (lang != TAPi18n.getLanguage()) {
                    translateField(field, TAPi18n.getLanguage(), lang);
                }
            });
        });
        checkTranslationsAndCommit();
    },
});

var showAutotranslation = function () {

    $('.tabular.menu .item').tab();
    $('.show-manual').hide();
    $('.hide-manual').show();
    $('.tabular.menu .item').removeClass('active');
    $('.tab').removeClass('active');
    $('.tab[data-tab="tab-' + TAPi18n.getLanguage() + '"]').addClass('active');
    $('.tab[data-tab="tab-' + TAPi18n.getLanguage() + '"] div.show-manual').show();
    Session.set('translation', 'auto');

}

var translateField = function (field, from, to) {
    var fromKey = field + '.' + from;
    var toKey = field + '.' + to;
    var $from = $('[name="' + fromKey + '"]');
    var $to = $('[name="' + toKey + '"]');
    console.log(field, from, to, $to);
    if (!$to.val().length) {
        if ($from.val().length) {
            Meteor.call('translate_text', $from.val(), from, to, function (err, data) {
                $to.val(data);
                checkTranslationsAndCommit();
            });
        }else{
            checkTranslationsAndCommit();
        }
    }else{
        checkTranslationsAndCommit();
    }
};

var checkTranslationsAndCommit = function(){

    var submit = true;
    translateFields.forEach(function (field) {
        languages.forEach(function (lang) {
            var $input = $('[name="' + field + '.' + lang +'"]');
            if(!$input || !$input.val() || !$input.val().length) {
                submit = false;
            }
        });
    });
    if(submit) {
        $("#pages_vouchers_add").submit();
    }
}

var hideAutotranslation = function () {
    Session.set('translation', 'manual');
    $('.show-manual').show();
    $('.hide-manual').hide();
    $('[data-tab="tab-' + TAPi18n.getLanguage() + '"]').addClass('active');
};

// ----- form hooks ------------------------------------------------------------
/**
 *
 */
AutoForm.addHooks(["pages_vouchers_add"], {

    /**
     * @param {Object} operation
     * @param {Object} result
     * @param {Object} template
     */
    onSuccess: function (operation, result, template) {
        Waslchiraa.Helpers.infoMessage('ok');
        Router.go("pages_vouchers");
    },

    /**
     *
     * @param {Object} formType
     * @param {Object} error
     */
    onError: function (formType, error) {
        if (error.reason) {
            Waslchiraa.Helpers.errorMessage(error.reason);
        }
        else if (error.error) {
            Waslchiraa.Helpers.errorMessage(error.error);
        }
    },
});


