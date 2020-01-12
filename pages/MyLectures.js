import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../components/Background'
import AddLectureBtn from '../components/AddLectureBtn'
import HomeLecture from '../components/HomeLecture'

import { colors } from '../styles/colors';

export default class MyLectures extends Component {    
    static navigationOptions = {
        title: [
            <Icon name='notifications-active' style={{ color: colors.yellow, fontSize: 30 }}></Icon>,
            <Text
            style={{ fontWeight: 'bold', fontSize: 25 }}
            >SNU</Text>
        ],
        headerStyle: {
            height: 60,
        },
    };
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>                    
                    <View style={styles.buttonContainer}>
                        <AddLectureBtn onPress={()=>this.props.navigation.navigate('Search')}></AddLectureBtn>
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