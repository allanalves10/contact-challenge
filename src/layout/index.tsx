import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { Content, Header, HeaderContainer, LayoutWrapper, LogoWrapper, LogoutWrapper, StyledLogoutIcon } from './styles'
import logo from '../assets/logo.png'
import { useAuthentication } from '../context/authenticationContext'
import { Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { IUser } from '../interfaces/iUser'

const Layout = () => {
    const { handleAuthentication, handleUser, user } = useAuthentication()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogout = () => {
        handleAuthentication(false)
        handleUser(undefined)
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleDeleteAccount = () => {
        setOpenDeleteModal(true)
        setAnchorEl(null)
    }

    const handleCloseDeleteModal = () => {
            setOpenDeleteModal(false)
            setPassword('')
            setError('')
    }

    const handleConfirmDelete = () => {
        if (bcrypt.compareSync(password, user?.password || '')) {
            const listUser: IUser[] = JSON.parse(localStorage.getItem('user') || '[]')
            const updateListUser = listUser.filter((e: IUser) => e.id !== user?.id)
            localStorage.setItem('user', JSON.stringify(updateListUser))

            handleAuthentication(false)
            handleUser(undefined)
            handleCloseDeleteModal()
            toast.success('Conta excluída com sucesso!')
        } else {
            setError('Senha incorreta!')
        }
    }

    return (
        <LayoutWrapper>
            <Header>
                <HeaderContainer>
                <LogoWrapper>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={logo} alt="logo uex" />
                    </Link>
                </LogoWrapper>

                <LogoutWrapper>
                    <a onClick={(e) => handleMenuClick(e)}>
                        <StyledLogoutIcon />
                    </a>
                    <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    >
                    <MenuItem onClick={handleDeleteAccount}>Excluir Conta</MenuItem>
                    <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </Menu>
                </LogoutWrapper>
                </HeaderContainer>
            </Header>

            <Content>
                <Outlet />
            </Content>

            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal} fullWidth maxWidth="sm">
                <DialogTitle>Excluir Conta</DialogTitle>
                <DialogContent>
                    <Typography>Para excluir sua conta, insira sua senha</Typography>
                    <TextField
                        label="Insira sua senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} color="error">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="success">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </LayoutWrapper>
    )
}

export default Layout
