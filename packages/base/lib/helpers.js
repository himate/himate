// ----- generic helpers (client/server) ---------------------------------------
/**
 * return a TAPi18n callback, used in
 *
 * @param {String} value
 * @return {Function} i18n callback
 * @reactive
 */
HiMate.Helpers.i18nLabel = function(value) {
    return function() {
        return TAPi18n.__(value);
    };
};
