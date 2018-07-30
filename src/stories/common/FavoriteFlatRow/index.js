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
import FlatRow from "../FlatRow"

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  onSave: Function;
}

class FavoriteFlatRow extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

      this.state = {
          favorite: this.checkIfFavorite(props.favoriteFlats)
      };
  }

    checkIfFavorite = (props) => {
        if (props) {
            let flatId = this.props.flat.id;

            let collet = props.filter(flat => {
                let id = flat.id
                return flatId === id;
            })

            return collet.length > 0;
        } else {
            return false;
        }
    }

    manageFavoriteState = () => {
        if(this.state.favorite){
            this.props.removeFavoriteFlat(this.props.flat.id)
            Toast.show({
                text: "Удалено из избранного",
                position: 'bottom',
                buttonText: 'Скрыть',
                duration: 1500
            })
        } else {
            this.props.addFavoriteFlat(this.props.flat)
            Toast.show({
                text: "Добавлено в избранное",
                position: 'bottom',
                buttonText: 'Скрыть',
                duration: 1500
            })
        }
        this.setState({
            favorite: !this.state.favorite
        });
    };

  render() {
    return (
        <View key={this.props.index}>
          <Button transparent
                  rounded
                  style={{zIndex: 99999, position:'absolute', top: 20, right: 20}}
                  onPress={() => this.manageFavoriteState()}
          >
            {this.state.favorite ?
              <Icon
                name="md-heart"
                style={{ fontSize: 28, color: "#ff5367", zIndex: 99999 }}
              /> :
              <Icon
                name="md-heart-outline"
                style={{ fontSize: 28, color: "#FFFFFF", zIndex: 99999 }}
              />
            }
          </Button>
          <FlatRow key={this.props.index} flat={this.props.flat} onRowPressed={this.props.onRowPressed}/>
        </View>
    );
  }
}


export default FavoriteFlatRow;
