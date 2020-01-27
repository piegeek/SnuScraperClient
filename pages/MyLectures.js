import React, { Component } from 'react'
import { AppState, Text, View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Client } from 'bugsnag-react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

import { colors } from '../styles/colors';
import { config } from '../config';

import AddLectureBtn from '../components/AddLectureBtn'
import HomeLecture from '../components/HomeLecture'

const bugsnag = new Client(config.BUGSNAG_ID);

export default class MyLectures extends Component {            
    constructor(props) {
        super(props);
        this.updateLectures = this.updateLectures.bind(this);
        this.navigateToSearch = this.navigateToSearch.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.storeData = this.storeData.bind(this);
        this.recoverData = this.recoverData.bind(this);
        this.updateData = this.recoverData.bind(this);
        this.deleteLectures = this.deleteLectures.bind(this);
        this.deleteLectureAlert = this.deleteLectureAlert.bind(this);
        this.navigateToLectureInfo = this.navigateToLectureInfo.bind(this);
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
            this.storeData();
        }

    }

    async deleteLectures(lectureData) {
        try {
            if (lectureData) {
                status = await this.deleteLectureAlert();
                if (status == true) {
                    token = await AsyncStorage.getItem('fcmToken');                    
                    await fetch(config.SNUSCRAPER_API_URI + '/api/lectures/delete/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            lectureId: lectureData['_id'],
                            userId: token
                        })
                    });

                    const newLecturesArr = this.state.lectures.filter(lecture => lecture['_id'] != lectureData['_id']);
                    this.setState({
                        lectures: newLecturesArr       
                    });

                    this.storeData();

                    showMessage({
                        message: '강좌가 성공적으로 삭제되었습니다.',
                        type: 'info'
                    });
                }
                else { return; }    
            }
        }
        catch(err) {
            showMessage({
                message: '오류가 발생했습니다. 다시 시도해주세요.',
                type: 'warning'
            });
            bugsnag.notify(err);
        }
    }

    deleteLectureAlert() {
        return new Promise((res, rej) => {
            Alert.alert(
                '강좌 삭제',
                '강좌를 삭제하시겠습니까?',
                [
                    { text: '확인', onPress: () => res(true) },
                    { text: '취소', onPress: () => res(false) }
                ],
                { cancelable: true }
            );
        })
    }

    navigateToSearch() {
        this.props.navigation.navigate('Search', { updateLectures: this.updateLectures });
    }

    navigateToLectureInfo(lecture) {
        this.props.navigation.navigate('LectureInfo', { lectureData: lecture });
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
        .catch(err => bugsnag.notify(err))
    }

    updateData(newData) {
        const unchangedLectures = this.state.lectures.filter(lecture => lectures['_id'] !== newData['_id']);
        this.setState({
            lectures: [...unchangedLectures, newData]
        });
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
                                    <View key={lecture['_id']} style={styles.lecture}>
                                        <HomeLecture
                                        lectureData={lecture}
                                        deleteLectures={this.deleteLectures}
                                        updateData={this.updateData}
                                        navigateToLectureInfo={this.navigateToLectureInfo}
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
            style={{ fontWeight: 'bold', fontSize: 22 }}
            >내 강좌</Text>
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