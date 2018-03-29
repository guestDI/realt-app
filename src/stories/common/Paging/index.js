import * as React from "react";
import {
  Image,
  View,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
    Animated,
    TouchableWithoutFeedback
} from "react-native";

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
}

const { height, width } = Dimensions.get("window");

class Paging extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
  }

    // onPageIndicatorPress = idx => {
    //   this.props.onPageIndicatorPress(idx);
    // }

  render() {
      let { style, ...props } = this.props;

      let defaultStyle = {
          height: this.props.indicatorSize.height
      };

      let indicatorItemStyle = {
          width: this.props.indicatorSize.width,
          height: this.props.indicatorSize.height,
          borderRadius: this.props.indicatorSize.height / 2,
          marginLeft: 5,
          marginRight: 5
      };

      let indicatorStyle = {
          ...indicatorItemStyle,
          ...this.props.indicatorStyle,
          ...{
              backgroundColor: this.props.pageIndicatorTintColor
          }
      };

      let currentIndicatorStyle = {
          ...indicatorItemStyle,
          ...this.props.currentIndicatorStyle,
          ...{
              backgroundColor: this.props.currentPageIndicatorTintColor
          }
      };

      let pages = [];
      for (let i = 0; i < this.props.numberOfPages; i++) {
          pages.push(i);
      }

    return (
        this.props.hidesForSinglePage && pages.length <= 1 ? null : <View style={[styles.container, defaultStyle, style]}>
            {pages.map((el, i) => <TouchableWithoutFeedback key={i}>
                    <View style={i === this.props.currentPage ? currentIndicatorStyle: indicatorStyle} />
                </TouchableWithoutFeedback>
            )}
        </View>
    );
  }
}

// Paging.propTypes = {
//     numberOfPages: PropTypes.number.isRequired,
//     currentPage: PropTypes.number,
//     hidesForSinglePage: PropTypes.bool,
//     pageIndicatorTintColor: PropTypes.string,
//     currentPageIndicatorTintColor: PropTypes.string,
//     indicatorSize: PropTypes.object,
//     indicatorStyle: ViewPropTypes.style,
//     currentIndicatorStyle: ViewPropTypes.style,
//     onPageIndicatorPress: PropTypes.func
// }

Paging.defaultProps = {
    numberOfPages: 0,
    currentPage: 0,
    hidesForSinglePage: false,
    pageIndicatorTintColor: 'gray',
    currentPageIndicatorTintColor: 'white',
    indicatorSize: {width: 8, height: 8},
    indicatorStyle: {},
    currentIndicatorStyle: {},
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    }
});

export default Paging;
