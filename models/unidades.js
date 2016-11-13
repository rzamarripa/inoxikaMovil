Unidades = new Mongo.Collection("unidades");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
Unidades.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
