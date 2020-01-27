import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Background from '../components/Background';
import { colors } from '../styles/colors';

export default class Exchange extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Background></Background>
                <View style={styles.container}>
                    <Text>준비중입니다</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.extraLightPurple,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
});