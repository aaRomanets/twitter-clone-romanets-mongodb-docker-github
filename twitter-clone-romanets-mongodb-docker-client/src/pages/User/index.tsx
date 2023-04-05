import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'; 

import classNames from "classnames";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { BackButton} from '../../components/BackButton';
import { useHomeStyles } from '../theme';

import Sceleton from "@material-ui/lab/Skeleton";

import './User.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsTweetsLoading, selectTweetsItems } from '../../store/ducks/tweets/selectors';
import { Tweet } from '../../components/Tweet';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';

import { User } from '../../store/ducks/user/contracts/state';
import { AuthApi } from '../../services/api/authApi';

export const UserPage = () => {
    const classes = useHomeStyles();
    //получаем твиты авторизованного пользователя из store если они уже скачены с сервера
    const tweets = useSelector(selectTweetsItems);
    const dispatch = useDispatch();
    //флаг хода процесса скачивания твитов 
    const isLoading = useSelector(selectIsTweetsLoading);
    //данные авторизованного пользователя и их шаблон
    const [userData, setUserData] = React.useState<User | undefined>();

    React.useEffect(() => {
        //получаем идентификатор авторизованного пользователя 
        const userId = window.location.pathname.split('/').pop();

        //получаем твиты авторизованного пользователя
        dispatch(fetchTweets());

        if (userId) {
            //скачиваем с сервера всю информацию об авторизованном пользователе
            AuthApi.getUserInfo(userId).then(({data}) => {
                //формируем данные авторизованного пользователя по их шаблону 
                setUserData(data);    
            })
        }
    }, [dispatch])

    return (
        <Paper className={classNames(classes.tweetsWrapper,'user')} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                {/*Возвращаемся на предыдущую веб страницу */}
                <BackButton/>
                <div>
                    {/*Мое имя*/}
                    <Typography variant="h6">Aleksandr Romanets</Typography>
                    {/*Сколько твитов у авторизованного пользователя*/}
                    <Typography variant="caption" display="block" gutterBottom>
                        {tweets.length} tweets
                    </Typography>
                </div>
            </Paper>
            <div className="user__header"></div>

            <div className="user__info">
                {/*Аватарка*/}
                <Avatar/>
                {
                    //полное имя авторизованного пользователя
                    !userData ? <Sceleton variant="text" width={250} height={30} /> :
                    <h2 className="user__info-fullname">{userData?.fullname}</h2>
                }
                {
                    //имя авторизованного пользователя
                    !userData ? <Sceleton variant="text" width={60}/> :
                    <span className="user__info-username">@{userData?.username}</span>
                }
                <p className="user__info-description">
                    frontend Developer / UI Designer / JavaScript Red Heart ReactJS * React Native, NodeJS
                </p>
                {/*Моя личная информация*/}
                <ul className="user__info-details">
                    <li>Moskow, Russian</li>
                    <li>
                        <a className="link" href="https://vk.com/im">
                            romanets.aa
                        </a>
                    </li>
                    <li>
                        <br/>
                    </li>
                    <li>Date of birth: 29 december 1980 г.</li>
                    <li>Registration: november 2021г.</li>
                </ul>
            </div>

            <div className="user__tweets">
                {isLoading ? (
                    //отслеживаем состояние процесса скачивания всех твитов авторизованного пользователя
                    <div className={classes.tweetsCentred}>
                        <CircularProgress/>
                    </div>
                ) : (
                    //выводим все твиты авторизованного пользователя
                    tweets.map((tweet) => {
                    return (
                        <Tweet key={tweet._id} classes={classes} images={tweet.images} {...tweet} />
                    )})
                )}
            </div>
        </Paper>
    )
} 