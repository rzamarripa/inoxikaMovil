Materiales = new Mongo.Collection("materiales");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
Materiales.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
