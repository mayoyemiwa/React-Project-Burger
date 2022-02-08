import {React, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../css/Signup.css';

const Signup = () => {
  const initialInputValues = {username:"", email:"", pwd:""};
  const [signupValues, setSignupValues] = useState(initialInputValues);
  const inputErrors = {username:"", email:"", pwd:""};
  const [signupError, setsignupError] = useState(inputErrors)
  const [isLoading, setIsLoding] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setSignupValues({...signupValues, [name]:value})
    setsignupError({...signupError, username:'', email:'', pwd:'' })
}
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoding(true)
        setVerificationError('');
    
            try{
            const result = await axios.post('/api/signup', {signupValues})
            console.log(signupValues)
                if(result.data.status ) {
                    setIsLoding(false);
                    setsignupError({...signupError, username:'', email:'', pwd:'' })
                    setVerificationError(result.data.message)
                } else{
                    setIsLoding(false);
                    setSignupValues(initialInputValues)
                    setsignupError({...signupError, username:'', email:'', pwd:'' })
                    navigate('/login')
                }
        }
            catch(error){
                if(error){
                setIsLoding(false)
                setVerificationError('')
                setsignupError({...signupError, 
                    email:error.response.data.email, 
                    username:error.response.data.username, 
                    pwd:error.response.data.pwd
                })
                }   
            }
    }
    return (
        <div className="sbg" >
        <div className="signupContainer">
            {verificationError && <div><h6>{verificationError}</h6></div>}
            {isLoading && <div className="tc">Loading</div>}
            <p className="signupheader">SIGNUP</p>
        <form  className="signUP" onSubmit={handleSubmit}>
            <div className="signUP">
                <label className="signupLabel">FULLNAME</label>
                <input className="signupInput bg-white" onChange={handleChange} name="username" value={signupValues.username} type="text" placeholder="John Doe"/>
                { signupError.username.length > 0 && <div className="signError">{signupError.username}</div> }
            </div>
            <div className="signUP">
                <label className="signupLabel">EMAIL ADDRESS</label>
                <input className="signupInput bg-white" onChange={handleChange} name="email" value={signupValues.email} type="text" placeholder="john@example.com"/>
                { signupError.email.length > 0 && <div className="signError">{signupError.email}</div> }
            </div>
            <div className="signUP">
                <label className="signupLabel2">PASSWORD</label>
                <input className="signupInput bg-white" onChange={handleChange} type="text" name="pwd" value={signupValues.pwd} placeholder="password"/>
            </div>
            { signupError.pwd.length > 0 && <div className="signError">{signupError.pwd}</div> }
            <button className="signupBtn">REGISTER</button>
        </form>
        <p className="signupP">Already a member?<Link to="/login" className="signupF">Login</Link></p>
    </div>
    </div>
    )
}

export default Signup
