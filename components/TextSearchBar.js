import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from '../styles/colors';

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
                onSubmitEditing={this.props.handleEnterPressed}
                multiline={false}   
                ></TextInput>
                <Icon name='search' size={23} style={styles.searchIcon}></Icon>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightGrey,
        height: 50,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },

    searchIcon: {
        color: colors.yellow,
        position: 'absolute',
        left: 10
    },

    textInput: {
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 40
    },
});