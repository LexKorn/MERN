import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// import {isCreate} from './pages/CreatePage';
// const isCreate = require('./pages/CreatePage');

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // const isCreate = useContext(isCreate);

    let clazzName;

    const logoutHandler = (e) => {
        e.preventDefault();
        auth.logout();
        navigate('/');
    }    

    const navActive = (isNav) => {        
        if (isNav) {
            return clazzName = 'active';
        } 
    }
    navActive(0);

    

    return (
        <nav>
            <div class="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
            <span class="brand-logo">Сокращение ссылок</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">       
                <li class={clazzName}><NavLink to="/create">Создать</NavLink></li>
                <li><NavLink to="/links">Ссылки</NavLink></li>
                <li><NavLink to="/flats">Квартиры</NavLink></li>
                <li><a href='/' onClick={logoutHandler}>Выйти</a></li>
            </ul>
            </div>
        </nav>
    );
}