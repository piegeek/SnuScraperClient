import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../styles/colors';

import Background from '../components/Background';

export default class Misc extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Background></Background>
                <ScrollView style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>
                            더 보기
                        </Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>1. 버그 제보나 문의는?</Text>
                            <Text style={styles.textContent}>cloud_alarm@protonmail.com 으로 메일 보내주세요!</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>2. iOS도 지원되나요?</Text>
                            <Text style={styles.textContent}>iOS도 이제 공식 지원됩니다</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>3. 추후에도 계속 업데이트 될 예정인가요?</Text>
                            <Text style={styles.textContent}>네 앞으로 계속 지원될 예정입니다</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.extraLightPurple,
        padding: 11,
    },

    infoContainer: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        paddingTop: 38,
        paddingBottom: 58
    },
    
    title: {
        color: colors.yellow,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    textContainer: {
        marginTop: 48
    },

    textTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    textContent: {
        fontSize: 16,
        marginTop: 5
    }
});