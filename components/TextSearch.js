import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Client } from 'bugsnag-react-native';
import { showMessage, hideMessage } from "react-native-flash-message";


import TextSearchBar from './TextSearchBar'
import { colors } from '../styles/colors';
import { config } from '../config';

const bugsnag = new Client(config.BUGSNAG_ID);

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
    
    async handlePress() {        
        try {
            const uri = this.state.text.includes('.')
            ? config.SNUSCRAPER_API_URI + '/api/lectures/code/' + this.state.text
            : config.SNUSCRAPER_API_URI + '/api/lectures/title/' + this.state.text

            this.props.loadingHandler();
            const res = await fetch(uri);
            this.props.loadingHandler();

            if (res.status === 200) {
                const lectures = await res.json();
                this.props.getSearchResults(lectures);
            }
            else {
                return showMessage({
                    message: '강좌를 찾지 못했습니다. 다시 시도해주세요.',
                    type: 'warning'
                });
            }
        }
        catch (err) {
            bugsnag.notify(err);
        }
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