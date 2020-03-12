import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import {colors} from '../styles/colors';
import Button from './Button';

import chevronRight from '../assets/img/chevronRight.png'

export default class SearchLecture extends Component {
    constructor(props) {
        super(props);
        this.addButtonPressed = this.addButtonPressed.bind(this);
        this.navigateButtonPressed = this.navigateButtonPressed.bind(this);
        this.state = {
            lectureData: this.props.lectureData // Object
        };
    }
    
    addButtonPressed() {
        this.props.addLecture(this.state.lectureData); 
    }

    navigateButtonPressed() {
        this.props.navigateToLectureInfo(this.state.lectureData);
    }
    
    render() {        
        return (
            <View style={styles.container}>
                <View style={styles.columnLeft}>
                    <View style={styles.subjectInfo}>
                        <Text style={styles.subjectName}>{ this.state.lectureData['교과목명'] }</Text>
                        <Text style={styles.subjectNumber}>
                            { (parseInt(this.state.lectureData['강좌번호']) >= 0 && parseInt(this.state.lectureData['강좌번호']) <= 9) 
                                ? this.state.lectureData['교과목번호'] + ' (00' + this.state.lectureData['강좌번호'] + ')'
                                : this.state.lectureData['교과목번호'] + ' (0' + this.state.lectureData['강좌번호'] + ')'
                            }
                        </Text>
                        <Button onPress={this.navigateButtonPressed} color={colors.yellow} text='강좌 상세 정보' imageUri={chevronRight}></Button>
                    </View>
                </View>
                <View style={styles.columnRight}>
                    <TouchableHighlight style={styles.addButton} onPress={this.addButtonPressed}>
                        <Icon name='plus' size={26} style={styles.addIcon}></Icon>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: '100%',
        borderRadius: 10,
        minHeight: 130,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    columnLeft: {
        width: '65%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    columnRight: {
        width: '35%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    subjectInfo: {
        width: '85%'
    },

    subjectName: {
        color: colors.black,
        fontSize: 25,
        fontWeight: 'bold'
    },

    subjectNumber: {
        color: colors.grey,
        fontSize: 20,
        fontWeight: 'bold'
    },

    addButton: {
        height: 72,
        width: 72,
        borderRadius: 35,
        // marginLeft: 40,
        backgroundColor: colors.orange,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    addIcon: {
        color: colors.white,
    }

});