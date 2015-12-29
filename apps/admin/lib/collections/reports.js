HiMate.Schemas.Report = new SimpleSchema({
    created: {
        type: Date,
        label: HiMate.Helpers.i18nLabel("created"),
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
            else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date
                };
            }
            else {
                this.unset();
            }
        }
    },
    // general stats
    activeUsers: {
        type: Number,
        defaultValue: 0
    },
    cpuLoad: {
        type: Number,
        defaultValue: 0
    },
    memory: {
        type: Object,
        blackbox: true
    },
    // summaries of user data,
    vouchers: {
        type: Object,
        blackbox: true
    },
    campaigns: {
        type: Object,
        blackbox: true
    }
});

// create collection and register schema
HiMate.Collections.Reports = new Mongo.Collection("waslchiraa_reports");
HiMate.Collections.Reports.attachSchema(HiMate.Schemas.Report);

// ----- public methods --------------------------------------------------------
HiMate.Collections.Reports.collectData = function() {

    // collect data
    var report = {};
    report.activeUsers = Meteor.users.find({
        'status.online': true
    }).count();

    var os = Npm.require('os');
    report.cpuLoad = parseInt(os.loadavg()[0] / os.cpus().length * 100);
    report.memory = {};
    report.memory.free = os.freemem();
    report.memory.total = os.totalmem();

    report.vouchers = {};
    report.campaigns = {};

    //console.log(report);
    HiMate.Collections.Reports.insert(report);

    // remove old entries
    var mins = 20;
    var now = new Date();
    var toOld = new Date(now.getTime() - mins * 60 * 1000);
    HiMate.Collections.Reports.remove({
        created: {
            $lt: toOld
        }
    });

    // restart in 60 seconds
    Meteor.setTimeout(function() {
        HiMate.Collections.Reports.collectData();
    }, 60 * 1000);
};
