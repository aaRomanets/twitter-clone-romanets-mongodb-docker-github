import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'; 

import { AddTweetForm } from '../../components/AddTweetForm';
import {Tweet} from '../../components/Tweet';
import { useHomeStyles } from '../theme';
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import { selectIsTweetsLoading, selectTweetsItems} from '../../store/ducks/tweets/selectors';
import { Route } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { FullTweet } from './components/FullTweet';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//страница создания твитов
export const Home = (): React.ReactElement => {
    const classes = useHomeStyles();
    const dispatch = useDispatch();
    //скачиваем все твиты с сервера какие есть
    const tweets = useSelector(selectTweetsItems);
    //определяем флаг процесса скачивания всех твитов с севера
    const isLoading = useSelector(selectIsTweetsLoading);

    React.useEffect(() => {
        //делаем запрос на скачивание всех твитов с сервера
        //make request on downloading all tweets wit server
        dispatch(fetchTweets())
    }, [dispatch])

    return (
        <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
                {/*Появление кнопки возвращения на предыдущую страницу */}
                <Route  path="/home/:any" >
                    <BackButton/>
                </Route>
                            
                <Route  path={'/home'} exact>
                    <Typography variant="h6">Tweets</Typography>
                </Route>
            </Paper>
            
            <Route path={'/home'} exact>
                <Paper>
                    {/*Форма добавления твита*/}
                    <div className={classes.addForm}>
                        <AddTweetForm classes={classes} />
                    </div>
                    <div className={classes.addFormBottomLine} />
                </Paper>
            </Route>
            
            <Route path="/home" exact>
                {/*Фиксируем процесс скачивания твитов с сервера*/}
                {isLoading ? (
                    <div className={classes.tweetsCentred}>
                        <CircularProgress/>
                    </div>
                ) : (
                    //выводим список всех скаченных твитов с сервера
                    tweets.map((tweet) => <Tweet key={tweet._id} classes={classes} images={tweet.images} {...tweet} />) 
                )}
            </Route>
            {/*Полная информация о каждом твите при переходе на веб-страницу /home/tweet/:id*/}
            <Route path="/home/tweet/:id" component={FullTweet} exact/>
        </Paper>                                                
    )
}