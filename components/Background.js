import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import waves from '../assets/img/waves.png';
import cloudLogo from '../assets/img/cloudLogo.png';

export default class Background extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={cloudLogo} ></Image>
                </View>       
                <Image style={styles.wavesBox} source={waves}></Image>   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: 60,
    },
    
    logoContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    
    logo: {
        resizeMode: 'contain',
        height: 50,
        width: 180,
        position: 'absolute',
        left: 10
    },
    
    wavesBox: {
        resizeMode: 'contain',
        height: 33,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    
});