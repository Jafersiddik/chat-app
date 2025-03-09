import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import {  post } from "../../utils/axios";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = config.apiUrl;

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true)
        await post(apiUrl + '/api/auth/sign-up', { name: username, password }).then((response) => {
            const result = response;
            setLoading(false)
            console.log(result.status)
            if (result.status  == true) {
                navigate('/')
            } else {
                if(result.errors){
                    let valid_error = '';
                    result.errors.map((error,index)=>{
                        valid_error += index == 0 ? error.msg : ','+error.msg; 
                    })
                    setError(valid_error)
                }else{
                    setError(result.message)
                }
            }
            console.log(response)
        }).catch((error) => {
            setError("something went wrong")
        });

    }
    return (
        <>
            <div className="initial-screen" id="initialScreen">
                <div className="auth-app-name">Chat App</div>
                <form onSubmit={handleSignUp}>
                    <div id="signupForm" >
                        <h2>Sign Up</h2>
                        {error && <div className="error-message">{error}</div>}
                        <input type="text" id="signupUsernameInput" placeholder="User Name" className="LoginInput" onChange={(e) => { setUsername(e.target.value) }}
                            value={username} />
                        <input type="password" id="signupPasswordInput" placeholder="Password" className="LoginInput" onChange={(e) => { setPassword(e.target.value) }}
                            value={password} />
                        <button id="signupButton" className="coolBeans" type="submit">{loading ? 'Sigining Up...' : 'Sign Up'}</button>
                        <p className="signin-option">Already have an account? <Link to={'/signin'} className="signin-link"> SignIn</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;