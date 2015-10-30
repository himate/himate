/**
 * Translation
 */

MS_TOKEN_URL = Meteor.settings.MsTokenUrl;
MS_ACCESS_TOKEN = "";
MS_ACCESS_TOKEN_EXPIRES = 0; // in s
MS_CLIENT_ID = Meteor.settings.MsClientId;
MS_CLIENT_SECRET = Meteor.settings.MsClientSecret;
MS_TOKEN_SCOPE = Meteor.settings.MsTokenScope;
MS_TOKEN_GRANT_TYPE = Meteor.settings.MsTokenGrantType;
MS_TRANSLATOR_URL = Meteor.settings.MsTranslatorUrl;
MS_API_TO = 10000; // in ms

Meteor.methods({

    /**
     * @param {String} text
     * @param {String} from e.g. "de"
     * @param {String} to e.g. "ar"
     * @return {String} currently an xml string with the result -> will be changed to return only the result
     */
    "translate_text": function(text, from, to) {
        //console.log('Starting Translation for: ' + text);
        check(text, String);
        check(from, String);
        check(to, String);

        // get the temporary access token
        getMsAccessToken();

        // send translation request
        var response = getMsTranslation(text, from, to);
        //console.log('Got response from API: ' + response.content);
        //var xmlDoc = new XMLSerializer()
        return response.content.replace(/(<([^>]+)>)/ig, '');
    }
});

/*
 * =========== Start Private Helpers ==============
 */
function getMsAccessToken() {

    // TODO: handle possible errors from API call

    var currentTimeInS = (new Date).getTime() / 1000;

    // check if our session token expired
    if (currentTimeInS >= MS_ACCESS_TOKEN_EXPIRES - 10) {
        console.log('Current Auth Token expired -> request a new one');
        var request_body = "client_id=" + MS_CLIENT_ID + "&" + "client_secret=" + MS_CLIENT_SECRET + "&" + "scope=" + MS_TOKEN_SCOPE + "&" + "grant_type=" + MS_TOKEN_GRANT_TYPE;

        var response = HTTP.call('POST', MS_TOKEN_URL, {
            timeout: MS_API_TO,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            content: request_body
        });

        // set new token and when it will expire
        MS_ACCESS_TOKEN = response.data.access_token;
        MS_ACCESS_TOKEN_EXPIRES = currentTimeInS + parseInt(response.data.expires_in);

        console.log('New Token is ' + response.data.access_token);
    }
}

function getMsTranslation(text, from, to) {

    // TODO: handle errors

    // get translation from bing
    return HTTP.call('GET', MS_TRANSLATOR_URL, {
        timeout: MS_API_TO,
        headers: {
            'Authorization': 'Bearer ' + MS_ACCESS_TOKEN
        },
        params: {
            "text": text,
            "from": from,
            "to": to
        }
    });
}
