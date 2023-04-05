import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import MessageIcon from '@material-ui/icons/ModeCommentOutlined';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';

export const useStylesSignIn = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        height: '100vh',
    },
    blueSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#71C9F8',
        flex: '0 0 50%',
        overflow: 'hidden',
        position: 'relative',
    },
    blueSideBigIcon: {
        position: 'absolute',
        left: '50%',
        top: '53%',
        transform: 'translate(-50%, -50%)',
        width: '260%',
        height: '260%',
    },
    blueSideListInfo: {
        position: 'relative',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: 380,
        '& h6': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 20,
        },
    },
    blueSideListInfoItem: {
        marginBottom: 40,
    },
    blueSideListInfoIcon: {
        fontSize: 32,
        marginRight: 15,
    },
    loginSide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 50%',
    },
    loginSideTwitterIcon: {
        fontSize: 45,
    },
    loginSideWrapper: {
        width: 380,
    },
    loginSideTitle: {
        fontWeight: 700,
        fontSize: 32,
        marginBottom: 60,
        marginTop: 20,
    },
    loginSideField: {
        marginBottom: 18,
    },
    registerField: {
        marginBottom: theme.spacing(5),
    },
    loginFormControl: {
        marginBottom: theme.spacing(2),
    },
}));

//стартовая страница авторизации и регистрации пользователя
export const SignIn: React.FC = (): React.ReactElement => {
    //получаем классы верстки
    const classes = useStylesSignIn();

    //флаги показа окна регистрации или авторизации
    const [visibleModal, setVisibleModal] = React.useState<'signUp' | 'signIn'>();

    //функция показа окна регистрации
    const handleClickOpenSignUp = (): void => {
        setVisibleModal('signUp');
    };

    //функция показа окна авторизации
    const handleClickOpenSignIn = (): void => {
        setVisibleModal('signIn');
    };

    //окна регистрации и авторизации скрыты
    const handleCloseModal = (): void => {
        setVisibleModal(undefined);
    };

    return (
        <div className={classes.wrapper}>
            <section className={classes.blueSide}>
                <TwitterIcon color="primary" className={classes.blueSideBigIcon} />
                <ul className={classes.blueSideListInfo}>
                    <li className={classes.blueSideListInfoItem}>
                        <Typography variant="h6">
                            <SearchIcon className={classes.blueSideListInfoIcon} />
                            Read about what you are interested in.
                        </Typography>
                    </li>
                    <li className={classes.blueSideListInfoItem}>
                        <Typography variant="h6">
                            <PeopleIcon className={classes.blueSideListInfoIcon} />
                            Find out what the world is talking about.
                        </Typography>
                    </li>
                    <li className={classes.blueSideListInfoItem}>
                        <Typography variant="h6">
                            <MessageIcon className={classes.blueSideListInfoIcon} />
                            Join the conversation.
                        </Typography>
                    </li>
                </ul>
            </section>
            <section className={classes.loginSide}>
                <div className={classes.loginSideWrapper}>
                    <TwitterIcon color="primary" className={classes.loginSideTwitterIcon} />
                    <Typography className={classes.loginSideTitle} gutterBottom variant="h4">
                        Find out what's happening in the world right now
                    </Typography>
                    <Typography>
                        <b>Join Twitter right now!</b>
                    </Typography>
                    <br />
                    {/*Появление окна регистрации нового пользователя */}
                    <Button
                        onClick={handleClickOpenSignUp}
                        style={{ marginBottom: 20 }}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Register
                    </Button>
                    {/*Появление окна авторизации имеющегося пользователя*/}
                    <Button 
                        onClick={handleClickOpenSignIn} 
                        variant="outlined" 
                        color="primary" 
                        fullWidth
                    >
                        Enter
                    </Button>
                    {/*Окно регистрации нового пользователя, которое появляется при visibleModal === 'signUp' */}
                    <RegisterModal open={visibleModal === 'signUp'} onClose={handleCloseModal}/>
                    {/*Окно авторизации имеющегося пользователя, которое появляется при visibleModal === 'signIn'  */}
                    <LoginModal open={visibleModal === 'signIn'} onClose={handleCloseModal} />                   
                </div>
            </section>
        </div>
    );
};