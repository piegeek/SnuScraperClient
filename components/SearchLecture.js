import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import {colors} from '../styles/colors'
import Button from './Button'

import chevronRight from '../assets/img/chevronRight.png'

export default class SearchLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lectureData: this.props.lectureData
        };
    }
    
    addButtonPressed() {
        this.props.addLecture(this.state.lectureData);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.columnLeft}>
                    <Text style={styles.subjectName}>{ this.props.subjectName }</Text>
                    <Text style={styles.subjectNumber}>{ this.props.subjectNumber }</Text>
                    <Button color={colors.yellow} text='강좌 상세 정보' imageUri={chevronRight}></Button>
                </View>
                <View style={styles.columnRight}>
                    <TouchableHighlight style={styles.addButton} onPress={this.addButtonPressed.bind(this)}>
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    columnLeft: {
    },

    columnRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
        marginLeft: 40,
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