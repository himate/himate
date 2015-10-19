// collection for our voucher categories. Categories are read only for the
// merchant. So we don't need a schema to validate user input.
Categories = new Mongo.Collection("categories");
