import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
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
        this.state = {
            lectures: [] 
        };
    }

    componentDidMount() {
        /* 
        Add event listener to navigation prop so that lectures state is updated
        every time a lecture is added from the search page 
        */

        this.focusListener = this.props.navigation.addListener('didFocus', (data) => {
            if (data.state.params) {
                this.setState({
                    lectures: [...this.state.lectures, data.state.params]
                });
            }
        })

        AsyncStorage.getItem('lectures')
        .then(lecturesArr => {
            if (lecturesArr) {
                this.setState({
                    lectures: lecturesArr
                });
            }
        })
        .catch(err => console.error(err))
    }

    componentWillUnmount() {
        // Remove listener so that it can be used again
        this.focusListener.remove();
    }

    updateLectures(lectureData) {
        if (lectureData) {
            this.setState({
                lectures: [...this.state.lectures, lectureData]
            })
        }
    }

    navigateToSearch() {
        this.props.navigation.navigate('Search', { updateLectures: this.updateLectures });
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