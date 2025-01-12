import styled from 'styled-components';
import { Box } from '@mui/material';

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

export const LoginCard = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;
    padding: 20px;
    background-color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;

    h1 {
        margin-bottom: 20px;
    }

    button {
        margin-top: 10px;
    }
`;

export const StyledLink = styled.a`
    text-decoration: none;
    color: #1976d2;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;