/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Client } from 'bugsnag-react-native';
import { config } from './config'
import App from './App';
import {name as appName} from './app.json';

const bugsnag = new Client(config.BUGSNAG_ID);
bugsnag.notify(new Error('Test Error'));
AppRegistry.registerComponent(appName, () => App);
