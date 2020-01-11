import React, { Component } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

import {colors} from '../styles/colors'

import Background from '../components/Background'
import TextSearch from '../components/TextSearch'
import SearchLecture from '../components/SearchLecture'

export default class Search extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Background></Background>
                <ScrollView style={styles.container}>
                    <View style={styles.textSearchContainer}>
                        <TextSearch></TextSearch>
                    </View>

                    <View>
                        <SearchLecture subjectName='골프 초급' subjectNumber='051.022(022)'></SearchLecture>
                        <SearchLecture subjectName='골프 초급' subjectNumber='051.022(022)'></SearchLecture>
                    </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.extraLightPurple,
        padding: 11
    },

    textSearchContainer: {
        marginTop: 10
    }
});
