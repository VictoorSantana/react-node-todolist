
import { API_URL_BASE, LOCAL_STORAGE_VAR } from '../properties/setup';

import axios from 'axios';

export default {
    isAuthenticated: () => {
        
        const token = localStorage.getItem(LOCAL_STORAGE_VAR);

        let isAuth = false;
        if(token !== null && token !== undefined) {
            if(token.trim().length > 0) {
                isAuth = true;
            } else {
                isAuth = false;
            }
        }

        return isAuth;
    },  
    
    postBody: async (API_SERVICE, data) => {
        return axios.post(API_URL_BASE + API_SERVICE, data)
        .then(res => {          
          return res.data;
        }).catch(function (error) {
            return { fail: true, message: 'ERR_CONNECTION_TIMED_OUT', data: {} };
        }); 

    },

    postBodyUsingToken: async (API_SERVICE, data) => {

        const token = 'Bearer ' + await localStorage.getItem(LOCAL_STORAGE_VAR);  

        return axios.post(API_URL_BASE + API_SERVICE, data, { headers: { authorization: token } })
        .then(res => {          
          return res.data;
        }).catch(function (error) {
            return { fail: true, message: 'ERR_CONNECTION_TIMED_OUT', data: {} };
        }); 

    },

    getAllUsingToken: async (API_SERVICE) => {

        const token = 'Bearer ' + await localStorage.getItem(LOCAL_STORAGE_VAR);    

        return await axios.get(API_URL_BASE + API_SERVICE,  { headers: { authorization: token } } )
        .then(res => {
            return res.data;            
        });   
    },

    putRouteUsingToken: async (API_ROUTE) => {

        const token = 'Bearer ' + await localStorage.getItem(LOCAL_STORAGE_VAR);            

        return await axios.put(API_URL_BASE + API_ROUTE,  {},{ headers: { authorization: token } } )
        .then(res => {
            return res.data;            
        })
        .catch(function (error) {            
            return { fail: true, message: 'ERR_CONNECTION_TIMED_OUT', data: {} };
        }); 
    }
}