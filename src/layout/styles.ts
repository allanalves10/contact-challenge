import styled from 'styled-components';

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