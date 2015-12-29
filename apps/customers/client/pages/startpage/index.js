Template.pages_startpage.events({


    /**
     *
     */
    'click .locale-change': function(event, template) {
        HiMate.Helpers.setLanguage(this.tag);
        return HiMate.Helpers.cancel(event);
    },
    /**
     *
     */
    'touchstart .locale-change': function(event, template) {
        HiMate.Helpers.setLanguage(this.tag);
        return HiMate.Helpers.cancel(event);
    }
});
// ----- template hooks --------------------------------------------------------
/**
 * called each the the template is rendered
 */
Template.partials_languages.onRendered(function() {
    $('#pages-startpage .dropdown').dropdown();
});
