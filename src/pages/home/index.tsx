import { useAuthentication } from "../../context/authenticationContext"

const Home = () => {
    const { setIsAuthentication } = useAuthentication()

    return (
        <>
          <div>
            <h1>Uex Challenge</h1>
            <button type='button' onClick={() => setIsAuthentication(false)}>Logout</button>
          </div>
        </>
    )
}

export default Home