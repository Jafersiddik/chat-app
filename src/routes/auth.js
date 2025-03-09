import Signin from '../pages/auth/signin'
import Signup from '../pages/auth/signup';

const authRoutes = [
    { path: "/", component: <Signin /> },
    { path: "/signup", component: <Signup /> },
    { path: "/signin", component: <Signin /> },
]

export default authRoutes;