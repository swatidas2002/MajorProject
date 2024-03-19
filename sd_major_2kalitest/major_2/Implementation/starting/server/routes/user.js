import express from 'express';
import bcrypt from 'bcrypt'; 
const router = express.Router(); 
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "User already exists" }); // Returning 409 status code
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,    
  });

  await newUser.save();
  return res.json({ status: true, message: "Record registered" });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Login successfully" });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '5m' });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '20051348@kiit.ac.in',
        pass: 'gvbhtgpfysgagofu'
      }
    });
    
    var mailOptions = {
      from: '20051348@kiit.ac.in',
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:5173/resetPassword/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.json({ message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (err) {
     console.log(err);
  }
});

router.post('/reset-password/:token', async(req, res) => {
    const {token} = req.params;
    const {password} = req.body
    try{
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
        return res.json({status: true, message: "updated password"})
    } catch(err){
      return res.json("invalid token")
    }
})

const verifyUser = async (req, res, next) => {
  try{  
  const token = req.cookies.token;
  if(!token){
    return res.json({status: false, message: "no token"})
  }
  const decoded = await jwt.verify(token, process.env.KEY);
  next()

} catch(err){
  return res.json(err)
}
}

router.get('/verify', verifyUser, (req, res) => {
   return res.json({status: true, message: "authorized"})
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({status: true})
})

export { router as UserRouter };
