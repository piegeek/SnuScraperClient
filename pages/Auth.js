import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { colors } from '../styles/colors';
import FullWidthBtn from '../components/FullWidthBtn';
import CloudAlarmBanner from '../assets/img/CloudAlarmBanner.png';

export default class Auth extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.bannerImg} source={CloudAlarmBanner}></Image>
                <View style={styles.buttonsContainer}>
                    <FullWidthBtn
                    containerStyle={styles.buttonContainerStyle}
                    buttonStyle={styles.signUpButtonStyle}
                    buttonTextStyle={styles.buttonTextStyle}
                    text='회원가입'
                    ></FullWidthBtn>
                    <FullWidthBtn
                    containerStyle={styles.buttonContainerStyle}
                    buttonStyle={styles.loginButtonStyle}
                    buttonTextStyle={styles.buttonTextStyle}
                    text='로그인'
                    ></FullWidthBtn>
                </View>
            </View>
        )
    }

    static navigationOptions = {
        headerShown: false
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.purple,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%'
    },

    buttonContainerStyle: {
        width: '100%',
        height: 55,
        marginTop: 15
    },

    signUpButtonStyle: {
        backgroundColor: colors.orange,
        borderRadius: 10,
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTextStyle: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 18 
    },

    loginButtonStyle: {
        borderWidth: 1.5,
        borderColor: colors.white,
        borderRadius: 10,
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bannerImg: {
        resizeMode: 'contain',
        width: '100%',
        height: 200
    },

    buttonsContainer: {
        width: '80%',
        marginTop: 30,
    }
});
