import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../styles/colors';

import TextSearch from '../components/TextSearch';
import SearchLecture from '../components/SearchLecture';

export default class Search extends Component {    
    constructor(props) {
        super(props);
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

    addLecture(lectureData) {
        /* 
        Add a new lecture to 'MyLectures' page and navigate to it 
        once add button on a SearchLecture componenet is pressed 
        */
        
        this.props.navigation.navigate('MyLectures', lectureData);
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
                                    subjectName={lecture['교과목명']}
                                    subjectNumber={lecture['교과목번호']}
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
