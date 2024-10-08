var mysql = require('mysql')
var properties = {
    database:'register',
    user :'root',
    password:'',
    port:'3308',
    host:'localhost'
}

var db = mysql.createConnection(properties)
db.connect(function(error){
    if(error)
    {
        console.log('error in establishing connection');
        console.log(error);
    }
    else 
        console.log('connection created');
});

module.exports.db = db