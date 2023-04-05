import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import mediumZoom from 'medium-zoom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames'; 

import {Divider} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';

import { fetchTweetData } from '../../../store/ducks/tweet/actionCreators';
import { selectIsTweetLoading, selectTweetData } from '../../../store/ducks/tweet/selectors';
import { useHomeStyles } from '../../theme';

import { ImageList } from '../../../components/ImageList';

export const FullTweet: React.FC = (): React.ReactElement | null => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();

    //получаем идентификатор твита
    const params: { id?: string } = useParams();
    const id = params.id;

    //получаем полный твит с идентификатором id
    const tweetData = useSelector(selectTweetData);
    
    //флаг скачивания твита с идентификатором id с сервера
    const isLoading = useSelector(selectIsTweetLoading);

    React.useEffect(() => {
        //если идентификатор твита определен то делаем запрос на его скачивание с сервера
        if (id) {
            dispatch(fetchTweetData(id));
        }
    }, [dispatch, id]);

    //чуть увеличиваем изображения твита если не идет процесс скачивания твита с сервера 
    React.useEffect(() => {
        if (!isLoading) {
          mediumZoom('.tweet-images img');
        }
    }, [isLoading]);
    
    //фиксируем процесс скачивания твита с идентификатором id с сервера
    if (isLoading) {
        return (
            <div className={classes.tweetsCentred}>
                <CircularProgress />
            </div>
        );
    }

    //выводим полную инфомацию о твите
    if (tweetData) {
        return (
            <>
                <Paper className={classes.fullTweet}>
                    <div  className={classNames(classes.tweetsHeaderUser)}>
                        {/*Аватарка твита*/}
                        <Avatar 
                            className={classes.tweetAvatar}
                            alt={`Аватарка пользователя ${tweetData.user.fullname}`} 
                            src={tweetData.user.avatarUrl}
                        />
                        <Typography>
                            {/*Полное имя пользователя твита*/}
                            <b>{tweetData.user.fullname}</b>&nbsp;
                            <div>
                                {/*имя пользователя твита*/}
                                <span className={classes.tweetUserName}>@{tweetData.user.username}</span>&nbsp;
                            </div>
                        </Typography>
                    </div>
                    <Typography className={classes.fullTweetText} gutterBottom>
                        {/*Техт твита*/}
                        {tweetData.text}
                        {/*Все изображения твита если они есть*/}
                        <div className="tweet-images">
                            {tweetData.images && <ImageList classes={classes} images={tweetData.images}/>}
                        </div>
                    </Typography>
                    <Typography>
                        {/*Время создания твита по часам и минутам */}
                        <span className={classes.tweetUserName}>{format(new Date(tweetData.createdAt), 'H:mm', {locale: ruLang})} . </span>
                        {/*Время создания твита по дням месяцам и годам */}
                        <span className={classes.tweetUserName}>{format(new Date(tweetData.createdAt), 'dd MMM. yyyy  г.', {locale: ruLang})} </span>
                    </Typography>
                </Paper>
                <Divider/>            
            </>
        )
    }    
    return null;
};
