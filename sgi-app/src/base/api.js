import { create } from 'apisauce' ;
import { getToken } from "./auth.js";

const api = create({ 
    baseURL: 'http://localhost:8080',

});

api.addAsyncRequestTransform(request => async() => {
   const token = getToken();
   if (token)
    request.headers['Autorization'] = 'Bearer ${token}' ;
});

api.addResponseTransform( response => {
    if (!response.ok) throw response ;

});



export default api;