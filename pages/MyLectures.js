import React, { Component } from 'react'
import { AppState, Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import AddLectureBtn from '../components/AddLectureBtn'
import HomeLecture from '../components/HomeLecture'

import { colors } from '../styles/colors';

export default class MyLectures extends Component {            
    constructor(props) {
        super(props);
        this.updateLectures = this.updateLectures.bind(this);
        this.navigateToSearch = this.navigateToSearch.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.storeData = this.storeData.bind(this);
        this.recoverData = this.recoverData.bind(this);
        this.state = {
            lectures: [],
            appState: AppState.currentState
        };
    }

    componentDidMount() {
        /*
        Checks if app is closed & restores data after every startup
        */
        AppState.addEventListener('change', this.handleAppStateChange);
        this.recoverData();
    }

    updateLectures(lectureData) {
        if (lectureData) {
            this.setState({
                lectures: [...this.state.lectures, lectureData]
            });
        }
    }

    navigateToSearch() {
        this.props.navigation.navigate('Search', { updateLectures: this.updateLectures });
    }

    storeData() {
        AsyncStorage.setItem('lectures', JSON.stringify(this.state.lectures))
        .then(() => console.log('Lectures saved to local storage'))
    }

    recoverData() {
        AsyncStorage.getItem('lectures')
        .then(lecturesArr => {
            if (lecturesArr) {
                this.setState({
                    lectures: JSON.parse(lecturesArr)
                });
            }
            else {
                console.log('No lectures');
            }
        })
        .catch(err => console.error(err))
    }

    handleAppStateChange(nextAppState) {
        /*
        Save lectures data when app is closed
        */
        
        if (this.state.appState=='active' && nextAppState.match(/inactive|background/)) {
            console.log('Went from active to inactive');
            this.storeData();
        }
        this.setState({
            appState: nextAppState
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>                    
                    <View style={styles.buttonContainer}>
                        <AddLectureBtn onPress={this.navigateToSearch}></AddLectureBtn>
                    </View>

                    <View style={styles.lectures}>
                        {   
                            this.state.lectures.map(lecture => {
                                return (
                                    <View style={styles.lecture}>
                                        <HomeLecture
                                        lectureData={lecture}
                                        ></HomeLecture>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

    static navigationOptions = {
        title: [
            <Icon name='notifications-active' style={{ color: colors.yellow, fontSize: 30 }}></Icon>,
            <Text
            style={{ fontWeight: 'bold', fontSize: 25 }}
            >SNU</Text>
        ],
        headerStyle: {
            height: 60,
        },
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.extraLightPurple,
        padding: 11
    },
    
    header: {
        fontWeight: 'bold',
        fontSize: 35,
        color: colors.orange,
        textAlign: 'center',
    },

    buttonContainer: {
        marginTop: 10
    },

    lectures: {
        marginTop: 10
    },

    lecture: {
        marginTop: 10
    }
});