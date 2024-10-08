var express = require('express')
var app = express();
var nodemailer = require('nodemailer')
const cors = require('cors');

app.use(express.json());
app.use(cors());
//sending email code
const tranporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'atharv.webyug@gmail.com',
        pass:'ohrv pmtn upxw ksvi'
    }
})

app.post('/send',function(req,res)
    {
        // const {to,subject,text} = req.body
            // console.log(req.body);
            
        const mailOption = {
            from :'atharv.webyug@gmail.com',
            to:'atharvsoni63@gmail.com',
            subject:'Hello from Node.js!',
            text:'this is testing'
        }

tranporter.sendMail(mailOption,(error,info)=>
    {
        if(error){
            console.log('error occured',error);
        return res.status(500).json({ message: 'Failed to send email' });
        }
            else {
            console.log('email sent' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
            }
        
    })        
    })
var portno = 5000;
app.listen(portno,()=>{
    console.log(`ready to accept request on ${portno}`);
})