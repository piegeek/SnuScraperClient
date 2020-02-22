import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Icon from 'react-native-vector-icons/MaterialIcons';
import waves from '../assets/img/waves.png';
import { colors } from '../styles/colors';

export default class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wavyIphoneModels: [
                'iPhone XR',
                'iPhone XS Max',
                'iPhone 11',
                'iPhone 11 Pro Max'
            ]
        };
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Icon name='notifications-active' size={38} style={styles.logoIcon}></Icon>
                <Text style={styles.headerText}>
                    ALARM
                </Text>
                {
                    Platform.OS === 'ios' && this.state.wavyIphoneModels.includes(DeviceInfo.getModel()) ?
                        <Image style={styles.wavesBox} source={waves}></Image>  :
                    null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    logoContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    
    logo: {
        resizeMode: 'contain',
        height: 80,
        width: 80,
        position: 'absolute',
        left: 0,
        top: 0
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: 23,
        marginLeft: 60,
        letterSpacing: 0.3,
    },

    logoIcon: {
        color: colors.yellow,
        position: 'absolute',
        zIndex: -1,
        left: 15
    },
    
    wavesBox: {
        resizeMode: 'contain',
        height: 33,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    
});