import { Navigate, useNavigate } from "react-router-dom"
import React from "react";

const AuthMiddleware = (props) => {
    const navigate = useNavigate();
    if (!sessionStorage.getItem('jwtToken')) {
        console.log('d')
        navigate('/');
        return (<Navigate to={{ path: '/login', state: props.location }} />)
    }
    return (<React.Fragment>{props.children}</React.Fragment>)
}

export default AuthMiddleware;