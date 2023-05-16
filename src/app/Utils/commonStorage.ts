const setAuthenticatedUser = (user) =>{
    sessionStorage.setItem('user', user);
}

const getAuthenticatedUser = () =>{
    return sessionStorage.getItem('user')
}


