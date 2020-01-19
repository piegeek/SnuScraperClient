import React, { Fragment, Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';

import Intro from './pages/Intro'
import Home from './pages/Home'
import Search from './pages/Search'
import Exchange from './pages/Exchange'
import HowTo from './pages/HowTo'
import Misc from './pages/Misc'
import { colors } from './styles/colors'

const tabBarIconSize = 19
const tabBarIconColor = colors.black

const MainNavigator = createBottomTabNavigator(
  	{
      Home: {
			screen: Home,
			navigationOptions: {
				tabBarLabel: '내 강좌',
				tabBarIcon: <Icon name='home' size={tabBarIconSize} style={{ color: tabBarIconColor }}></Icon>
			},
		},
      Exchange: {
			screen: Search,
			navigationOptions: {
				tabBarLabel: '강의 교환',
				tabBarIcon: <Icon name='exchange' size={tabBarIconSize} style={{ color: tabBarIconColor }}></Icon>
			},
		},
      HowTo: {
			screen: Exchange,
			navigationOptions: {
				tabBarLabel: '사용법',
				tabBarIcon: <Icon name='info-circle' size={tabBarIconSize} style={{ color: tabBarIconColor }}></Icon>
			},
		},
      Misc: {
			screen: Misc,
			navigationOptions: {
				tabBarLabel: '더보기',
				tabBarIcon: <Icon name='cog' size={tabBarIconSize} style={{ color: tabBarIconColor }}></Icon>
			},
		}
	}, 
	{
		initialRouteName: 'Home',
		tabBarOptions: {
			tabStyle: {
				backgroundColor: colors.white
			}
		}
	}
);

const Navigation = createAppContainer(MainNavigator);

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		/*
		Run this function after first render only
		*/
		this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(async fcmToken => {
			await AsyncStorage.setItem('fcmToken', fcmToken)
			console.log('fcmToken successfully set.');
		});
		
		this.checkFCMPermissions();
	}

	componentWillUnmount() {
		/* 
		Last function to run before the component is taken off the stack
		*/
		console.log('Taken off the stack')
		// Implement token refresh handling
		this.onTokenRefreshListener();
	}
	
	checkFCMPermissions() {
		firebase.messaging().hasPermission()
		.then(enabled => {
			if (enabled) {
				// What to do if permission is enabled
				this.checkDeviceToken();
			}
			else {
				// Ask for permission
				this.requestFCMPermissions();
			}
		})
	}
	
	checkDeviceToken() {
		AsyncStorage.getItem('fcmToken')
		.then(fcmToken => {
			if (fcmToken) {
				return console.log(`Token exists: ${fcmToken}`);
			}
			else {
				firebase.messaging().getToken()	
				.then(newFcmToken => {
					if (newFcmToken) {
						AsyncStorage.setItem('fcmToken', newFcmToken).then(() => console.log('fcmToken successfully set.'))
					}
					else {
						return console.log('No new FCM token received!');
					}
				})
			}
		})
		.catch(err => {
			console.log(err);
		})
	}


	requestFCMPermissions() {
		firebase.messaging().requestPermission()
		.then(() => {
			// User has authorized
			this.checkDeviceToken();
		})
		.catch(() => {
			// User has rejected
			console.error('Permission denied')
		})
	}
	
	render() {
		return (
			<Fragment>
    			<Navigation></Navigation>
    		</Fragment>
		)
	}
}