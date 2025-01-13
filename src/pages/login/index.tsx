import { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../context/authenticationContext'
import CreateUserModal from '../../components/modalUser'
import { LoginContainer, LoginCard, StyledLink } from './styles'
import { toast } from 'react-toastify'
import { IUser } from '../../interfaces/iUser'


const Login = () => {
    const navigate = useNavigate()
    const { setIsAuthentication, setUser } = useAuthentication()
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
            setIsAuthentication(true)
            setUser(userExists)
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
                <Typography variant="body2">
                    <span>Você ainda não tem uma conta? </span>
                    <StyledLink onClick={() => setOpenCreateModal(true)}>Cadastre-se</StyledLink>
                </Typography>
            </LoginCard>

            <CreateUserModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)} />
        </LoginContainer>
    )
}

export default Login
