import React from 'react';
import { Container, Grid } from '@material-ui/core';

import { SideMenu } from '../components/SideMenu';
import { useHomeStyles } from './theme';

interface layout {
  children: React.ReactNode;
}

//шаблон центральной страницы когда пользователь авторизован
export const Layout: React.FC<layout> = ({ children }): React.ReactElement => {
    const classes = useHomeStyles();

    return (
        <Container className={classes.wrapper} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid sm={1} md={3} item>
                    {/*Список действий с твитами*/}                   
                    <SideMenu classes={classes} />
                </Grid>
                {/*Иллюстрация твитов и действий с ними (создание, удаление)*/}  
                <Grid sm={11} md={9} item>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
};
