import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'

import { colors } from '../styles/colors';

export default class SeasonYearPicker extends Component {
    constructor(props) {
        super(props);
        this.seasonYearCombinator = this.seasonYearCombinator.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
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

    render() {
        return (
            <View>
                <Picker
                selectedValue={JSON.stringify(this.state)}
                style={styles.pickerStyle}
                onValueChange={this.valueChangeHandler}
                >
                    { this.seasonYearComb.map((comb, i) => <Picker.Item key={i} label={`${comb.year} ${comb.season}`} value={JSON.stringify(comb)}></Picker.Item>) }
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        backgroundColor: colors.white,
    }
});