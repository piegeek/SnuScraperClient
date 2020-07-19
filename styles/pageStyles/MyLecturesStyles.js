import { StyleSheet } from 'react-native';
import { colors } from '../colors';

const MyLecturesStyles = StyleSheet.create({
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

export default MyLecturesStyles;