import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../styles/colors'

export default class LectureInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lectureData: this.props.navigation.getParam('lectureData')
        };
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <View style={styles.lectureInfoContainer}>
                        <Text style={styles.title}>
                            {this.state.lectureData['교과목명']}
                        </Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>교과구분</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['교과구분'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>개설대학</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['개설대학'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>개설학과</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['개설학과'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>이수과정</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['이수과정'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>학년</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['학년'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>교과목번호</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['교과목번호'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>강좌번호</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['강좌번호'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>교과목명</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['교과목명'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>학점</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['학점'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>강의</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['강의'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>실습</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['실습'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>수업교시</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['수업교시'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>수업형태</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['수업형태'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>강의실(동-호)(#연건, *평창)</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['강의실(동-호)(#연건, *평창)'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>주담당교수</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['주담당교수'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>정원</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['정원'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>비고</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['비고'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>강의언어</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['강의언어'] }</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>개설상태</Text>
                            <Text style={styles.textContent}>{ this.state.lectureData['개설상태'] }</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    static navigationOptions = {
        title: '강좌 상세정보'
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.extraLightPurple,
        padding: 11
    },

    lectureInfoContainer: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
    },
    
    title: {
        color: colors.yellow,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    textContainer: {
        marginTop: 15
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