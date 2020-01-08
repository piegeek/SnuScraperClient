/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Intro from './pages/Intro'
import Home from './pages/Home'

const MainNavigator = createBottomTabNavigator(
  	{
      	Intro: { screen: Intro },
    	Home: { screen: Home },
	}, 
	{
		initialRouteName: 'Home'
	}
);

const Navigation = createAppContainer(MainNavigator);

const App = () => {
  return (
    <Fragment>
    	<Navigation></Navigation>
    </Fragment>
  );
};

export default App;
