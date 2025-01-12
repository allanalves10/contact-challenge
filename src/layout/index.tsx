
import { Link, Outlet } from 'react-router-dom'
import { Content, Header, HeaderContainer, LayoutWrapper, LogoWrapper, LogoutWrapper, StyledLogoutIcon } from './styles'
import logo from '../assets/logo.png'
import { useAuthentication } from '../context/authenticationContext'

const Layout = () => {
    const { setIsAuthentication } = useAuthentication()

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
                    <StyledLogoutIcon onClick={() => setIsAuthentication(false)} />
                </LogoutWrapper>
            </HeaderContainer>
        </Header>
        <Content>
            <Outlet />
        </Content>
        </LayoutWrapper>
    )
}

export default Layout
