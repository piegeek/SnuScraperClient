import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import TextSearchBar from './TextSearchBar'
import { colors } from '../styles/colors';
import { config } from '../config';

export default class TextSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
    
    handleChangeText(newText) {
        this.setState({
            text: newText 
        });
    }
    
    handlePress() {        
        console.log(this.state.text);
        fetch(config.SNUSCRAPER_API_URI + 'api/lectures/title/' + this.state.text)
        .then(data => data.json())
        .then(lectures => {
            this.props.getSearchResults(lectures);
        })
        .catch(err => console.error(err));    
    }
    

    render() {
        return (
            <View style={styles.searchBarContainer}>
                <TextSearchBar handleChangeText={this.handleChangeText.bind(this)}></TextSearchBar>
                <TouchableHighlight style={styles.submitButton} onPress={this.handlePress.bind(this)}>
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