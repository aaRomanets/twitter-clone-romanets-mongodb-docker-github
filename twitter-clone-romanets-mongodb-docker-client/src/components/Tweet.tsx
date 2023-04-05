import React from 'react';
import classNames from 'classnames';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Avatar, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import { useHomeStyles } from '../pages/theme';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { ImageList } from './ImageList';
import { removeTweet } from '../store/ducks/tweets/actionCreators';
import { useDispatch } from 'react-redux';

//шаблон полных данных по твиту
interface TweetProps {
  _id: string;
  text: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string;
  images?: string[],
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  };
}

export const Tweet: React.FC<TweetProps> = ({
  //идентификатор твита
  _id,    
  //текст твита     
  text,   
  //пользователь, который этот твит сформировал   
  user,      
  classes, 
  //изображения твита
  images,   
  //время формирования твита  
  createdAt   
}: TweetProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  //хук перехода по веб страницам
  const history = useHistory();

  //функция получения полной информации о твите на отдельную страницу
  const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    //переходим на страницу показа отдельной информации по твиту с идентификатором _id
    history.push(`/home/tweet/${_id}`);
  }

  //функция появления контекстного меню операций с твитом
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  //функция скрытия контекстного меню операцмй с твитом
  const handleClose = (event: React.MouseEvent<HTMLElement>):void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  //функция удаления твита
  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    //контекстное меню операций с твитом скрываем 
    handleClose(event); 
    if (window.confirm('Do you really want to delete a tweet?')) {
      //удаляем твит по идентификатору
      dispatch(removeTweet(_id));
    }
  };

  return (
    <a 
      //при клике на сам твит получаем полную информацию по твиту на веб-странице /home/tweet/${_id}
      onClick={handleClickTweet} 
      className={classes.tweetWrapper} 
      href={`/home/tweet/${_id}`}
    >
      <Paper className={classNames(classes.tweet, classes.tweetsHeader)} variant="outlined">
        {/*Общая аватарка пользователя*/}
        <Avatar
          className={classes.tweetAvatar}
          alt={`User avatar ${user.fullname}`}
          src={user.avatarUrl}
        />
        <div className={classes.tweetContent}>
          <div className={classes.tweetHeader}>
            <div>
              {/*Полное имя пользователя, сформировавшего твит */}
              <b>{user.fullname}</b>&nbsp;
              {/*Имя пользователя, сформировавшего твит */}
              <span className={classes.tweetUserName}>@{user.username}</span>&nbsp;
              <span className={classes.tweetUserName}>·</span>&nbsp;
              {/*Время формирования твита*/}
              <span className={classes.tweetUserName}>{formatDate(new Date(createdAt))}</span>
            </div>
            <div>
              {/*Кнопка появления контекстного меню списка операций с твитом*/}
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              {/*Список операций с твитом, пока только его удаление*/}
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                {/*Удаление твита */}
                <MenuItem onClick={handleRemove}>
                  Удалить твит
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Typography variant="body1" gutterBottom>
            {/*Текст твита, если он есть */}
            {text}
            {/*Изображения твита, если они есть*/}
            { images && <ImageList classes={classes} images={images}/>}
          </Typography>
        </div>
      </Paper>
    </a>
  );
};