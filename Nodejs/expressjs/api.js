let express = require('express')
// let connection = require('./connection');
var app = express()
let cors = require('cors')
const cookieParser = require('cookie-parser');
var user = require('./user')
const fs = require('fs'); // Required for file handling
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const multer = require('multer')
const path = require('path')
var bodyParser = require('body-parser');
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '500mb', extended: true}));
app.use('/uploads', express.static('uploads'));
const Route = '/Admin'
app.post(Route,function(req,res)
    {
        user.insert(req,res);
    })
 app.post('/login',function(req,res)
    {   
        user.login(req,res);
    })
    app.post('/forgotpassword',function(req,res)
    {
        user.forgotPassword(req,res)
    })   
    app.post('/sendlink',function(req,res)
    {
        user.sendMail(req,res)
    })
      // Set the cookie
    app.post('/resetpassword',function(req,res)
    {   
        user.resetPassword(req,res)
    })
    app.post('/changepassword',function(req,res)
    {   
        user.changepassword(req,res)
        // console.log(req.body);
        
    })
   app.put('/upedateProfile' , function(req,res)
    {
      // return 0
        user.upedateProfile(req,res)
      })
    app.get('/getData/:id',function(req,res)
    {   
        // return false
        user.getData(req,res)
    })
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          const uploadDir = 'uploads/';
          // Ensure the directory exists
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          cb(null, uploadDir); // Set the uploads directory
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
          cb(null, file.fieldname + '-' + uniqueSuffix); // Generate a unique filename
        }
      });
      const upload = multer({
          storage: storage,
          limits: { fileSize: 500 * 1024 * 1024 } // Set file size limit to 500MB
      });
   // Assuming 'user.Images' is the function that handles the image upload logic
        app.post('/upload', upload.single('file'), (req, res) => {
            // console.log('Request size:', JSON.stringify(req.body).length); // Log request size
            user.Images(req, res); // Call your Images function here
        });

        app.get('/qrcode/:userId', (req, res) => {
            user.Qrcode(req, res);
        });
        app.post('/generate-qr/', (req, res) => {
            user.GenerateQrcode(req, res);
        });
      app.get('/getqrdata/:id', (req, res) => {
        user.Getqrdata(req, res);
      });
    app.listen(5000)
console.log('server is ready to accept');