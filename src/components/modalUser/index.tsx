import { useState } from 'react'
import { Button, Modal, TextField, Box } from '@mui/material'
import bcrypt from 'bcryptjs'

interface ICreateUserModalProps {
    open: boolean
    handleClose: () => void
}

const CreateUserModal = ({ open, handleClose }: ICreateUserModalProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleCreateUser = () => {
        if (password !== confirmPassword) {
            alert("As senhas não coincidem!")
            return
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = {
            name,
            email,
            password: hashedPassword,
        }

        localStorage.setItem('user', JSON.stringify(user))

        handleClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...modalStyle }}>
                <h2>Cadastrar Usuário</h2>
                <TextField
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
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
                <TextField
                    label="Confirmar Senha"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" onClick={handleCreateUser}>Cadastrar</Button>
            </Box>
        </Modal>
    )
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    padding: '16px',
    boxShadow: 24,
    textAlign: 'center'
}

export default CreateUserModal
