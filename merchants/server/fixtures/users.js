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
            profile: {
                firstName: 'John',
                lastName: 'Doe'
            }
        });

        // sample merchant
        user = Accounts.createUser({
            username: 'merchant',
            email: 'merchant@example.com',
            password: 'merchant',
            profile: {
                firstName: 'Merchant',
                lastName: '1'
            }
        });
        Roles.addUsersToRoles(user, ['merchant']);

        // sample admin
        user = Accounts.createUser({
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin',
            profile: {
                firstName: 'The',
                lastName: 'Admin'
            }
        });
        Roles.addUsersToRoles(user, ['admin']);

        //
        console.log("> done.");
    }

});
