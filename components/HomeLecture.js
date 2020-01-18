import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { colors } from '../styles/colors';
import Button from './Button';
import refreshImg from '../assets/img/refresh.png'
import chevronRight from '../assets/img/chevronRight.png'

export default class HomeLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lectureData: this.props.lectureData
        };
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
});