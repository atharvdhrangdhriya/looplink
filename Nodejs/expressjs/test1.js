const bcrypt = require('bcrypt')
// let saltRounds = 10
// bcrypt.genSalt(saltRounds,(error,salt)=>
//     {
//         if (error) {
//             console.log('error');
//         } else {
//             console.log('salt',salt);
//         }    
//     }) 

const salt = '$2b$10$p2JqOOo0/4no/gKoBC81ru'
const userpassword = 'password'
bcrypt.hash(userpassword,salt,(err,hash)=>
    {
        if (err) {
            console.log('error');
        } else {
            console.log('hashed password' , hash);    
        }
    }) 
let hashsedPassword = '$2b$10$p2JqOOo0/4no/gKoBC81ru/$2b$10$a7UJ3sslncys9hYLTLwhleYoc'       
bcrypt.compare(userpassword,hashsedPassword,(error,result)=>{
    if (error) {
        // Handle error
        console.error('Error comparing passwords:', error);
        return;
    }
    if (result) {
        console.log('matched')
    }
    else{
        console.log('does not matched');
    }
})    