import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { colors } from '../styles/colors';

import TextSearch from '../components/TextSearch';
import SearchLecture from '../components/SearchLecture';

export default class Search extends Component {
    static navigationOptions = {
        title: '강좌 검색'
    };
    
    constructor(props) {
        super(props);
        this.state = {
            lectures: [],
        };
    }

    emptyLectures() {
        this.setState({
            lectures: []
        });
    }
    
    getSearchResults(results) {
        this.emptyLectures.bind(this)();
        
        results.forEach(result => {
            this.setState({
                lectures: [...this.state.lectures, result]
            })
        });
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
                                return <SearchLecture
                                subjectName={lecture.교과목명}
                                subjectNumber={lecture.교과목번호}
                                ></SearchLecture>
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
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
