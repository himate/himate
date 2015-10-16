// ----- configuration ---------------------------------------------------------

// default templates
Router.configure({
    layoutTemplate: 'layouts_default',
    loadingTemplate: 'partials_loading',
    notFoundTemplate: 'errors_404'
});

// do not transform template names
Router.setTemplateNameConverter(_.identity);

// show default 404 error page for missing data in db
Router.plugin('dataNotFound', {
    notFoundTemplate: 'errors_404'
});

/**
 * update title and seo data after route change
 */
Router.onAfterAction(function() {
    // :TODO: ...
});

// ----- routes ----------------------------------------------------------------
/**
 * homepage
 */
Router.route('/', {
    name: 'pages_startpage'
});

/**
 * about us
 */
Router.route('/about-us', {
    name: 'pages_about_us'
});

/**
 * imprint
 */
Router.route('/imprint', {
    name: 'pages_imprint'
});

/**
 * sign-in
 */
Router.route('/sign_in', {
    name: 'pages_sign_in'
});

// ----- useraccounts routes --------------------------------------------------
// check /lib/accounts_templates.js for basic configuration
AccountsTemplates.configure({
    defaultLayout: 'layouts_default'
});

//AccountsTemplates.configureRoute('signIn'); 