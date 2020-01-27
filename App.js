import React, { Fragment, Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";
import firebase from 'react-native-firebase';
import { Client } from 'bugsnag-react-native';

import { colors } from './styles/colors';
import { config } from './config';

import Home from './pages/Home';
import Exchange from './pages/Exchange';
import Info from './pages/Info'
import Misc from './pages/Misc';

const bugsnag = new Client(config.BUGSNAG_ID);

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
			screen: Exchange,
			navigationOptions: {
				tabBarLabel: '강의 교환',
				tabBarIcon: <Icon name='exchange' size={tabBarIconSize} style={{ color: tabBarIconColor }}></Icon>
			},
		},
      Info: {
			screen: Info,
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
						showMessage({
							message: '토큰을 생성하는 중에 문제가 발생했습니다.',
							type: 'warning'
						});
						return bugsnag.notify(new Error('No new FCM token received!'));
					}
				})
			}
		})
		.catch(err => {
			showMessage({
				message: '토큰을 가져오는 중에 문제가 발생했습니다.',
				type: 'warning'
			});
			bugsnag.notify(err);
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
			showMessage({
				message: '푸시 알람을 허용해야만 빈자리 알림을 받을 수 있습니다.',
				type: 'info'
			});
		})
	}
	
	render() {
		return (
			<Fragment>
    			<Navigation></Navigation>
				<FlashMessage position='bottom'></FlashMessage>
			</Fragment>
		)
	}
}