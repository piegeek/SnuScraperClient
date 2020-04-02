import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'

import { colors } from '../styles/colors';

export default class SeasonYearPicker extends Component {
    constructor(props) {
        super(props);
        this.seasonYearCombinator = this.seasonYearCombinator.bind(this);
        this.state={
            season: this.props.season,
            year: this.props.year,
        };
        this.state.seasonYearComb = this.seasonYearCombinator();
    }

    seasonYearCombinator() {
        let seasonYearComb = [];
        const seasons = ['겨울학기', '2학기', '여름학기', '1학기'];
        
        for (let i = 0; i < 5; i++) {
            for (const _season of seasons) {
                
                seasonYearComb.push({
                    season: _season,
                    year: parseInt(this.state.year) - i
                });
            }
        }

        return seasonYearComb;
    }

    render() {
        return (
            <View>
                <Picker
                selectedValue={`${this.state.year}-${this.state.season}`}
                style={styles.pickerStyle}
                >
                    { this.state.seasonYearComb.map(comb => <Picker.Item key={`${comb.year}-${comb.season}`} label={`${comb.year} ${comb.season}`} value={comb}></Picker.Item>) }
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