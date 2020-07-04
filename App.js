import React, { Fragment, Component } from 'react';
import { Platform } from 'react-native';

import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage from 'react-native-flash-message';
import { showMessage, hideMessage } from "react-native-flash-message";
import firebase from 'react-native-firebase';
import { Client } from 'bugsnag-react-native';
import { createStackNavigator } from 'react-navigation-stack';

import { colors } from './styles/colors';
import { config } from './config';

import Home from './pages/Home';
import Exchange from './pages/Exchange';
import Stats from './pages/Stats';
import Info from './pages/Info';
import Misc from './pages/Misc';
import Auth from './pages/Auth';

const bugsnag = new Client(config.BUGSNAG_ID);

const tabBarIconSize = Platform.OS === 'android' ? 19 : 25;
const tabBarLabelShow = Platform.OS === 'android' ? true : false;

const homeTab = {
	screen: Home,
	navigationOptions: {
		tabBarLabel: '내 강좌',
		tabBarIcon: ({tintColor}) => <Icon name='home' size={tabBarIconSize} color={tintColor}></Icon>
	},
}

const statsTab = {
	screen: Stats,
	navigationOptions: {
		tabBarLabel: '통계',
		tabBarIcon: ({tintColor}) => <Icon name='line-chart' size={tabBarIconSize} color={tintColor}></Icon>
	},
}

const infoTab = {
	screen: Info,
	navigationOptions: {
		tabBarLabel: '사용법',
		tabBarIcon: ({tintColor}) => <Icon name='info-circle' size={tabBarIconSize} color={tintColor}></Icon>
	},
}

const miscTab = {
	screen: Misc,
	navigationOptions: {
		tabBarLabel: '더보기',
		tabBarIcon: ({tintColor}) => <Icon name='cog' size={tabBarIconSize} color={tintColor}></Icon>
	},
}

const tabOptions = {
	initialRouteName: 'Home',
	tabBarOptions: {
		tabStyle: {
			backgroundColor: colors.white
		},
		activeTintColor: colors.yellow,
		inactiveTintColor: colors.grey,
		safeAreaInset: {
			bottom: 'never'
		},
		showLabel: tabBarLabelShow
	}
}

const MainNavigator = Platform.OS === 'android' ? createBottomTabNavigator(
  	{
	  Home: homeTab,
	  Stats: statsTab,
	  Info: infoTab,
	  Misc: miscTab
	},
	tabOptions
) : createBottomTabNavigator(
	{
	  Home: homeTab,
	  Info: infoTab,
	  Misc: miscTab
	},
	tabOptions
);

const authScreen = {
	screen: Auth,
};

const AuthNavigator = createStackNavigator({
	Auth: authScreen
});

// const Navigation = createAppContainer(MainNavigator);
const Navigation = createAppContainer(
	createSwitchNavigator(
		{
			AuthRoute: AuthNavigator,
			MainRoute: MainNavigator
		},
		{
			initialRouteName: 'MainRoute'
		}
	)
);

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: true
		};
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
	
	// If background color to SafeAreaView is set => Make sure to set the background color to white on inner components to avoid overlay of colors

	render() {
		return (
			<Fragment>
				<SafeAreaView style={{ flex: 0, backgroundColor: colors.white }} ></SafeAreaView>
				<SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
					<Navigation></Navigation>
				</SafeAreaView>
				<FlashMessage position='bottom'></FlashMessage>
			</Fragment>
		);
	}
}