import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../styles/colors';
import { config } from '../config'

import Button from './Button';
import refreshImg from '../assets/img/refresh.png';
import chevronRight from '../assets/img/chevronRight.png';

export default class HomeLecture extends Component {
    constructor(props) {
        super(props);
        this.deleteButtonPressed = this.deleteButtonPressed.bind(this);
        this.getNewStudentNumber = this.getNewStudentNumber.bind(this);
        this.state = {
            lectureData: this.props.lectureData
        };
    }
    
    async getNewStudentNumber() {
        try {
            const res = await fetch(config.LIVE_SCRAPER_API_URI + `/lectures/${this.state.lectureData['교과목번호']}/${parseInt(this.state.lectureData['강좌번호'])}`);
            const data = await res.json();

            if (parseInt(data.status) === 200) {
                const newLectureData = this.state.lectureData;
                newLectureData['수강신청인원'] = parseInt(data.updated_number)
                
                this.setState({
                    lectureData: newLectureData
                });
                this.props.updateData(this.state.lectureData);
                console.log('Success')
                console.log(`Updated number: ${data.updated_number}`)
            }
            else {
                console.log('Something went wrong, try again');
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    deleteButtonPressed() {        
        this.props.deleteLectures(this.state.lectureData);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.subjectName}>
                        { this.state.lectureData['교과목명'] }
                        { (parseInt(this.state.lectureData['강좌번호']) >= 0 && parseInt(this.state.lectureData['강좌번호']) <= 9) 
                            ? ' (00' + this.state.lectureData['강좌번호'] + ')'
                            : ' (0' + this.state.lectureData['강좌번호'] + ')'
                        }
                    </Text>
                    <Text style={styles.studentNumber}>
                        { this.state.lectureData['수강신청인원'] }/{ this.state.lectureData['정원'].split(' ')[0] }
                    </Text>

                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <Button
                            color={colors.orange}
                            text='실시간 인원 확인'
                            imageUri={refreshImg}
                            onPress={this.getNewStudentNumber}
                            ></Button>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                            color={colors.yellow}
                            text='강좌 상세 정보'
                            imageUri={chevronRight}
                            ></Button>
                        </View>
                    </View>
                </View> 
                <TouchableHighlight
                onPress={this.deleteButtonPressed}
                style={styles.deleteButton}>
                    <Icon name='close' size={22} style={styles.deleteIcon}></Icon>
                </TouchableHighlight>               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: colors.lightPurple,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center'
    },

    subContainer: {
        width: '50%',
        paddingTop: 20,
        paddingBottom: 20,
    },

    subjectName: {
        color: colors.white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    studentNumber: {
        fontWeight: 'bold',
        fontSize: 40,
        color: colors.black,
        textAlign: 'center'
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },

    deleteIcon: {
        color: colors.purple
    },

    deleteButton: {
        height: 24,
        width: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
        backgroundColor: colors.white,
        position: 'absolute',
        top: 10,
        right: 15
    }
});