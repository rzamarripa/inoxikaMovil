Productos = new Mongo.Collection("productos");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//active:Boolean
//sport_id:Sports
Productos.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
