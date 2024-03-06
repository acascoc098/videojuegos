import {createContext, useContext, useEffect, useReducer, useState} from "react";
import axios from "axios";

export const GameContext = createContext();

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token, loginError: null };
        case 'LOGIN_FAILED':
            return { ...state, isAuthenticated: false, user: null, token: null, loginError: action.payload };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null, token: null, loginError: null };
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token, loginError: null };
        case 'REGISTER_FAILED':
            return { ...state, isAuthenticated: false, user: null, token: null, loginError: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const GameProvider = ({children}) => {
    //const [games, setGames] = useState([]);
    const initialState = {
        isAuthenticated: false,
        user: null,
        token: null,
        loginError: null
    };

    const [state, dispatch] = useReducer(gameReducer, initialState);
    const [loading, setLoading] = useState(true);

    const getGames = async () => {
        try{
            const response = await fetch("http://localhost:3001/juegos");
            if (response.status !== 200) throw Error;
            const gamesData = await response.json();
            return gamesData;
            //{error: false, data: await response.json()};
            
        }catch (e){
            console.log("ERROR: no se pueden recuperar los videojuegos")
        }
        //return await response.json();
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        }
        setLoading(false);
        getGames();
    },[])
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            console.log(response.data);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, accessToken } });
        } catch (error) {
            console.error("Error during login", error);
            dispatch({ type: 'LOGIN_FAILED', payload: error.response.data || 'Error al iniciar sesión' })
        }
    };

    const register = async (email, password, username) => {
        try {
            const response = await axios.post('http://localhost:3001/register', { email, password, username });
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'REGISTER_SUCCESS', payload: { user, accessToken } });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILED', payload: error.response.data || 'Error en el registro' });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    const getToken = () => {
        return state.token;
    };

    return (
        <GameContext.Provider value={{login,register,logout,getToken,state,loading,getGames}}>
            {children}
        </GameContext.Provider>
    );
}

export const useAuth = () => useContext(GameContext);