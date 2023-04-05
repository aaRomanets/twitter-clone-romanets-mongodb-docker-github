import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { SignIn } from './pages/SignIn';
import { useHomeStyles } from './pages/theme';
import { UserPage } from './pages/User/index';
import { fetchUserData } from './store/ducks/user/actionCreators';
import { selectIsAuth, selectUserStatus} from './store/ducks/user/selectors';
import { LoadingStatus } from './store/types';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    //делаем запрос на информацию об авторизованном пользователе по токену
    dispatch(fetchUserData());
  }, [dispatch]);

  const classes = useHomeStyles();

  //хук перехода по веб страницам
  const history = useHistory();

  //флаг есть ли авторизованный пользователь по токену или нет
  const isAuth = useSelector(selectIsAuth);

  //статус формирования информации о пользователе
  const loadingStatus = useSelector(selectUserStatus);
   
  //isReady говорит о том что информация о пользователе сформирована но она может ошибочной (in extreme cases, empty)
  const isReady = loadingStatus !== LoadingStatus.NEVER && 
                  loadingStatus !== LoadingStatus.LOADING;

  React.useEffect(() => {
    if ((!isAuth) || loadingStatus === LoadingStatus.ERROR )   {
      //возвращаемся на страницу авторизации и регистрации когда нету авторизованного пользователя
      history.push('/signin');
    } else if (isAuth && history.location.pathname === '/signin') {
      //переходим на страницу твитов когда есть авторизованный пользователь
      history.push('/home');
    }
  }, [isAuth,history,loadingStatus]);

  //птица показывается когда идет процесс формирования информации о пользователе на сервере
  //либо когда происходит автоизация пользователя на сервере
  //либо когда идет процесс получения информации об авторизованном пользователе с сервера
  if (!isReady) {
    return (
      <div className={classes.centered}>
        <TwitterIcon color="primary" style={{ width: 80, height: 80 }} />
      </div>
    )
  }
  
  return (
    <div className="App">  
      <Switch>
        {/*Станица авторизации и регистрации  */}
        {!isAuth && <Route path="/signin" component={SignIn} exact /> } 
        <Layout>
          {/*Страница создания твитов пользователя */}
          <Route path="/home" component={Home} />
          {/*Страница авторизованного пользователя */}
          <Route path="/user/:id" component={UserPage} exact/>
        </Layout>
      </Switch>
    </div>
  );
}

export default App;