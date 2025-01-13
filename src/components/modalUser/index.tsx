import { Button, Modal, TextField, Box } from '@mui/material'
import bcrypt from 'bcryptjs'
import { toast } from 'react-toastify'
import { IUser } from '../../interfaces/iUser'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserFormData, userSchema } from '../../schemas/userSchema'

interface ICreateUserModalProps {
    open: boolean
    handleClose: () => void
}

const CreateUserModal = ({ open, handleClose }: ICreateUserModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    })

    const handleCreateUser = (data: UserFormData) => {
        const { name, email, password } = data

        const listUser: IUser[] = JSON.parse(localStorage.getItem('user') || '[]')

        if (listUser?.find((e: IUser) => e.email === email)) {
            toast.error("Email já cadastrado!")
            return
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = {
            id: crypto.randomUUID(),
            name,
            email,
            password: hashedPassword,
        }

        const updateListUser = [...listUser, user]
        localStorage.setItem('user', JSON.stringify(updateListUser))

        toast.success('Usuário cadastrado com sucesso!')
        reset()
        handleClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...modalStyle }}>
                <h2>Cadastrar Usuário</h2>
                <form onSubmit={handleSubmit(handleCreateUser)}>
                    <TextField
                        label="Nome"
                        fullWidth
                        margin="normal"
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        label="Confirmar Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button variant="contained" type="submit">Cadastrar</Button>
                </form>
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
