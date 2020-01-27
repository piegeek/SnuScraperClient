import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Client } from 'bugsnag-react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

import { colors } from '../styles/colors';
import { config } from '../config'

import TextSearch from '../components/TextSearch';
import SearchLecture from '../components/SearchLecture';

const bugsnag = new Client(config.BUGSNAG_ID);

export default class Search extends Component {    
    constructor(props) {
        super(props);
        this.addLectureAlert = this.addLectureAlert.bind(this);
        this.loadingHandler = this.loadingHandler.bind(this);
        this.state = {
            lectures: [],
            loading: false
        };
    }

    emptyLectures() {
        // Remove all lectures after new data is fetched
        this.setState({
            lectures: []
        });
    }
    
    getSearchResults(results) {
        // Flushes all data in lectures state
        this.emptyLectures.bind(this)();

        // Save all object data for each lecture in lectures state
        results.forEach(result => {
            this.setState({
                lectures: [...this.state.lectures, result]
            })
        });
    }

    loadingHandler() {
        this.setState({
            loading: !this.state.loading
        });
    }

    async addLecture(lectureData) {
        /* 
        Add a new lecture to 'MyLectures' page and navigate to it 
        once add button on a 'SearchLecture' componenet is pressed 
        */
        
        try {
            if (lectureData) {
                status = await this.addLectureAlert();
                if (status == true) {
                    token = await AsyncStorage.getItem('fcmToken');                    
                    await fetch(config.SNUSCRAPER_API_URI + '/api/lectures/', {
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
                    console.log('POST REQUEST SENT TO SERVER');
                    showMessage({
                        message: '강좌 추가하기 완료',
                        type: 'info'
                    });
                    
                    this.props.navigation.getParam('updateLectures')(lectureData);
                    this.props.navigation.goBack();
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

    addLectureAlert() {
        return new Promise((res, rej) => {
            Alert.alert(
                '강좌 추가',
                '강좌를 추가하시겠습니까?',
                [
                    { text: '확인', onPress: () => res(true) },
                    { text: '취소', onPress: () => res(false) },
                ],
                { cancelable: true }
            );
        })
    }

    render() {
        return (            
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <View style={styles.textSearchContainer}>
                        <TextSearch loadingHandler={this.loadingHandler} getSearchResults={this.getSearchResults.bind(this)}></TextSearch>
                    </View>
                    <View>
                        { this.state.loading
                        ? <ActivityIndicator size='large' color={colors.purple}></ActivityIndicator>
                        : null
                        }
                    </View>

                    <View>
                        {
                            this.state.lectures.map(lecture => {
                                return (
                                    <SearchLecture
                                    key={lecture['_id']}
                                    lectureData={lecture}
                                    addLecture={this.addLecture.bind(this)}
                                    ></SearchLecture>
                                ) 
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

    static navigationOptions = {
        title: '강좌 검색'
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.extraLightPurple,
        padding: 11
    },

    textSearchContainer: {
        marginTop: 10
    }
});
