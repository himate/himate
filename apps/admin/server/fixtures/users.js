/**
 * wait until meteor is ready
 */
Meteor.startup(function() {

    // empty database?
    if (Meteor.users.find().count() === 0) {

        // so add some demo users
        console.log("> empty database");
        console.log("> add some demo users...");

        // sample user
        var user = Accounts.createUser({
            username: 'customer',
            email: 'customer@example.com',
            password: 'customer',
        });
        Roles.addUsersToRoles(user, ['customer']);
       

        // sample merchant
        user = Accounts.createUser({
            username: 'merchant',
            email: 'merchant@example.com',
            company: 'parts unlimed',
            password: 'merchant',
            profile: {
                firstName: 'John',
                lastName: 'Merchant',
                salutation: 'mr',
                company: 'parts Unlimited',
                street: 'Baker street',
                number: '221b',
                zipcode: '232323',
                city: 'berlin',
                country:'Germany',
                tel: '018723234234'

            }
        });
        Roles.addUsersToRoles(user, ['merchant']);

        // sample admin
        user = Accounts.createUser({
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin',
        });
        Roles.addUsersToRoles(user, ['admin']);

        Meteor.users.find().fetch().forEach(function(user){
            console.log(user);
            Meteor.users.update(user._id, {
                $set: {"emails.0.verified":true}
            }); 
        });
        //
        console.log("> done.");
    }
});
