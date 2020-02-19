import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ListItem } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Client } from 'bugsnag-react-native';

import Background from '../components/Background';
import { colors } from '../styles/colors';
import { config } from '../config';

const bugsnag = new Client(config.BUGSNAG_ID);

export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.recoverData = this.recoverData.bind(this);
        this.state = {
            lectures: []
        };
    }

    async recoverData() {
        try {
            lecturesArr = await AsyncStorage.getItem('lectures');
            if (lecturesArr) {
                this.setState({
                    lectures: JSON.parse(lecturesArr)
                });
            }
            else {
                console.log('No lectures');
            }
        }
        catch(err) {
            bugsnag.notify(err);
        }
    }

    componentDidMount() {
        // this.recoverData();
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Background></Background>
                <View style={styles.container}>
                    {/* <FlatList
                    style={{flex: 1, width: '100%'}}
                    data={ this.state.lectures.map(lecture => {
                        return { key: lecture['교과목명'], number: lecture['수강신청인원'] }
                    }) }
                    renderItem={ ({item}) => <Text style={styles.listItem}>강좌명: {item.key}, 인원수: {item.number}</Text> }
                    extraData={this.state}
                    ></FlatList> */}
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.extraLightPurple,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    listItem: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: colors.black,
        width: '100%'
    }
});