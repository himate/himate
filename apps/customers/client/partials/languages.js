// ----- template events -------------------------------------------------------
/**
 *
 */
Template.partials_languages.events({
    /**
     *
     */
    'click .locale-change': function(event, template) {
        HiMate.Helpers.setLanguage(this.tag);
        return HiMate.Helpers.cancel(event);
    }
});

// ----- template hooks --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_languages.onRendered(function() {
    $('#partials-languages .js-dropdown').dropdown();
});

//Temperory Helper to prevent French language from showing up
Template.partials_languages.helpers({
    languageIs: function (language) {
        return language === "fr";

    } 
});
