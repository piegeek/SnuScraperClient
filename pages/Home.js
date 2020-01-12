import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MyLectures from './MyLectures';
import Search from './Search';

const HomeNavigator = createStackNavigator(
    {
        MyLectures: {
            screen: MyLectures
        },
        Search: {
            screen: Search
        }
    },
    {
        initialRouteName: 'MyLectures'
    }
);

const HomeContainer = createAppContainer(HomeNavigator);

export default class Home extends Component {
    render() {
        return (
            <HomeContainer></HomeContainer>
        )
    }
}