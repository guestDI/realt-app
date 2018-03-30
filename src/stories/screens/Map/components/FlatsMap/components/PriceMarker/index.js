import * as React from 'react';
// import PropTypes from 'prop-types';

import {
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';

class PriceMarker extends React.Component {
    render() {
        const { amount, style } = this.props;

        return (
            <View style={[styles.container]}>
                <Animated.View
                    style={styles.bubble}
                >
                    <Text style={styles.dollar}>$</Text>
                    <Text style={styles.amount}>{amount}</Text>
                </Animated.View>
                <View
                    style={styles.arrowBorder}
                />
                <View
                    style={styles.arrow}
                />
            </View>
        );
    }
}

// PriceMarker.propTypes = {
//     amount: PropTypes.number.isRequired,
//     selected: PropTypes.object.isRequired,
//     style: PropTypes.any,
// };

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#FF5A5F',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 3,
        borderColor: '#D23F44',
        borderWidth: 0.5,
    },
    // selectedBubble: {
    //     flex: 0,
    //     position: 'absolute',
    //     flexDirection: 'row',
    //     alignSelf: 'flex-start',
    //     backgroundColor: '#4da2ab',
    //     borderColor: '#007a87',
    //     paddingVertical: 2,
    //     paddingHorizontal: 4,
    //     borderRadius: 3,
    //     borderWidth: 0.5,
    // },
    dollar: {
        color: '#fff',
        fontSize: 10,
    },
    amount: {
        color: '#fff',
        fontSize: 13,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 4,
        borderTopColor: '#FF5A5F',
        alignSelf: 'center',
        marginTop: -9,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 4,
        borderTopColor: '#D23F44',
        alignSelf: 'center',
        marginTop: -0.5,
    },
    selectedArrow: {
        borderTopColor: '#4da2ab',

    },
    selectedArrowBorder: {
        borderTopColor: '#007a87',
    },
});

export default PriceMarker;
