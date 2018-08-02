import * as React from "react";
import {
  Toast,
    Button,
    Icon
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
  TouchableWithoutFeedback
} from "react-native";
import FlatRow from "../../../../common/FlatRow"

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  onSave: Function;
}

class NotInterestedFlatRow extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

      this.state = {
          notInterested: this.checkIfNotInterested(props.notInterestedFlats)
      };
  }

    checkIfNotInterested = (props) => {
        let flatId = this.props.flat.id;

        if(props) {
            let collection = props.filter(flat => {
                let id = flat.id
                return flatId === id;
            })

            return collection.length > 0;
        }
    }

    manageNotInterestedState = () => {
        if(this.state.notInterested){
            this.props.removeNotInterestedFlat(this.props.flat.id)
            Toast.show({
                text: "Добавлено в общий список",
                position: 'bottom',
                buttonText: 'Скрыть',
                duration: 1500
            })
        } else {
            this.props.addNotInterestedFlat(this.props.flat)
            Toast.show({
                text: "Перемещено в 'не интересующие' ",
                position: 'bottom',
                buttonText: 'Скрыть',
                duration: 1500
            })
        }
        this.setState({
            notInterested: !this.state.notInterested
        });
    }

  render() {
    return (
        <View key={this.props.index}>
          <Button transparent
                  rounded
                  style={{zIndex: 99999, position:'absolute', top: 20, right: 20}}
                  onPress={() => this.manageNotInterestedState()}
          >
            {this.state.notInterested ?
                <Icon
                    active
                    style={{color: "#f0c217", zIndex: 9999, fontSize: 30}}
                    name="dislike" type="Foundation"
                /> :
                <Icon
                    name="dislike" type="Foundation"
                    style={{color: "#414141", zIndex: 9999, fontSize: 30}}
                />
            }
          </Button>
          <FlatRow key={this.props.index} flat={this.props.flat} onRowPressed={this.props.onRowPressed}/>
        </View>
    );
  }
}


export default NotInterestedFlatRow;
