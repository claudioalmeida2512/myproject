const TOKEN_KEY = '@myToken';
export const ID_LOGADO = '@userId';
export const USER_LOGADO = '@user';
export const EMAIL_LOGADO = '@email';

export const isAuthenticated = function () {
    if (localStorage.getItem(TOKEN_KEY) !== null){
          return true ;
    }
    return false ;
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER_LOGADO);

export const login = response => {
    let {token,user} = response.data ;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_LOGADO, user.name);
    localStorage.setItem(ID_LOGADO, user.id);
    localStorage.setItem(EMAIL_LOGADO, user.email);
   
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ID_LOGADO);
    localStorage.removeItem(USER_LOGADO);
    localStorage.removeItem(EMAIL_LOGADO);
};