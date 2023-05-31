export const isAuthenticated = () => {
    const localToken = localStorage.getItem("bytecode_token")

    return localToken
        ? true
        : false
}