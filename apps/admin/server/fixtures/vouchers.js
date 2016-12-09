/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // empty database?
    if (!HiMate.Collections.Campaigns.find().count()) {

        var c = HiMate.Collections.Categories.findOne({"title.en": "Fashion"});
        var u = Meteor.users.findOne({"username": "merchant"});

        var v = HiMate.Collections.Campaigns.insert({
            "title": {
                "de":'DEUTSCH: Lorem ipsum dolor',
                "en":'ENGLISH: Lorem ipsum dolor',
                "ar":'ARABIC: Lorem ipsum dolor',
                "fr":'FRANCAIS: Lorem ipsom dolor'
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
                "fr":"FRANCAIS: Lorem ipsum dolor sit amet, consectetur adipisicing elit."
            },
            description: {
                "de":"DEUTSCH: Lorem ipsum dolor sit amet, consectetur adipisicing elit, ",
                "en":"ENGLISH: Lorem ipsum dolor sit amet, consectetur adipisicing elit, ",
                "ar":"ARABIC: Lorem ipsum dolor sit amet, consectetur adipisicing elit, ",
                "fr":"FRANCAIS: Lorem ipsum dolor sit amet, consectetur adipisicing elit."
            },
            conditions:{
                "de":"DEUTSCH: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                "en":"ENGLISH: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                "ar":"ARABIC: Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                "fr":"FRANCAIS: Lorem ipsum dolor sit amet, consectetur adipisicing elit."
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
