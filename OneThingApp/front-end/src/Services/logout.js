function logoutUser() {
    const [jwt, setJwt] = useLocalState("", "jwt");
    console.log("attempting to log out user with curent jwt");
}

export {logoutUser};