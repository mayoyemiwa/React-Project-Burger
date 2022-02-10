const User = require('../model/User');
const UserVerification = require('../model/userVerification');
const ControllersFunction = require('../controllerFunction/controllersFunction')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const maxAge = 3 * 60 * 60 * 24;
const createToken = (id) => {
    return jwt.sign({id}, 'mayoyemiwa4190', {expiresIn:maxAge}) 
}
module.exports.verified_get = (req, res)=> {
    console.log('verified')
    res.sendFile(path.join(__dirname, '../views/verified.html',))
}
module.exports.verify_get = async(req, res)=>{
    console.log('meeeee')
    const {userID, uniqueString} = req.params;
    console.log(userID, uniqueString)
    try{
        const result = await UserVerification.find({userID})
        console.log(result)
        if(result.length > 0){
            console.log(result)
            const {expiresAt} = result[0];
            const uniqueStringHash = result[0].uniqueString;
            console.log('unique', uniqueStringHash)
            if(expiresAt < Date.now()){
                try{
                    const result = await UserVerification.deleteOne({userID})
                    console.log('delete', result)
                    try{
                        await User.deleteOne({_id:userID})
                        let message = "The link as expired. Please sign up again"
                        res.redirect(`/api/user/verified/?error=true&message=${message}`)
                    }
                    catch(err){
                        let message = "Clearing user id with expired uniqueString failed"
                        res.redirect(`/api/user/verified/?error=true&message=${message}`)
                    }
                }
                catch(err){
                    console.log(err)
                    let message = "An error ocurred while clearing user verification record"
                    res.redirect(`/api/user/verified/?error=true&message=${message}`)
                }
            }else{
                try{
                    const result = await bcrypt.compare(uniqueString, uniqueStringHash);
                    console.log('compare', result)
                    if(result){
                        try{
                           const result =  await User.updateOne({_id:userID}, {verified:true}) 
                           console.log(result)
                            try{
                                const del = await UserVerification.deleteOne({userID})
                                console.log(del)
                                  if(del){
                                    console.log('send')
                                    res.sendFile(path.join(__dirname, "./../views/verified.html"))
                                    }else{
                                        console.log('error')
                                    }
                                }
                            catch(err){
                                console.log('problem')
                                let message = "An error ocurred while finalizing successful record."
                                res.redirect(`api/user/verified/?error=true&message=${message}`)
                            }
                        }
                        catch(err){
                            let message = "An error ocurred while updating user record to show verified."
                            res.redirect(`/api/user/verified/?error=true&message=${message}`)
                        }
                    }else{
                        let message = "Invalid verification data passed. Please check inbox."
                        res.redirect(`/api/user/verified/?error=true&message=${message}`)
                    }
                }
                catch(err){
                    let message = "An error ocurred while comparing unique string."
                    res.redirect(`/api/user/verified/?error=true&message=${message}`)
                }
            }
        }else{
            let message = "Account record does not exist or has been verified already. Please sign in or log in"
            res.redirect(`/api/user/verified/?error=true&message=${message}`)
        }
    }
    catch(err){
        console.log('lookfor', err)
        let message = "An error ocurred while checking for existing user verification record"
        res.redirect(`/api/user/verified/?error=true&message=${message}`)
    }
}
module.exports.login_post = async (req, res) => { 
    const {email, pwd} = req.body.loginValues;
    try{
        const user = await User.login(email, pwd);
        const token = await createToken(user._id);
        console.log(token)
        res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge * 1000, secure:true});
        res.status(200).json({user:user.email})
    }
    catch(err){
        const errors = ControllersFunction.handleError(err);
        res.status(400).json(errors)
    }
}    
module.exports.signup_post = async(req, res) => {
    try{
        const user = await User.create(req.body.signupValues)
        try{
            await ControllersFunction.sendVerificationEmail(user, res);
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    }
    catch(err){
        const errors = await ControllersFunction.handleError(err);
        console.log('this:', errors)
        res.status(400).json(errors)            
    }
}
module.exports.orders_get = async(req, res) => {
    const token = req.cookies.jwt;
    if(token){
        await jwt.verify(token, 'mayoyemiwa4190', (err, decodedToken) => {
            if(err){
                res.send(err)
            }else{
                res.json({verify:true})
            }
        })
    }
    else{
            res.json({verify:false})
    }
}
module.exports.forgetpwd_post = async(req, res) => {
    const email = req.body.email;
    try{
        const user = await User.findOne({email});
        if(user){
            try{
            ControllersFunction.sendForgetPwdEmail(user, res)
            }
            catch(error){
                console.log(error)
                res.status(400).json(error)
            }
        }else{
            res.status(404).json("Email not found. Please sign up");
        }
    }
    catch(error){
        res.status(404).json(error);
    }
}
module.exports.pwdReset_post = async(req, res) => {
    const {email, pwd} = req.body;
    const salt = await bcrypt.genSalt();
        try{
            await User.findOne({email})
            try{
                const newPwd = await bcrypt.hash(pwd, salt)
                await User.updateOne({email}, {pwd:newPwd})
            }
            catch(error){
                res.status(400).json("'Error:' unable to update")
            }
        }
        catch(error){
            res.status(404).json("user not found")
        }
}
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', "", {maxAge:1})
  res.json({data:true})
}
