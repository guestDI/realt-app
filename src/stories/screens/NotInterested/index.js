import * as React from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import {
  View,
  SectionList,
  FlatList,
  TouchableOpacity,
  Platform,
  NativeModules,
  Dimensions,
  ActivityIndicator,
    StatusBar
} from "react-native";
import NotInterestedFlats from './components/NotInterestedFlats/index'

export interface Props {
  navigation: any;
  list: any;
  loadMore: Function;
}
export interface State {
  monthPlus: number;
}

class NotInterested extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false
    };
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#a3a3a3' }}>
          <StatusBar
              barStyle={ 'dark-content'}
              backgroundColor={'#FFFFFF'}
              translucent={false}
          />
          <Left>
            <Button
                style={{zIndex: 9999}}
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
                transparent>
              <Icon
                style={{color: "#414141"}}
                active
                name="menu"
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#414141"}}>Не интересует</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <NotInterestedFlats
                navigation={this.props.navigation}
                list={this.props.notInterested}
                flatsList={this.props.flatsList}
                removeNotInterestedFlat={this.props.removeNotInterestedFlat}
            />
        </View>
      </Container>
    );
  }

}

export default NotInterested;
