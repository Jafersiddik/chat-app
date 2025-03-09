import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useSocket from "../../helper/socket";
import config from "../../config";
import {  post } from "../../utils/axios";

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = config.apiUrl;

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        await post(apiUrl + '/api/auth/signin', { name: username, password }).then((response) => {
            const result = response;
            setLoading(false)
            console.log(result.status)
            if (result.status == true) {
                console.log("ww")
                sessionStorage.setItem('jwtToken', result.data.token)
                navigate('/home')
            } else {
                if(result.errors){
                    let valid_error = '';
                    result.errors.map((error)=>{
                        valid_error += error.msg+','
                    })
                    setError(valid_error)
                }else{
                    setError(result.message)
                }
            }
            console.log(response)
        }).catch((error) => {
            setError("Something went wrong")
        });

    }

    return (
        <>
            <div className="initial-screen" id="initialScreen">
                <div className="auth-app-name">Chat App</div>
                <div id="loginForm">
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        {error && <div className="error-message">{error}</div>}
                        <input type="text" id="usernameInput" placeholder="User Name" className="LoginInput"
                            onChange={(e) => { setUsername(e.target.value) }}
                            value={username}
                        />
                        <input type="password" id="passwordInput" placeholder="Password" className="LoginInput"
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                        />
                        <button className="coolBeans" id="connectButton" type="submit">{loading ? 'Logging In...' : 'Login'}</button>
                        <p className="signup-option">Don't have an account?
                            <Link to={'/signup'} className="signup-link"> SignUp</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signin;