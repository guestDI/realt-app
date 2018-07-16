import * as React from "react";
import {
  Text,
} from "native-base";

import {
  Image,
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Slider,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import * as Animatable from "react-native-animatable";
export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  onSave: Function;
}

const { height, width } = Dimensions.get("window");

class Popover extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
        optionsLocations: [],
        lastTimeoutId: null,
    };
  }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.status !== nextProps.status) {
    //         this.setState({
    //             status: nextProps.status,
    //         });
    //     }
    // }

  // _onPress() {
  //   this.props._onPress(!this.state.status);
  //   this.setState({ status: !this.state.status });
  //   switch (this.props.effect) {
  //     case "bounce":
  //       this.refs.view.bounce(800);
  //       break;
  //     case "flash":
  //       this.refs.view.flash(800);
  //       break;
  //     case "jello":
  //       this.refs.view.jello(800);
  //       break;
  //     case "pulse":
  //       this.refs.view.pulse(800);
  //       break;
  //   }
  // }

    // togglePopover = (index) => {
    //     let status = this.state.isPopoverVisible
    //
    //     this.setState({
    //         isPopoverVisible: !status,
    //         currentOptionPosition: Object.assign({}, this.state.optionsLocations[index]),
    //         currentOptionIndex: index
    //     })
    // }

    printFacility = facility => {
        switch (facility) {
            case "Телевизор":
                return require("../../../../../../assets/images/conditions/tv.png")
            case "Интернет":
                return require("../../../../../../assets/images/conditions/wifi.png")
            case "Плита":
                return require("../../../../../../assets/images/conditions/stove.png")
            case "Холодильник":
                return require("../../../../../../assets/images/conditions/fridge.png")
            case "Кондиционер":
                return require("../../../../../../assets/images/conditions/air-conditioner.png")
            case "Стиральная машина":
                return require("../../../../../../assets/images/conditions/washing-machine.png")
            case "Лоджия или балкон":
                return require("../../../../../../assets/images/conditions/balcony.png")
            case "Мебель":
                return require("../../../../../../assets/images/conditions/sofa.png")
            case "Кухонная мебель":
                return require("../../../../../../assets/images/conditions/kitchen.png")
        }
        // Мебель, Кухонная мебель, Плита, Холодильник, Стиральная машина, Телевизор, Интернет, Лоджия или балкон
    }

    onLayout = (event) => {
        let options = this.state.optionsLocations.slice()
        this.setState({
            optionsLocations: [...options, event.nativeEvent.layout]
        })
        //console.log(event.nativeEvent.layout)
    }

    togglePopover = () => {
      const {lastTimeoutId} = this.state;
      if (lastTimeoutId) {
          clearTimeout(lastTimeoutId);
      }
      this.setState({
          status: !this.state.status,
          lastTimeoutId: setTimeout(() => {
              this.setState({
                  status: false,
              })
          }, 1500)
      });

    }

  render() {
      let width = this.props.text.length > 12 ? this.props.text.length*6.6 : this.props.text.length > 6 ?
                    this.props.text.length*8 : this.props.text.length*10
      // if(this.props.optionLocation) {
      //     console.log('x', this.props.optionLocation.optionX)
      //     console.log('y', this.props.optionLocation.optionY)
      // }
    return (
        <View key={this.props.index}>
            <TouchableOpacity onPress={this.togglePopover} onLayout={this.onLayout} key={`${this.props.index}`}
                              activeOpacity={0.8} style={styles.iconContainer}>
                <Image
                    resizeMode="contain"
                    source={this.printFacility(this.props.cond)}
                    style={{height: 34, width: 34}}
                />
            </TouchableOpacity>
            {this.state.status ? <View
                ref="view"
                style={{
                    position: 'absolute',
                    left: this.props.optionPosition.x, top: -15,
                    paddingRight: 6,
                    paddingLeft: 6,
                    borderWidth: 1,
                    borderRadius: 5,
                    zIndex: 99999,
                    opacity: 0.9,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderColor: 'white',
                    shadowColor: '#777c87', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1,
                    backgroundColor: "#9499a4"
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 10,
                        paddingTop: 3,
                        paddingBottom: 3,

                    }}
                >
                    {this.props.text}
                </Text>
            </View> : null }

        </View>

    );
  }
}

const styles = StyleSheet.create({
    iconContainer: {
        margin: 8,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor: "#87b357c4",
        borderColor: "white",
    }
});

export default Popover;
