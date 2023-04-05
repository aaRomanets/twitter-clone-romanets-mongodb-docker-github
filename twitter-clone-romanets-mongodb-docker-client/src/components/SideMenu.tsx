import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import UserIcon from '@material-ui/icons/PermIdentityOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { useHomeStyles } from '../pages/theme'
import { ModalBlock } from './ModalBlock';
import { AddTweetForm } from './AddTweetForm';
import { Link } from 'react-router-dom';
import { UserSideProfile } from './UserSideProfile';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/ducks/user/selectors';

interface SideMenuProps {
    classes: ReturnType<typeof useHomeStyles>;
}

//список действий в твитере
export const SideMenu: React.FC<SideMenuProps> = ({
    classes
}: SideMenuProps): React.ReactElement => {
    //флаг видимости страницы формирования твита авторизованным пользователем
    const [visibleAddTweet, setSetVisibleAddTweet] = React.useState<boolean>(false);

    //получаем всю информацию об авторизованном пользователе
    const userData = useSelector(selectUserData);

    //функция показа страницы формирования твита авторизованным пользователем
    const handleClickOpenAddTweet = () => {
        setSetVisibleAddTweet(true);
    }

    //функция скрытия страницы формирования твита авторизованным пользователем
    const onCloseAddTweet = () => {
        setSetVisibleAddTweet(false);
    }

    return (
        <>
            <ul className={classes.sideMenuList}>
                <li className={classes.sideMenuListItem}>
                    {/*возвращение на главную страницу */}
                    <Link to="/home">
                        <IconButton className={classes.logo}  aria-label="" color="primary">
                            <TwitterIcon className={classes.logoIcon} />
                        </IconButton>
                    </Link>
                </li>
                <li className={classes.sideMenuListItem}>
                    {/*возвращение на главную страницу */}
                    <Link to="/home">
                        <div>
                            <HomeIcon className={classes.sideMenuListItemIcon}/>
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                Main
                            </Typography>
                        </div>
                    </Link>
                </li>
                <li className={classes.sideMenuListItem}>
                    {/*переходим на страницу показа полной информации об авторизованном пользователе, включая его твиты */}
                    <Link to={`/user/${userData?._id}`}>
                        <div>        
                            <UserIcon className={classes.sideMenuListItemIcon}  />  
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                Profile
                            </Typography>      
                        </div>
                    </Link>
                </li>
                <li className={classes.sideMenuListItem}>
                    <Button 
                        //открываем форму добавления твита
                        onClick={handleClickOpenAddTweet} 
                        className={classes.sideMenuTweetButton} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                    >
                        Tweet                        
                    </Button>
                    {/*Модальное окно показа формы формирования твита */}
                    <ModalBlock 
                        //закрываем форму формирования твита
                        onClose={onCloseAddTweet} 
                        //флаг видимости формы формирования твита
                        visible={visibleAddTweet} 
                        title="" 
                    >
                        {/*Форма формирования твита */}
                        <div style={{width: 550}}>
                            <AddTweetForm maxRows={15} classes={classes}/>
                        </div>
                    </ModalBlock>
                </li>
            </ul>   
            {/*Действия с данными пользователя: показать его профиль или снять его с авторизации*/}     
            <UserSideProfile classes={classes}/>
        </> 
    )
}