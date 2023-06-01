const AuthProvider = () => {
    const [user, setUser] = useState(null)

    const isAuthenticated = false

    async function signIn({ email, password }) {
        const { token, user } = await signInRequest({
            email,
            password,
        })

        // setCookie(undefined, 'myproject.token', token, {
        //     maxAge: 60 * 60 * 1 // 1 hour
        // })

        setUser(user)
    }

    return (
        <></>
    )
}

export default AuthProvider