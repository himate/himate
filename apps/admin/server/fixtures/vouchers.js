/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // empty database?
    if (!Waslchiraa.Collections.Campaigns.find().count()) {

        var c = Waslchiraa.Collections.Categories.findOne({title: "Fashion"});
        var u = Meteor.users.findOne({"username": "merchant"});

        var v = Waslchiraa.Collections.Campaigns.insert({
            "title": {
                "de":'DEUTSCH: Lorem ipsum dolor',
                "en":'ENGLISH: Lorem ipsum dolor',
                "ar":'ARABIC: Lorem ipsum dolor',
            },
            "categoryId": c._id,
            "userId": u._id,
            "created": new Date((new Date()).valueOf() - 1000*60*60*24) ,
            "published":new Date((new Date()).valueOf() - 1000*60*60*24),
            "end": new Date((new Date()).valueOf() + 30000*60*60*24) ,
            shortDescription: {
                "de":"DEUTSCH: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                "en":"ENGLISH: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                "ar":"ARABIC: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            description: {
                "de":"DEUTSCH: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "en":"ENGLISH: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "ar":"ARABIC: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
            conditions:{
                "de":"DEUTSCH: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                "en":"ENGLISH: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                "ar":"ARABIC: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            quantity: 10,
            street: 'Street',
            number: '123',
            zipcode: '12345',
            city: 'City',
            country: 'Country'

        });
    }
});
