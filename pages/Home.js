import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import Background from '../components/Background'
import AddLectureBtn from '../components/AddLectureBtn'
import HomeLecture from '../components/HomeLecture'
import { colors } from '../styles/colors';

export default class Home extends Component {
    render() {
        return (
            <View style={{ flex:1 }}>
                <Background></Background>

                <ScrollView style={styles.container}>
                    <Text style={styles.header}>내 강좌</Text>
                    <View style={styles.buttonContainer}>
                        <AddLectureBtn></AddLectureBtn>
                    </View>

                    <View style={styles.lectures}>
                        <View style={styles.lecture}>
                            <HomeLecture
                            subjectName={'골프 초급(양종현)'}
                            currentStudentNumber={29}
                            maxStudentNumber={30}
                            ></HomeLecture>
                        </View>
                        <View style={styles.lecture}>
                            <HomeLecture
                            subjectName={'골프 초급(양종현)'}
                            currentStudentNumber={29}
                            maxStudentNumber={30}
                            ></HomeLecture>
                        </View>
                        <View style={styles.lecture}>
                            <HomeLecture
                            subjectName={'골프 초급(양종현)'}
                            currentStudentNumber={29}
                            maxStudentNumber={30}
                            ></HomeLecture>
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
        // height: '80%',
        padding: 11
    },
    
    header: {
        fontWeight: 'bold',
        fontSize: 35,
        color: colors.orange,
        textAlign: 'center',
    },

    buttonContainer: {
        marginTop: 10
    },

    lectures: {
        marginTop: 10
    },

    lecture: {
        marginTop: 10
    }
});