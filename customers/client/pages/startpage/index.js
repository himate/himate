// ----- template events -------------------------------------------------------
/**
 *
 */
Template.pages_startpage.events({
});

// ---- template hooks ---------------------------------------------------------
/**
 *
 */
Template.pages_startpage.onCreated(function() {
    Session.set('pageTitle', 'Index');
});
