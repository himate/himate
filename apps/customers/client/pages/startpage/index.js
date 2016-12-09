/**
 * THIS TEMPLATE IS NOT IN USE ANYMORE AND CAN BE DELETED
 *
 */


Template.pages_startpage.events({
    /**
     *
     */
    'click .locale-change': function (event, template) {
        HiMate.Helpers.setLanguage(this.tag);
        return HiMate.Helpers.cancel(event);
    },
    /**
     *
     */
    'touchstart .locale-change': function (event, template) {
        HiMate.Helpers.setLanguage(this.tag);
        return HiMate.Helpers.cancel(event);
    }
});
// ----- template hooks --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.pages_startpage.onRendered(function () {
    $('#pages-startpage .js-dropdown').dropdown();
});

//Temperory Helper to prevent French language from showing up
Template.pages_startpage.helpers({
    languageIs: function (language) {
        return language === "fr";

    }
});
