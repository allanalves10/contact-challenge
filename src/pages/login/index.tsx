import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../context/authenticationContext'
import CreateUserModal from '../../components/modalUser'
import { LoginContainer, LoginCard, StyledLink, StyledTypography } from './styles'
import { toast } from 'react-toastify'
import { IUser } from '../../interfaces/iUser'


const Login = () => {
    const navigate = useNavigate()
    const { handleAuthentication, handleUser } = useAuthentication()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const handleLogin = () => {
        const user: IUser[] = JSON.parse(localStorage.getItem('user') || '[]')

        if (!user) {
            toast.error("Usuário não encontrado!")
            return
        }

        const userExists = user.find((e: IUser) => e.email === email)

        if (userExists && bcrypt.compareSync(password, userExists.password)) {
            handleAuthentication(true)
            handleUser(userExists)
            navigate('/')
        } else {
            toast.error("Email ou senha inválidos!")
        }
    }

    return (
        <LoginContainer>
            <LoginCard>
                <h1>Login</h1>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleLogin}>Entrar</Button>
                <StyledTypography variant="body2">
                    <span>Você ainda não tem uma conta? </span>
                    <StyledLink onClick={() => setOpenCreateModal(true)}>Cadastre-se</StyledLink>
                </StyledTypography>
            </LoginCard>

            <CreateUserModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} />
        </LoginContainer>
    )
}

export default Login
