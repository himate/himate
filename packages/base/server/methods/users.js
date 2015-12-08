Meteor.methods({
    "set_default_language":function(lang){
        console.log(Meteor.user());
        if(Meteor.user()){
            var user = Meteor.user();
            console.log(user._id, lang);
            Meteor.users.update({_id: user._id},{$set:{lastLanguage:lang}});
        }
    }
});