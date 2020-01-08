import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { colors } from '../styles/colors'

export default class Button extends Component {    
    handlePress(e) {
        alert('Pressed');
    }
    
    render() {
        return (
            <TouchableHighlight
            onPress={this.handlePress}
            style={styles.container}>
                <View
                style={{
                    backgroundColor: this.props.color,
                    height: '100%',
                    width: '100%',
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.buttonText}>
                            { this.props.text }
                        </Text>
                        <Image
                        style={styles.buttonImage}
                        source={ this.props.imageUri }
                        >
                        </Image>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: 160,
        height: 45,
    },

    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 13
    },
    
    buttonImage: {
        resizeMode: 'contain',
        width: 25,
        height: 25
    }
});