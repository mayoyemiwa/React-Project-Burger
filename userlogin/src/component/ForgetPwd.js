import {useState} from 'react';
import axios from 'axios';

    const ForgetPwd = () => {
   
        const [email, setEmail] = useState('');
        const [isLoading, setIsLoading] = useState('');
        const [success, setSuccess] = useState(false);
        const [message, setMessage] = useState('');
        const [error, setError] = useState('');

        const handleSubmit =async(e) => {
            e.preventDefault();
            setIsLoading(true);
            setError('')

            if(!email.length > 0){
                setError('This field cannot be empty')
                setIsLoading(false)
            }
            else{
                try{
                    const result = await axios.post('https://userlogin-backend.herokuapp.com/api/forgetPwd', {email});
                    console.log(result)
                    setSuccess(true)
                    setMessage(result.data.message)
                    setIsLoading(false);
                }
                 catch(error){
                     setError(error.response.data)
                     setIsLoading(false)
                 }
            }
        }
        return (<div>
            {!success ?
                <div className="sbg">
                <div className="loginContainer">
                {isLoading && <div className="tc">Loading</div>}
                    <p className="header">PASSWORD RESET</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="login">
                            <label className="loginLabel">ENTER YOUR EMAIL ADDRESS</label>
                            <input className="loginInput bg-white" type="text" name="email" value={email} onChange={(e)=>{setEmail(e.target.value); setError('')}} placeholder="john@example.com"/>
                            { error.length > 0 && <div className="signError">{error}</div> }
                        </div>
                        <button className="loginBtn">Submit</button>
                    </form>
                </div>
            </div> :
            <div className="sbg2" >
                <div className="signupContainer2">
                    <h2 style={{color:"green", textAlign:"center"}}>{ message }</h2>
                </div>
            </div> 
            }
        </div>
        )
    }
    export default ForgetPwd