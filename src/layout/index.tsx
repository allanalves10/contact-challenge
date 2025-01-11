
import { Link, Outlet } from 'react-router-dom';
import { Content, Header, LayoutWrapper } from './styles';
import logo from '../assets/logo.png'

const Layout = () => {
  return (
    <LayoutWrapper>
      <Header>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={logo} alt="logo uex" />
        </Link>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </LayoutWrapper>
  );
};

export default Layout;
