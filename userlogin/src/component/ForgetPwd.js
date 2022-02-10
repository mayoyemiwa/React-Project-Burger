import {useState} from 'react';
import axios from 'axios';

    const ForgetPwd = () => {
   
        const [email, setEmail] = useState('');
        const [isLoading, setIsLoading] = useState('');
        const [verificationError, setVerificationError] = useState('');
        const [error, setError] = useState('');

        const handleSubmit =async(e) => {
            e.preventDefault();
            setIsLoading(true);
            setVerificationError('')
            setError('')

            if(!email.length > 0){
                setError('This field cannot be empty')
                setIsLoading(false)
            }
            else{
                try{
                    const result = await axios.post('http://localhost:5000/api/forgetPwd', {email});
                    console.log(result)
                    setVerificationError(result.data.message)
                    setIsLoading(false);
                }
                 catch(error){
                     setError(error.response.data)
                     setIsLoading(false)
                 }
            }
        }
        return (
            <div className="sbg">
                <div className="loginContainer">
                {verificationError && <div>{verificationError}</div>}
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
            </div>
        )
    }
    export default ForgetPwd