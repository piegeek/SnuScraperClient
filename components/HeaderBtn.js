import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { colors } from '../styles/colors';

export default class HeaderBtn extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(e) {
        this.props.pressHandler();
        // alert('hi');
    }
    
    render() {
        return (
            <TouchableOpacity 
            style={{
                height: this.props.height,
                borderRadius: 10,
            }}
            onPress={this.handlePress}
            >
                <View style={styles.container}>
                    { this.props.text ? <Text style={styles.buttonText}>{this.props.text}</Text> : null}
                    { this.props.icon ? this.props.icon : null }
                    {/* <Text style={styles.buttonText}>{this.props.text}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.yellow
    }
});