let connection = require('./connection');
let nodemailer = require('nodemailer')
// let randomlink = require('./string')
const path = require('path');
const fs = require('fs'); // Required for file handling
let jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const axios = require('axios');
let field = require('./fields');
//multer configration 

// const { error } = require('console');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'atharv.webyug@gmail.com',
    pass: 'ohrv pmtn upxw ksvi'
  }
})

    function generateResetToken() {
  return crypto.randomBytes(32).toString('hex'); // Generate a random token
}
const token = generateResetToken();

    let insert = function (request, response) {
  const { fullname, contact, emailId, password } = request.body;
  const checkEmailNumber = 'SELECT COUNT(*) AS count FROM user WHERE EmailID = ? OR Contact = ?';
  const salt = '$2b$10$a7UJ3sslncys9hYLTLwhle'
  console.log(request.body);
  connection.db.query(checkEmailNumber, [emailId, contact], function (error, result) {
    if (error) {
      console.error('Error checking email and contact:', error);
      return response.status(500).json({
        error: "yes",
        success: "no",
        message: "An error occurred while checking the email and number"
      });
    }

    if (result[0].count > 0) {
      return response.status(400).json({
        error: "yes",
        success: "no",
        message: "Email or contact number already exists."
      });
    } else {
      // Hash the password before inserting into the database
      bcrypt.hash(password, salt, function (err, hashedPassword) {
        if (err) {
          console.error('Error hashing password:', err);
          return response.status(500).json({
            error: "yes",
            success: "no",
            message: "An error occurred while encrypting the password."
          });
        }
        else {
          console.log('hashed password', hashedPassword);
        }

        // Move the INSERT query inside the hash callback
        const sql = `INSERT INTO user (Fullname, Contact,  EmailID, password) VALUES (?, ?, ?, ?)`;
        const values = [fullname, contact, emailId, hashedPassword];

        connection.db.query(sql, values, function (error, results) {
          if (error) {
            console.error('Error inserting data:', error);
            return response.status(500).json({
              error: "yes",
              success: "no",
              message: "An error occurred while registering."
            });
          }
          // else
          //   console.log(results)
          response.status(200).json({
            error: "no",
            success: "yes",
            message: "Registered successfully."
          });
        });
      });
    }
  });
};

      let login = function (request, response) {
  // console.log("asdasd");
  const { email, password } = request.body;
  
  const checkEmail = 'SELECT user.id,user.Fullname,user.password,user.Profilename,user.Bio,user.social_media, images.filename ,images.id AS user_image_id FROM user LEFT JOIN images ON user.id = images.userid WHERE EmailID = ?';
  // console.log(checkEmail);
  connection.db.query(checkEmail, [email], function (error, results) {
    // console.log(results);
    if (error) {
      console.log('Error querying user:', error);
      return response.status(500).json({
        error: 'yes',
        success: 'no',
        message: 'Error while checking credentials'
      });
    }

    if (results.length === 0) {
      return response.status(401).json({
        error: 'yes',
        success: 'no',
        message: 'Invalid email or password.'
      });
    }
    const storedHashedPassword = results[0].password; // Retrieve the hashed password from the database
    // console.log(results)
    bcrypt.compare(password, storedHashedPassword, function (err, result) {
      // console.log('password is', password)
      // console.log('hash is', storedHashedPassword)
      if (err) {
        console.error('Error comparing passwords:', err);
        return response.status(500).json({
          error: 'yes',
          success: 'no',
          message: 'Error while checking password'
        });
      }
      if (result) { // If the passwords match
        delete results[0].password
        console.log('result is ',results[0])
        response.status(200).json({
          error: 'no',
          success: 'yes',
          message: 'Login successful',
          data: results[0]

        });
      } else { // If the passwords do not match
        response.status(401).json({
          error: 'yes',
          success: 'no',
          message: 'Invalid email or password.'
        });
      }
    });
  });
};

// //just for checking
       let forgotPassword = function (request, response) {
  // Extract the email from the request body
  const email = request.body; // Changed from request.body to request.body.email
  console.log(email);

  // Check if email is provided
  if (!email) { // Added this block to handle missing email
    response.status(400).json({
      error: 'yes',
      success: 'no',
      message: 'Email is required.',
    });
    return
  }

  console.log('Received request for email:', email.validemail);
  console.log(randomlink);

  // Correct SQL query with proper placeholder usage
  const checkEmail = `SELECT * FROM user WHERE EmailID = ?`;

  // Execute the SQL query
  connection.db.query(checkEmail, [email.validemail], function (error, result) {
    if (error) { // Changed error handling to if (error)
      console.error('Error occurred during database query:', error); // Improved logging
      response.status(500).json({
        error: 'yes',
        success: 'no',
        message: 'An error occurred while checking the email.',
      });
      return;
    }

    // Check if any records were found
    if (result.length > 0) {
      console.log('Email found, sending success response.');
      response.status(200).json({
        error: 'no',
        success: 'yes',
        message: 'A password reset link has been sent to your email.', // Changed message
      });
    } else {
      console.log('Email not found, sending failure response.');
      response.status(401).json({
        error: 'yes',
        success: 'no',
        message: 'Email not found in our records.',
      });
    }
  });
};

      let sendMail = function (request, response) {
  //sendemail dynamically
  var dynamicemail = request.body.validemail
  console.log(request.body);

  if (!dynamicemail) {
    console.log('No recipient email provided');
    return response.status(400).json({ message: 'Recipient email is required' });
  }

  const token = jwt.sign({ email: dynamicemail }, 'your_secret_key', { expiresIn: '1h' });
  const resetLink = `http://localhost:3000/changepassword?token=${encodeURIComponent(token)}`;
  console.log('generated token', token);

  response.cookie('resetToken', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
  const mailOption = {
    from: 'atharv.webyug@gmail.com',
    to: dynamicemail,
    subject: 'Reset your password',
    text: `click here to reset your password ${resetLink}`
  }

  connection.db.query(`UPDATE user SET resetToken = ?, resetTokenExpiration = ? WHERE EmailId= ?`,
    [token, Date.now() + 3600000, dynamicemail],
    (error) => {
      if (error) {
        console.log('error occured', error.message);
        return response.status(500).json({ success: false, message: 'Failed to generate reset token' });
      }
    }
  )
  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log('error occured', error);
      return response.status(500).json({ success: false, message: 'failed to send email' })
    }
    else {
      console.log('email sent' + info.response);
      response.status(200).json({ success: true, message: 'Email sent successfully' });

    }
  })
}

     let resetPassword = function (request, response) {
  let token = request.body.token1;
  const newPassword = request.body.newpassword; // Assuming the new password is sent in the request body
  console.log(request.body);

  if (!token || !newPassword) {
    return response.status(400).json({ message: 'Token and new password are required' });
  }

  // Query to find the user with the given reset token and check if the token is still valid
  connection.db.query(`SELECT * FROM user WHERE resetToken = ? `,
    [token],
    (error, results) => {
      console.log('token is ', token)
      console.log(error);
      console.log(results);
      console.log();

      if (error || results.length === 0) {
        return response.status(400).json({ message: 'Invalid or expired token' });
      }

      const user = results[0];
      const saltRounds = 10;

      // Hash the new password
      bcrypt.hash(newPassword, saltRounds, function (err, hash) {
        if (err) {
          console.log('Error hashing password:', err.message);
          return response.status(500).send('Internal Server Error');
        }

        // SQL query to update the password and clear the reset token and expiration
        let resetPasswordQuery = `UPDATE user SET password = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE id = ?`;

        // Execute the query with the hashed password and user id
        connection.db.query(resetPasswordQuery, [hash, user.id], function (error) {
          if (error) {
            console.log('Error occurred:', error);
            return response.status(500).json({ 'message': 'Internal Server Error' });
          } else {
            console.log('Password updated successfully.');
            return response.status(200).json({ 'message': 'Password updated successfully' });
          }
        });
      });
    }
  );
};

     let changepassword = function (request, response) {
  console.log(request.body)
  const salt = '$2b$10$a7UJ3sslncys9hYLTLwhle'
  const saltRounds = 10
  let requiredFields = ['currentpassword', 'newpassword', 'confirmnewpassword'];
  let missingFields = field.getMissingFields(request.body, requiredFields);

  if (missingFields.length > 0) {
    return response.json({
      error: 'yes',
      success: 'no',
      message: `Missing fields: ${missingFields.join(', ')}`
    });
  }

  const { currentpassword, newpassword, confirmnewpassword, id } = request.body;

  if (newpassword !== confirmnewpassword) {
    return response.status(400).json({
      error: 'yes',
      message: 'New password and confirm password do not match'
    });
  }

  const query = 'SELECT password FROM user WHERE id = ?';
  connection.db.query(query, [id], (err, results) => {
    if (err) {
      // console.log(`Error during SELECT query: ${err.message}`);
      return response.status(500).json({
        error: 'Internal Server Error',
        message: 'Error occurred while fetching the user'
      });
    }
    // console.log('results are' , results);
    if (results.length === 0) {
      return response.status(404).json({
        error: 'yes',
        message: 'User not found'
      });
    }


    // console.log('currentpassword is', currentpassword);

    const userpassword = results[0].password;

    bcrypt.compare(currentpassword, userpassword, function (err, isMatch) {
      console.log(!isMatch)
      console.log(currentpassword);
      console.log(userpassword)
      if (err) {
        console.log('Error comparing passwords:', err.message);
        return response.status(500).send('Internal Server Error');
      }

      if (!isMatch) {
        return response.status(400).json({
          error: 'yes',
          message: 'Current password is incorrect'
        });
      }

      const saltRounds = 10;
      bcrypt.hash(newpassword, saltRounds, function (err, hash) {
        // console.log(hash)
        if (err) {
          console.log('Error hashing password:', err.message);
          return response.status(500).send('Internal Server Error');
        }

        let updatePassword = `UPDATE user SET password = ? WHERE id = ?`;
        connection.db.query(updatePassword, [hash, id], function (error) {
          if (error) {
            console.log('Error occurred while updating password:', error.message);
            return response.status(500).json({ message: 'Internal Server Error' });
          } else {
            console.log('Password updated successfully.');
            return response.status(200).json({ message: 'Password updated successfully', id: id });
          }
        });
      });
    });
  });
};

let getData = function (request, response) {
  const userId = request.params.id // get Id
  const query = `SELECT user.id,user.Fullname,user.Profilename,user.Bio,user.social_media, images.filename ,images.id AS user_image_id FROM user LEFT JOIN images ON user.id = images.userid WHERE user.id = ?;
`;
  connection.db.query(query, [userId], (error, results) => {
    if (error) throw error;
    response.json({ message: results[0] });
  });
}


let upedateProfile = function (request, response) {
  console.log(request.body);
  // return 0
  let { Fullname, Profilename, Bio, id, sociallinks } = request.body;
 
  const socialmediaString = JSON.stringify(sociallinks);
  console.log('socialmediaString is' ,socialmediaString)
  // return 0
  const query = `UPDATE user SET Fullname = ?, Profilename = ? , Bio = ? , social_media=?  WHERE id = ?`;
  // console.log(query);
  connection.db.query(query, [Fullname, Profilename, Bio, socialmediaString, id], function (error, result) {
    // console.log(socialmediaString);
    // return 0
    if (error) {
      console.log('Error:', error.message);
      response.status(500).json({ message: 'Failed to update profile' });
    } else {
      response.status(200).json({ message: 'Profile updated successfully' });
    }
  })
}

let Images = function (request, response) {
  const userId = request.body.userid;
  const fileName = request.file?.filename;
  const path = request.route.path;
// console.log(request.body)
// return 0
  if (!request.file) {
    return response.status(400).send('No file uploaded.');
  }else{
    // console.log('file uploaded', fileName);
  }

  // First, check if the image for the user already exists
  const checkQuery = 'SELECT * FROM `register`.images WHERE userid = ?';
  connection.db.query(checkQuery, [userId], (error, results) => {
    // console.log(results)
    // return 0
    if (error) {
      console.error('Error checking for existing image:', error);
      return response.status(500).json({ error: 'Database error while checking image.' });
    }

    if (results.length > 0) {
      // return 0
      // If an image already exists, update it
      const updateQuery = 'UPDATE images SET filename = ?, filepath = ? WHERE userid = ?';
      connection.db.query(updateQuery, [fileName, path, userId], (error, result) => {
        if (error) {
          console.error('Error updating image:', error);
          return response.status(500).json({ error: 'Database error while updating image.' });
        }
        else{
          response.status(200).json({ message: 'Image updated successfully' });
        }
      });
    } else {
      // If no image exists, insert a new one
      const insertQuery = 'INSERT INTO images (userid, filename, filepath) VALUES (?, ?, ?)';
      connection.db.query(insertQuery, [userId, fileName, path], (error, result) => {
        
        if (error) {
          console.error('Error inserting image:', error);
          return response.status(500).json({ error: 'Database error while inserting image.' });
        }
         return response.status(200).json({ message: 'Image uploaded successfully' });
      });
    }
  });
};

    
  let SocialData = function (request, response) {
  const { userId, socialmedia } = request.body;
  let sql = `INSERT INTO user (social_media) VALUES (?)`;
  connection.db.query(sql, [JSON.stringify(socialmedia), userId], function (error, result) {
    if (error) {
      console.log('error in inserting data', error)
      return response.status(500).json({
        error: "yes",
        success: "no",
        message: "An error occurred while registering."
      })
    }
    else {
      console.log('Social media links', result)
      return response.status(200).json({
        error: 'no',
        success: 'yes',
        message: 'successfully'
      })
    }
  })
}

        let Qrcode = function (request, response) {
  const userId = request.params.userId;
  const query = 'SELECT * FROM user WHERE id = ?';
  // return false
  connection.db.query(query, [userId], (err, result) => {
    // console.log(err)
    if (err) {
      return response.status(500).json({ error: 'Failed to fetch user data' });
    }
    if (result.length > 0) {
      delete result[0].social_media;
      response.json(result[0]);  // Assuming result[0] contains the user data
      // console.log('result is ',result[0])
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  });
};

     
   let GenerateQrcode = async function (request, response) {
  const profileData = JSON.stringify(request.body);  // Profile data from the frontend
  // console.log(profileData)
  try {
    const axiosResponse = await axios.post('https://api.qrcode-monkey.com/qr/custom', {
      data: 'http://192.168.1.14:3000/profile',
      config: {
        "body": "rounded-pointed",
        "eye": "frame13",
        "eyeBall": "ball13",
        "erf1": [],
        "erf2": ["fh"],
        "erf3": ["fv"],
        "brf1": [],
        "brf2": ["fh"],
        "brf3": ["fv"],
        "bodyColor": "#ff0000",
        "bgColor": "#FFFFFF",
        "eye1Color": "#ff3300",
        "eye2Color": "#ff3300",
        "eye3Color": "#ff3300",
        "eyeBall1Color": "#ff3300",
        "eyeBall2Color": "#ff3300",
        "eyeBall3Color": "#ff3300",
        "gradientColor1": "#ff3300",
        "gradientColor2": "#ff3300",
        "gradientType": "radial",
        "gradientOnEyes": false,
      },
      size: 300,
      download: false,
      file: 'svg',
    });
    response.send(axiosResponse.data);
  } catch (error) {
    console.error('Error generating QR code:', error);
    response.status(500).json({ error: 'Failed to generate QR code' });
  }
}

let Getqrdata = function (request, response) {
  const userId = request.params.id;
  const query = 'SELECT * FROM user WHERE id = ?';
  connection.db.query(query, [userId], (err, result) => {
    console.log(userId)
    // return false
    if (err) {
      return response.status(500).json({ error: 'Failed to fetch user data' });
    }
    else {
      response.json({ message: result[0] });
    }
  });
}
module.exports = {
  insert,
  login,
  forgotPassword,
  sendMail,
  resetPassword,
  changepassword,
  upedateProfile,
  getData,
  Images,
  SocialData,
  Qrcode,
  GenerateQrcode,
  Getqrdata
}