// :TODO: security!
// ----- helper ----------------------------------------------------------------
/**
 *
 */
var createThumb300 = function(fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('300', '225').autoOrient().stream().pipe(writeStream);
};

/**
 *
 */
var createThumb300x2 = function(fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('600', '450').autoOrient().stream().pipe(writeStream);
};

// ----- workspace files -------------------------------------------------------
/**
 *
 */
Waslchiraa.Collections.Images = new FS.Collection("waslchiraa_images", {
    stores: [new FS.Store.GridFS("waslchiraa_images"), new FS.Store.GridFS("waslchiraa_thumbnails", {
        transformWrite: createThumb300
    }), new FS.Store.GridFS("waslchiraa_thumbnails_x2", {
        transformWrite: createThumb300x2
    })],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

/**
 *
 */
Waslchiraa.Collections.Images.allow({
    download: function(userId, file) {
        //console.log("userId: ", userId);
        //console.log("----------------------");
        //console.log("file: ", file._id);
        //console.log("----------------------");
        // :TODO: also check, if user has access to <file>! check all relevant collections
        //return !!userId;
        return true;
    },
    insert: function(userId) {
        return true;
    },
    update: function(userId) {
        return true;
    },
    remove: function(userId) {
        return true;
    },
    fetch: null
});
