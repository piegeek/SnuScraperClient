import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native';
import waves from '../assets/img/waves.png'
import logo from '../assets/img/logo.png'

export default class Background extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logo} ></Image>
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
        // backgroundColor: 'red'
    },
    
    logoContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    
    logo: {
        resizeMode: 'contain',
        height: 39,
        width: 98,
        position: 'relative',
        left: 17
    },
    
    wavesBox: {
        resizeMode: 'contain',
        // backgroundColor: 'red',
        height: 33,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    
});