import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import TextSearchBar from './TextSearchBar'
import { colors } from '../styles/colors';

export default class TextSearch extends Component {
    handlePress() {
        alert('button pressed');
    }
    
    render() {
        return (
            <View style={styles.searchBarContainer}>
                <TextSearchBar></TextSearchBar>
                <TouchableHighlight style={styles.submitButton} onPress={this.handlePress}>
                    <Icon name='search' size={26} style={styles.searchIcon}></Icon>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submitButton: {
        height: 60,
        width: 60,
        borderRadius: 29,
        marginLeft: 14,
        backgroundColor: colors.purple,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchIcon: {
        color: colors.white,
    }
});