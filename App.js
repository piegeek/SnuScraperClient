import React, {Fragment} from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome'

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

const App = () => {
  return (
    <Fragment>
    	<Navigation></Navigation>
    </Fragment>
  );
};

export default App;
