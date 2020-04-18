import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

import { colors } from '../styles/colors';

export default class FullWidthBtn extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
        this.state = {
            containerStyle: this.props.containerStyle,
            buttonStyle: this.props.buttonStyle,
            buttonTextStyle: this.props.buttonTextStyle
        };
    }
    
    handlePress(e) {
        this.props.handlePress();
    }
    
    render() {
        return (
            <TouchableHighlight
            onPress={this.handlePress}
            style={ this.state.containerStyle || {
                height: 45,
                width: this.props.width,
            }}
            >
                <View
                style={ this.state.buttonStyle || {
                    backgroundColor: this.props.color,
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <Text style={ this.state.buttonTextStyle || styles.buttonText}>{ this.props.text }</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 13
    }
});