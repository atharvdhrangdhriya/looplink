var mysql = require('mysql')
var properties = {
    database:'frontend24',
    user :'root',
    password:'',
    port:'3308',
    host:'localhost'
}

var db = mysql.createConnection(properties)
db.connect(function(error)
        {
            if(error){
                console.log(error);
                console.log('error occured');
            }
            else
                console.log('connected');
        })


module.exports.db = db