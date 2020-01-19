import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { colors } from '../styles/colors';
import { config } from '../config'

import TextSearch from '../components/TextSearch';
import SearchLecture from '../components/SearchLecture';

export default class Search extends Component {    
    constructor(props) {
        super(props);
        this.addLectureAlert = this.addLectureAlert.bind(this);
        this.state = {
            lectures: [],
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
                    
                    this.props.navigation.getParam('updateLectures')(lectureData);
                    this.props.navigation.goBack();
                }
                else { return; }
            }
        }
        catch(err) {
            console.error(err);
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
                        <TextSearch getSearchResults={this.getSearchResults.bind(this)}></TextSearch>
                    </View>

                    <View>
                        {
                            this.state.lectures.map(lecture => {
                                return (
                                    <SearchLecture
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
