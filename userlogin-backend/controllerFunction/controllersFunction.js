const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const UserVerification = require('../model/UserVerification');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASSWORD
    }
});

module.exports.sendVerificationEmail = async({_id, email}, res)=>{
    const currentUrl = "http://localhost:5000/"
    const uniqueString = uuidv4() + _id;
    const mailOptions = {
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"Please verify your account from your fucking email",
        html:`<p>Veify your email to complete your signup and login into your account.</><p>This link 
        <b>expires in 6 hours</b>.</p><p>press <a href=${
            currentUrl + 'user/verify/' + _id + '/' + uniqueString
         }>here</a> to proceed</p>`,
    }
    const salt = await bcrypt.genSalt();
    try{
        const uniqueStringHash = await bcrypt.hash(uniqueString, salt) 
        try{
            await UserVerification.create({
                userID:_id,
                uniqueString:uniqueStringHash,
                createdAt:Date.now(),
                expiresAt:Date.now() + 21000000,
            });
            try{
                await transporter.sendMail(mailOptions);
                res.json({
                    status:"PENDING",
                    message:"Verification email sent"
                })
            }
            catch(err){
                console.log(err)
                await User.deleteOne({email})
                await UserVerification.deleteOne({email});
                res.json({
                    status:"FAILED",
                    message:"Verification email not sent, check your connection and try again"
                })
            }
        }
        catch(err){
            console.log(err)
            res.json({
                status:"FAILED",
                message:"Could'nt save email data!"
            })
        }
    }
    catch(err){
        console.log(err)
        res.json({
            status:"FAILED",
            message:"An error occured while hashing email data!"
        })
    }
}
module.exports.sendForgetPwdEmail = async({email}, res)=>{f
    const currentUrl = "http://localhost:3000/"
    const mailOptions = {
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"Change your password",
        html:`<p>Please click the link below to change your password.</><p>This link 
        </p><p><b>press.</b><a href=${
            currentUrl + 'api/pwdreset' + '/' + email }>here</a> to proceed</p>`,
    }
            try{
                await transporter.sendMail(mailOptions);
                res.json({
                    status:"PENDING",
                    message:"Verification email sent"
                })
            }
            catch(err){
                console.log(err)
                res.json({
                    status:"FAILED",
                    message:"Verification email failed"
                })
            }
}
module.exports.handleError = (err) => {
    console.log(err.message, err.code);
    let errors = {username:'', email:'', pwd:''};


    if(err.message === 'incorrect email'){
        errors.email = 'Please enter a valid email'
        return errors;
    }
    if(err.message === 'incorrect password'){
        errors.pwd = 'Please enter a valid password'
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
        return errors;
    }
    if(err.code === 11000){
        errors.email = 'Email already exist';
        return errors;
    }
}
