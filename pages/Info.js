import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../styles/colors'

import Background from '../components/Background';

export default class Info extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Background headerText='INFO'></Background>
                <ScrollView style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>
                            사용하는 방법
                        </Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>1. 알림을 받고자 하는 강좌를 추가한다</Text>
                            <Text style={styles.textContent}>내 강좌 -> 강좌 알림 추가하기</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>2. 추가 된 강좌에 빈 자리가 생기면 자동으로 알림이 온다</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>3. 강좌의 실시간 인원을 보려면?</Text>
                            <Text style={styles.textContent}>내 강좌 -> 실시간 인원 확인 버튼</Text>
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
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    textContainer: {
        marginTop: 48
    },

    textTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    textContent: {
        fontSize: 16,
        marginTop: 5
    }
});