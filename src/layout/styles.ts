import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = styled.header`
    background-color: var(--blue-600);
    color: white;
    padding: 1rem;
    text-align: center;

    img {
        height: 4rem;
        width: 8rem;
    }
`;

export const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Content = styled.main`
    flex: 1;
    padding: 2rem;
`;

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
`;

export const LogoWrapper = styled.div`
    flex: 1;
    text-align: center;
`;

export const LogoutWrapper = styled.div`
    margin-left: auto;
    color: #111;
`;

export const StyledLogoutIcon = styled(LogoutIcon)`
    cursor: pointer;
`;