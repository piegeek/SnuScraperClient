import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { colors } from '../styles/colors';
import addCircle from '../assets/img/addCircle.png';

export default class AddLectureBtn extends Component {    
    render() {
        return (
            <TouchableHighlight
            style={styles.container}
            onPress={this.props.onPress}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.text}>강좌 알림 추가하기</Text>
                    <Image style={styles.circleImg} source={addCircle}></Image>
                </View>
            </TouchableHighlight>
        );
    }
}

styles = StyleSheet.create({
    container: {
        height: 67,
        width: '100%',
        borderRadius: 13,
        backgroundColor: colors.purple,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
    },

    circleImg: {
        resizeMode: 'contain',
        height: 40,
        width: 40,
        marginLeft: 20
    },
});
