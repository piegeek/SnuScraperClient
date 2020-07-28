import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { AppState, Text, View, StyleSheet, Image, ScrollView, Alert, TouchableHighlight, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Client } from 'bugsnag-react-native';

import { config } from '../config';

// Import components
import AddLectureBtn from '../components/AddLectureBtn';
import HomeLecture from '../components/HomeLecture';
import SeasonYearPicker from '../components/SeasonYearPicker';
import HeaderBtn from '../components/HeaderBtn';


// Import action creators
import { setAppStateActive, setAppStateInactive } from '../actions/appState';
import { addLecture, removeLecture } from '../actions/lectures';
import { setSeasonYear, pickSeasonYear } from '../actions/seasonYear';

// Import stylesheet
import MyLecturesStyles from '../styles/pageStyles/MyLecturesStyles';

const bugsnag = new Client(config.BUGSNAG_ID);
const styles = MyLecturesStyles;

const MyLectures = ({ navigation }) => (
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