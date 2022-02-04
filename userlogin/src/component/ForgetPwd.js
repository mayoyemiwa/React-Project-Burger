import {useState} from 'react';
import axios from 'axios';

    const ForgetPwd = () => {
   
        const [email, setEmail] = useState('');
        const [isLoading, setIsLoading] = useState('');
        const [verificationError, setVerificationError] = useState('');

        const handleSubmit =async(e) => {
            e.preventDefault();
            setIsLoading(true);
            try{
                const result = await axios.post('/api/forgetPwd', {email});
                setVerificationError(result.data.message)
                setIsLoading(false);
            }
             catch(error){
                 console.log(error)
                 setVerificationError('')
                 setIsLoading(false)
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
                            <input className="loginInput bg-white" type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="john@example.com"/>
                        </div>
                        <button className="loginBtn">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    export default ForgetPwd
    