import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';
import { colors } from '../styles/colors'
import IntroLogo from '../assets/img/IntroLogo.png'

export default class Intro extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={IntroLogo}></Image>

                <View style={styles.introText}>
                    <Text style={styles.mainText}>SNU</Text>
                    <Text style={styles.subText}>SCRAPER</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: colors.purple,
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        resizeMode: 'contain',
        width: '70%',
        position: 'absolute',
        bottom: 250
    },

    introText: {
        position: 'absolute',
        bottom: 100,
        margin: 'auto',
    },

    mainText: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 67,
        color: colors.orange,
        position: 'relative',
        left: -30
    },

    subText: {
        fontSize: 23,
        fontWeight: '200',
        color: colors.white,
        position: 'relative',
        top: -10,
        left: '30%' 

    }
});