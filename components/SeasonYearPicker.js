import React, { Component } from 'react'
import { View, Picker, StyleSheet, Platform } from 'react-native'

import { colors } from '../styles/colors';

import FullWidthBtn from '../components/FullWidthBtn';

export default class SeasonYearPicker extends Component {
    constructor(props) {
        super(props);
        this.seasonYearCombinator = this.seasonYearCombinator.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
        this.valueConfirmHandler = this.valueConfirmHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.state={
            season: this.props.season,
            year: this.props.year,
        };

        this.seasonYearComb = this.seasonYearCombinator();
    }

    seasonYearCombinator() {
        let seasonYearComb = [];
        const seasons = ['겨울학기', '2학기', '여름학기', '1학기'];
        
        for (let i = 0; i < 5; i++) {
            for (const _season of seasons) {
                seasonYearComb.push({
                    season: _season,
                    year: parseInt(this.state.year) - i,
                });
            }
        }

        return seasonYearComb;
    }

    valueChangeHandler(itemValue) {
        const value = JSON.parse(itemValue);
        
        this.setState({
            season: value.season,
            year: value.year
        });
    }

    valueConfirmHandler() {
        this.props.setSeasonYear(this.state.season, this.state.year);
    }

    cancelHandler() {
        this.props.setPickSeasonYear(false);
    }

    render() {
        return (
            <View style={styles.pickerContainerStyle}>
                <Picker
                selectedValue={JSON.stringify(this.state)}
                style={styles.pickerStyle}
                onValueChange={this.valueChangeHandler}
                >
                    { this.seasonYearComb.map((comb, i) => <Picker.Item key={i} label={`${comb.year} ${comb.season}`} value={JSON.stringify(comb)}></Picker.Item>) }
                </Picker>
                <View style={styles.buttonContainer}>
                    <FullWidthBtn
                    color={colors.yellow}
                    text='취소'
                    width='50%'
                    handlePress={this.cancelHandler}
                    ></FullWidthBtn>
                    <FullWidthBtn
                    color={colors.orange}
                    text='선택완료'
                    width='50%'
                    handlePress={this.valueConfirmHandler}
                    ></FullWidthBtn>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerContainerStyle: {
        backgroundColor: colors.white
    },
    
    pickerStyle: {
        backgroundColor: colors.white,
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});