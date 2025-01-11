import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../context/authenticationContext';

const Login = () => {
    const navigate = useNavigate()
    const { setIsAuthentication } = useAuthentication()

    const handleLogin = () => {
        setIsAuthentication(true)
        navigate('/')
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default Login;
