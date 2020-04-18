import React, { Component } from 'react'
import { AppState, Text, View, StyleSheet, Image, ScrollView, Alert, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Client } from 'bugsnag-react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

import { colors } from '../styles/colors';
import { config } from '../config';

import AddLectureBtn from '../components/AddLectureBtn';
import DeleteAllLecturesBtn from '../components/DeleteAllLecturesBtn';
import HomeLecture from '../components/HomeLecture';
import SeasonYearPicker from '../components/SeasonYearPicker';
import HeaderBtn from '../components/HeaderBtn';
import { createKeyboardAwareNavigator } from 'react-navigation';

const bugsnag = new Client(config.BUGSNAG_ID);

export default class MyLectures extends Component {            
    constructor(props) {
        super(props);
        this.updateLectures = this.updateLectures.bind(this);
        this.updateAllLectures = this.updateAllLectures.bind(this);
        this.navigateToSearch = this.navigateToSearch.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.storeData = this.storeData.bind(this);
        this.recoverData = this.recoverData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.deleteLectures = this.deleteLectures.bind(this);
        this.deleteLectureAlert = this.deleteLectureAlert.bind(this);
        this.navigateToLectureInfo = this.navigateToLectureInfo.bind(this);
        this.deleteAllLectures = this.deleteAllLectures.bind(this);
        this.storeSeasonYear = this.storeSeasonYear.bind(this);
        this.setSeasonYear = this.setSeasonYear.bind(this);
        this.loadSeasonYear = this.loadSeasonYear.bind(this);
        this.showPickSeasonYear = this.showPickSeasonYear.bind(this);
        this.hidePickSeasonYear = this.hidePickSeasonYear.bind(this);
        
        this.state = {
            lectures: [],
            appState: AppState.currentState,
            pickSeasonYear: true,
            season: null,
            year: null
        };
    }

    componentDidMount() {
        /*
        Checks if app is closed & restores data after every startup
        */
        AppState.addEventListener('change', this.handleAppStateChange);
        // Allow react navigation to use function this.showPickSeasonYear and states season, year
        this.props.navigation.setParams({
            showPickSeasonYear: this.showPickSeasonYear,
        });
        this.loadSeasonYear();
        this.recoverDataAsync().then(() => {
            console.log('hi');
            this.updateAllLectures();
        });
    }

    updateLectures(lectureData) {
        if (lectureData) {
            this.setState({
                lectures: [...this.state.lectures, lectureData]
            });
            this.storeData();
        }

    }

    async updateAllLectures() {
        const lecturesToBeUpdated = [];

        const lectureFutures = this.state.lectures.map(lectureData => {
            return new Promise(async (res, rej) => {
                try {
                    const response = await fetch(config.SNUSCRAPER_API_URI + `/api/lectures/lectureId/${lectureData['_id']}`);
                    if (response.status === 200) {
                        const newLectureData = await response.json();
                        lecturesToBeUpdated.push(newLectureData[0]);
                        res();
                    }
                    else { rej() }
                }
                catch(err) {
                    bugsnag.notify(err);
                    rej();
                }
            });
        });

        try {
            // Wait for all lectures to update
            await Promise.all(lectureFutures);

            this.setState({
                lectures: lecturesToBeUpdated
            });
            this.storeData();
        }
        catch(err) {
            showMessage({
                message: '강좌를 새로 업데이트 하지 못했습니다.',
                type: 'warning'
            });
        }
    }

    async deleteLectures(lectureData) {
        try {
            if (lectureData) {
                status = await this.deleteLectureAlert();
                if (status === true) {
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
                }
                else { return; }    
            }
        }
        catch(err) {            
            showMessage({
                message: '오류가 발생했습니다. 다시 시도해주세요.',
                type: 'warning'
            });
            return bugsnag.notify(err);
        }

        // Deletes lecture no matter what
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

    async deleteAllLectures() {
        try {
            status = await this.deleteLectureAlert();
            if (status === true) {
                token = await AsyncStorage.getItem('fcmToken');
                await Promise.all(this.state.lectures.map(lectureData => {
                    fetch(config.SNUSCRAPER_API_URI + '/api/lectures/delete/', {
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
                }));
            }
            else { return; }
        }
        catch(err) {
            showMessage({
                message: '오류가 발생했습니다. 다시 시도해주세요.',
                type: 'warning'
            });
            return bugsnag.notify(err);
        }

        this.setState({
            lectures: []       
        });

        this.storeData();

        showMessage({
            message: '강좌들이 성공적으로 삭제되었습니다.',
            type: 'info'
        });
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

    async storeSeasonYear() {
        try {
            await AsyncStorage.setItem('seasonYear', JSON.stringify([
                this.state.season,
                this.state.year
            ]));
        }
        catch(err) {
            return bugsnag.notify(err);
        }        
    }

    // TODO: Load seasonYear from server if not stored on device
    async loadSeasonYear() {
        try {
            const savedSeasonYear = await AsyncStorage.getItem('seasonYear');
            const seasonYear = JSON.parse(savedSeasonYear);
            if (seasonYear[0] !== null && seasonYear[1] !== null) {
                this.setSeasonYear(seasonYear[0], seasonYear[1]);
            }
        }
        catch(err) {
            showMessage({
                message: '학기정보를 읽어오지 못했습니다. 앱을 종료했다가 다시 시도해주세요.',
                type: 'error'
            });
            return bugsnag.notify(err);
        }
    }

    setSeasonYear(lecturesSeason, lecturesYear) {
        // Change component's season, year state and update navigation's season, year accordingly
        this.setState({
            season: lecturesSeason,
            year: lecturesYear
        }, () => {
            this.props.navigation.setParams({
                season: this.state.season,
                year: this.state.year
            });
        });
    }

    showPickSeasonYear() {
        this.setState({
            pickSeasonYear: true
        });
    }
    
    hidePickSeasonYear() {
        this.setState({
            pickSeasonYear: false
            });
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

    recoverDataAsync = () => {
        return new Promise(async (res, rej)=> {
            try {
                const lecturesArr = await AsyncStorage.getItem('lectures');
                if (lecturesArr) {
                    this.setState({
                        lectures: JSON.parse(lecturesArr)
                    });
                    res();
                }
                else {
                    console.log('No lectures');
                    rej();
                }
            }
            catch(err) {
                rej();
                bugsnag.notify(err);
            }
        });
    }

    updateData(newData) {
        const updatedLectures = [];
        this.state.lectures.forEach(lecture => {
            if (lecture['_id'] === newData['_id']) {
                updatedLectures.push(newData);
            }
            else {
                updatedLectures.push(lecture);
            }
        });

        this.setState({ lectures: updatedLectures }, ()=> {
            this.storeData();
        });
    }

    handleAppStateChange(nextAppState) {
        /*
        Save lectures data when app is closed
        */
        
        if (this.state.appState=='active' && nextAppState.match(/inactive|background/)) {
            console.log('Went from active to inactive');
            this.storeData();
            this.storeSeasonYear();
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
                        {
                            this.state.lectures.length > 0
                            ?   <TouchableHighlight onPress={this.deleteAllLectures} style={styles.deleteAllBtn}>
                                    <Text style={styles.deleteAllBtnText}>강좌 모두 삭제하기</Text>
                                </TouchableHighlight>
                            : null
                        }
                    </View>
                </ScrollView>
                { 
                    this.state.pickSeasonYear 
                    ?   <SeasonYearPicker hidePickSeasonYear={this.hidePickSeasonYear} setSeasonYear={this.setSeasonYear} style={styles.pickerContainer} year={2020} season={'1학기'}></SeasonYearPicker>
                    : null
                }
            </View>
        )
    }

    // static headerTitle = Platform.OS === 'android' ?
    //     [
    //         <Icon name='notifications-active' style={{ color: colors.yellow, fontSize: 30 }}></Icon>,
    //         <Text style={{ fontWeight: 'bold', fontSize: 22 }}>내 강좌</Text>
    //     ]
    //     :
    //     <Icon name='notifications-active' size={33} style={{ color: colors.yellow }}></Icon>

    static headerStyle = Platform.OS === 'android' ?
    {
        height: 60,
        backgroundColor: colors.white
    } :
    {
        backgroundColor: colors.white
    }


    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <HeaderBtn pressHandler={navigation.getParam('showPickSeasonYear')} height={30} text={`${navigation.getParam('year')} ${navigation.getParam('season')}`} icon={<Icon name='arrow-drop-down' size={30} style={{ color: colors.yellow }}></Icon>}></HeaderBtn>,
            headerStyle: this.headerStyle
        };
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

    // pickerContainer: {
    //     position: 'absolute',
    //     bottom: 0
    // },

    deleteAllBtn: {
        width: '100%',
        height: 50,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: colors.red,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    deleteAllBtnText: {
        color: colors.white,
        fontSize: 20
    },

    buttonContainer: {
        
    },

    lectures: {
        marginTop: 10
    },

    lecture: {
        marginTop: 10
    }
});