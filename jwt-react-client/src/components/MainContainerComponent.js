import React from 'react';
import { TabsContainer, Tabs, Tab } from 'react-md';
import  LoginForm  from '../forms/LoginForm';
import { RegisterForm } from '../forms/RegisterForm';
import FacebookComponent  from './FacebookComponent';

export const MainContainerComponent = () => (

    <TabsContainer panelClassName="md-grid" colored>
        <Tabs tabId="simple-tab">
            <Tab label="About">
                <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--8 md-cell--2-offset">
                    <h3>Hello, World!</h3>
                </div>
            </Tab>
            <Tab label="Register">
                <RegisterForm />
            </Tab>
            <Tab label="Log In">
                <LoginForm />
            </Tab>
            <Tab label="Facebook Log in">
                <FacebookComponent />
            </Tab>
        </Tabs>
    </TabsContainer>

);

