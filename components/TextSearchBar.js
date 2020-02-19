import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { colors } from '../styles/colors'

export default class TextSearchBar extends Component {
    constructor(props) {
        super(props);
    }
    
    setNewText(newText) {
        this.props.handleChangeText(newText);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                style={styles.textInput}
                placeholder='강좌명, 강좌번호 검색' 
                onChangeText={text => {
                    let f = this.setNewText.bind(this);
                    f(text);
                }}   
                ></TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightGrey,
        height: 70,
        width: '75%',
        borderRadius: 17,
        borderWidth: 1.5,
        borderColor: colors.purple,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 15
    },
});