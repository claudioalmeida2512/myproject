const TOKEN_KEY = '@myToken';
const USER_LOGADO = '@user';
const EMAIL_LOGADO = '@email';

export const isAuthenticated = () =>localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = response => {
    let {token,user} = response.data ;
    console.log(JSON.stringify(user)) ;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_LOGADO, user.name);
    localStorage.setItem(EMAIL_LOGADO, user.email);
   
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_LOGADO);
    localStorage.removeItem(EMAIL_LOGADO);
};