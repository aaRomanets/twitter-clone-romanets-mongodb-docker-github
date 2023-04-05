import {colors} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import {useHomeStyles} from '../pages/theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../store/ducks/user/selectors';
import { Link } from "react-router-dom";
import { signOut } from '../store/ducks/user/actionCreators';

interface UserSideProfileProps {
    classes: ReturnType<typeof useHomeStyles>
}

export const UserSideProfile: React.FC<UserSideProfileProps> = ({ classes }: UserSideProfileProps) => {
    const dispatch = useDispatch();

    //получаем данные по авторизованному пользователю
    const userData = useSelector(selectUserData);

    //привязка контекстного меню показа твитов по пользователю или выхода из страницы твитов
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    //функция открытия контекстного меню показа твитов по пользователю или выхода из страницы твитов
    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };
    
    //функция скрытия контекстного меню показа твитов по пользователю или выхода из страницы твитов
    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        //устраняем токен, а вместе с этим снимаем авторизацию с пользователя
        window.localStorage.removeItem('token');
        //выходим из страницы Твитера
        dispatch(signOut())
    }

    //если данных по авторизованному пользователю нет то выходим из этого модуля
    if (!userData) {
        return null;
    }

    return (
        <>
            <div 
                // открываем контекстное меню показа твитов по пользователю или выхода из страницы твитов
                onClick={handleOpenPopup} 
                className={classes.sideProfile}
            >
                {/*Аватарка пользователя*/}
                <Avatar/>
                <div className={classes.sideProfileInfo}>
                    {/*Полное имя пользователя*/}
                    <b>{userData.fullname}</b>
                    {/*Имя пользователя*/}
                    <Typography style={{color: colors.grey[500]}}>@{userData.username}</Typography>
                </div>
                <ArrowBottomIcon/>
            </div>
            {/*контекстное меню показа твитов по пользователю или выхода из страницы твитов*/}
            <Menu 
                classes = {{
                    paper: classes.profileMenu
                }} 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}    
                //скрываем контекстное меню показа твитов по пользователю или выхода из страницы твитов      
                onClose={handleClosePopup} 
                keepMounted
            >
                {/*Переходим на страницу авторизованного пользователя*/}
                <Link to={`/user/${userData._id}`}>
                    {/*Скрываем контекстное меню*/}
                    <MenuItem onClick={handleClosePopup}>My profile</MenuItem>
                </Link>
                
                {/*Выходим из страницы твитов, снимаем авторизацию с пользователя, который сформировал последние твиты */}
                <MenuItem onClick={handleSignOut}>Escape</MenuItem>
            </Menu>
        </>
    );
}