import { View, Text, StyleSheet, TouchableHighLight } from 'react-native';
import React, { Component } from 'react';
import { colors } from '../styles/colors';

export default class DeleteAllLecturesBtn extends Component {
    render() {
        return (
            <TouchableHighLight style={styles.container}>
                <Text>강좌 모두 삭제하기</Text>
            </TouchableHighLight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.orange
    }
});