import * as React from "react";
import {
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Thumbnail,
  Container,
  Form,
  Input,
  Picker,
  Item as FormItem
} from "native-base";
import { TextField } from "react-native-material-textfield";
import ToggleButton from "./components/ToggleButton";
import MapView from 'react-native-maps';

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
  Alert
} from "react-native";
const Item = Picker.Item;

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  img: string;
  rate: ?number;
  comment: ?string;
  onSave: Function;
}

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ROOM_ENUM = {
    ONE: "ONE",
    TWO: "TWO",
    THREE: "THREE",
    FOUR_OR_MORE: "FOUR_OR_MORE"
};
let id = 0;

class Filter extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      polygons: this.props.filter.coordinates,
      editing: null,
      creatingHole: false,
      minPrice: this.props.filter.minPrice,
      maxPrice: this.props.filter.maxPrice,
      rooms: this.props.filter.rooms,
      oneRoom: this.props.filter.rooms.includes(ROOM_ENUM.ONE),
      twoRooms: this.props.filter.rooms.includes(ROOM_ENUM.TWO),
      threeRooms: this.props.filter.rooms.includes(ROOM_ENUM.THREE),
      fourOrMore: this.props.filter.rooms.includes(ROOM_ENUM.FOUR_OR_MORE),
      coordinates: [],
      selectedOwnerType: "OWNER_AND_AGENT",
      selectedSubway: "ANY_SUBWAY",
      mapScrollEnabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.setState({
        minPrice: nextProps.filter.minPrice,
        maxPrice: nextProps.filter.maxPrice,
        rooms: nextProps.filter.rooms,
        oneRoom: nextProps.filter.rooms.includes(ROOM_ENUM.ONE),
        twoRooms: nextProps.filter.rooms.includes(ROOM_ENUM.TWO),
        threeRooms: nextProps.filter.rooms.includes(ROOM_ENUM.THREE),
        fourOrMore: nextProps.filter.rooms.includes(ROOM_ENUM.FOUR_OR_MORE),
        polygons: nextProps.filter.coordinates
        // selectedOwnerType: nextProps.filter.selectedOwnerType,
        // selectedSubway: nextProps.filter.selectedOwnerType
      });
    }
  }

  finish() {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false
    });
    // console.log(this.state.editing)
  }

  createHole() {
    const { editing, creatingHole } = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []]
        }
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes
          }
        });
      }
      this.setState({ creatingHole: false });
    }
  }

  onPress(e) {
    if(this.state.mapScrollEnabled){
        const { editing, creatingHole } = this.state;
        if (!editing) {
            this.setState({
                editing: {
                    id: id++,
                    coordinates: [e.nativeEvent.coordinate],
                    holes: []
                }
            });
        } else if (!creatingHole) {
            this.setState({
                editing: {
                    ...editing,
                    coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
                }
            });
        } else {
            const holes = [...editing.holes];
            holes[holes.length - 1] = [
                ...holes[holes.length - 1],
                e.nativeEvent.coordinate
            ];
            this.setState({
                editing: {
                    ...editing,
                    id: id++, // keep incrementing id to trigger display refresh
                    coordinates: [...editing.coordinates],
                    holes
                }
            });
        }
    }
    // console.log(this.state.editing)
  }

  onValueChanged = value => {
    this.setState({
      selectedOwnerType: value
    });
  };

  onSubwayChanged = value => {
    this.setState({
      selectedSubway: value
    });
  };

  getRoomsNumber = (status, room) => {
    let roomsNum = this.state.rooms;

    if (status && !roomsNum.includes(room)) {
      roomsNum.push(room);
    } else if (!status && roomsNum.includes(room)) {
      const index = roomsNum.indexOf(room);
      roomsNum.splice(index, 1);
    }

    switch(room){
        case ROOM_ENUM.ONE:
          this.setState({oneRoom: status});
          break;
        case ROOM_ENUM.TWO:
          this.setState({twoRooms: status});
          break;
        case ROOM_ENUM.THREE:
          this.setState({threeRooms: status});
          break;
        case ROOM_ENUM.FOUR_OR_MORE:
          this.setState({fourOrMore: status});
          break;
    }

    this.setState({
      rooms: roomsNum
    });
    // console.log(roomsNum)
  };

  reset = () => {
    // if(this.state.minPrice==="" && this.state.maxPrice==="" && )

    Alert.alert("Подтвердите", "Вы действительно хотите очистить фильтр?", [
      {
        text: "Отменить",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Да",
        onPress: () => {
          this.setState({
            polygons: [],
            editing: null,
            creatingHole: false,
            minPrice: "",
            maxPrice: "",
            rooms: [],
            coordinates: [],
            oneRoom: false,
            twoRooms: false,
            threeRooms: false,
            fourOrMore: false,
            // selectedOwnerType: 'OWNER_AND_AGENT',
            // selectedSubway: 'ANY_SUBWAY'
          });
        }
      }
    ]);

    // this.setState({
    //     polygons: [],
    //     editing: null,
    //     creatingHole: false,
    //     minPrice: "",
    //     maxPrice: "",
    //     rooms: [],
    //     coordinates: [],
    //     // selectedOwnerType: 'OWNER_AND_AGENT',
    //     // selectedSubway: 'ANY_SUBWAY'
    // });
  };

  onFilterSaved = () => {
    let filter = {
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      rooms: this.state.rooms,
      owner: this.state.selectedOwnerType,
      subway: this.state.selectedSubway,
      coordinates: this.state.polygons
    };
    this.props.onAddFilter(filter);
    // this.props.onFetchFilter();
    console.log(filter)
    this.props.navigation.goBack();
  };

  resetMap = () => {
      this.setState({
          polygons: [],
          editing: null,
          creatingHole: false,
          coordinates: [],
      });
  }

  onEditHandler = () => {
      this.setState({
          mapScrollEnabled: !this.state.mapScrollEnabled,
      });

      if(this.state.mapScrollEnabled && this.state.editing !== null && this.state.editing.coordinates.length > 0){
          // console.log(this.state.editing)
          // console.log(this.state.polygons)


          const { polygons } = this.state.polygons ? this.state : []
          const { editing } = this.state.editing ? this.state : [];
          this.setState({
              polygons: [...polygons, editing],
              editing: null,
              creatingHole: false
          });
          // console.log(this.state.editing)
      }
  }

  removeMarker = (index) => {
      let arr = this.state.editing.coordinates.slice();
      let copy = Object.assign({}, this.state.editing);
      arr.splice(index, 1);
      copy.coordinates = arr;
      //
      this.setState({
          editing: copy,
      });
      if(copy.coordinates.length===0){
          this.setState({
              editing: null,
          });
      }
      //console.log(arr)
      console.log(copy)
      // console.log(this.state.editing)
      // console.log(copy)
  }

  render() {
    // console.log("render", this.props.filter);
    const mapOptions = {
      scrollEnabled: this.state.mapScrollEnabled
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }

    let { minPrice, maxPrice, editing } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="arrow-back"
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title>Фильтр</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name="checkmark"
                style={{ fontSize: 28 }}
                onPress={this.onFilterSaved}
              />
            </Button>
            <Button transparent>
              <Icon
                name="trash"
                style={{ fontSize: 28 }}
                onPress={this.reset}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#c7ccd7",
                    width: width * 0.9
                  }}
                >
                  <Text style={{ fontSize: 20, padding: 5, color: "#8c919c" }}>
                    Цена
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                >
                  <TextField
                    label="Минимальная цена"
                    value={minPrice}
                    containerStyle={{ paddingRight: 10, width: width * 0.45 }}
                    animationDuration={50}
                    keyboardType={"numeric"}
                    maxLength={5}
                    onChangeText={minPrice => this.setState({ minPrice })}
                  />
                  <TextField
                    label="Максимальная цена"
                    value={maxPrice}
                    containerStyle={{ paddingLeft: 10, width: width * 0.45 }}
                    animationDuration={50}
                    keyboardType={"numeric"}
                    maxLength={5}
                    onChangeText={maxPrice => this.setState({ maxPrice })}
                  />
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center", paddingTop: 10 }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#c7ccd7",
                    width: width * 0.9
                  }}
                >
                  <Text style={{ fontSize: 20, padding: 5, color: "#8c919c" }}>
                    Количество комнат
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: width * 0.9,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ToggleButton
                    onColor={"#3f51b5"}
                    effect={"pulse"}
                    status={this.state.oneRoom}
                    _onPress={status => {
                      this.getRoomsNumber(status, ROOM_ENUM.ONE);
                    }}
                    text="1"
                  />
                  <ToggleButton
                    onColor={"#3f51b5"}
                    effect={"pulse"}
                    status={this.state.twoRooms}
                    _onPress={status => {
                      this.getRoomsNumber(status, ROOM_ENUM.TWO);
                    }}
                    text="2"
                  />
                  <ToggleButton
                    onColor={"#3f51b5"}
                    effect={"pulse"}
                    status={this.state.threeRooms}
                    _onPress={status => {
                      this.getRoomsNumber(status, ROOM_ENUM.THREE);
                    }}
                    text="3"
                  />
                  <ToggleButton
                    onColor={"#3f51b5"}
                    effect={"pulse"}
                    status={this.state.fourOrMore}
                    _onPress={status => {
                      this.getRoomsNumber(status, ROOM_ENUM.FOUR_OR_MORE);
                    }}
                    text="4+"
                  />
                </View>
              </View>
              {/*<View style={{flex: 1, alignItems: 'center', paddingTop: 10}}>*/}
              {/*<View style={{borderBottomWidth: 1, borderColor: '#c7ccd7', width: width*0.9}}>*/}
              {/*<Text style={{fontSize: 20, padding: 5, color: '#8c919c'}}>Тип объявлений</Text>*/}
              {/*</View>*/}
              {/*<View style={{flex: 1, width: width*0.9}}>*/}
              {/*<Picker style={{ color: '#8c919c', backgroundColor: '#f5f5f5' }}*/}
              {/*iosHeader="Выбрать"*/}
              {/*placeholder="Выбрать"*/}
              {/*mode="dropdown"*/}
              {/*enabled={false}*/}
              {/*selectedValue={this.state.selectedOwnerType}*/}
              {/*onValueChange={this.onValueChanged}*/}
              {/*>*/}
              {/*<Item label="Не важно" value="ANY" />*/}
              {/*<Item label="Только собственник" value="OWNER" />*/}
              {/*<Item label="Собственник + агентства" value="OWNER_AND_AGENT" />*/}
              {/*</Picker>*/}
              {/*</View>*/}
              {/*</View>*/}
              {/*<View style={{flex: 1, alignItems: 'center', paddingTop: 10}}>*/}
              {/*<View style={{borderBottomWidth: 1, borderColor: '#c7ccd7', width: width*0.9, }}>*/}
              {/*<Text style={{fontSize: 20, padding: 5, color: '#8c919c'}}>Метро</Text>*/}
              {/*</View>*/}
              {/*<View style={{flex: 1, width: width*0.9}}>*/}
              {/*<Picker style={{ color: '#8c919c', backgroundColor: '#f5f5f5' }}*/}
              {/*iosHeader="Выбрать"*/}
              {/*placeholder="Выбрать"*/}
              {/*mode="dropdown"*/}
              {/*enabled={false}*/}
              {/*selectedValue={this.state.selectedSubway}*/}
              {/*onValueChange={this.onSubwayChanged}*/}
              {/*>*/}
              {/*<Item label="Не важно" value="ANY_SUBWAY" />*/}
              {/*<Item label="Возле метро" value="NEAR_SUBWAY" />*/}
              {/*<Item label="Московская линия" value="M_SUBWAY" />*/}
              {/*<Item label="Автозаводская линия" value="A_SUBWAY" />*/}
              {/*</Picker>*/}
              {/*</View>*/}
              {/*</View>*/}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#aaafba",
                    width: width * 0.9,
                    alignSelf: "center"
                  }}
                >
                  {/*3f51b5*/}
                  <Text style={{ fontSize: 20, padding: 5, color: "#8c919c" }}>
                    Местоположение на карте
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', paddingTop: 5, paddingBottom: 5,
                    alignItems: "center", justifyContent: 'space-between'}}>
                  <View style={{left: width*0.05, width: width*0.4,}}>
                      {this.state.mapScrollEnabled ?
                          <Button rounded bordered small style={{width: '100%', justifyContent: 'center'}}
                                  onPress={() => this.onEditHandler()}>
                            <Text>Сохранить область</Text>
                          </Button> :
                          <Button rounded bordered small style={{width: '100%', justifyContent: 'center'}}
                                  onPress={() => this.onEditHandler()}>
                            <Text>Выделить область</Text>
                          </Button>
                      }

                  </View>
                  <View style={{right: width*0.05, width: width*0.4,}}>
                      {this.state.polygons && this.state.polygons.length > 0 || this.state.editing !== null ?
                          <Button rounded bordered small style={{width: '100%', justifyContent: 'center'}}
                                  onPress={() => this.resetMap()}>
                            <Text>Очистить область</Text>
                          </Button> :
                          <Button disabled rounded bordered small style={{width: '100%', justifyContent: 'center'}}
                                  onPress={() => this.resetMap()}>
                            <Text>Очистить область</Text>
                          </Button>
                      }
                  </View>
                </View>
                <MapView
                  style={{
                    flex: 1,
                    width: width * 0.99,
                    height: height * 0.7,
                    alignSelf: "center"
                  }}
                  initialRegion={{
                    latitude: 53.902863,
                    longitude: 27.551579,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                  }}
                  showsUserLocation={true}
                  showsTraffic={false}
                  loadingEnabled={true}
                  // scrollEnabled
                  onPress={e => this.onPress(e)}
                  {...mapOptions}
                >
                  {editing !== null
                    ? editing.coordinates.map((obj, index) => (
                        <MapView.Marker
                          key={index}
                          coordinate={{
                            latitude: obj.latitude,
                            longitude: obj.longitude
                          }}
                          // onPress={() => console.log(index)}
                          image={require("../../../../assets/images/pin.png")}
                          onCalloutPress={() => this.removeMarker(index)}
                        >
                          <MapView.Callout>
                            <View>
                                <Text>Удалить</Text>
                            </View>
                          </MapView.Callout>
                        </MapView.Marker>
                      ))
                    : null}
                  {this.state.polygons && this.state.polygons.map(polygon => (
                    <MapView.Polygon
                      key={polygon.id}
                      coordinates={polygon.coordinates}
                      holes={polygon.holes}
                      strokeColor="#F00"
                      fillColor="rgba(255,0,0,0.5)"
                      strokeWidth={2}
                    />
                  ))}
                  {this.state.editing && (
                    <MapView.Polygon
                      key={this.state.editing.id}
                      coordinates={this.state.editing.coordinates}
                      holes={this.state.editing.holes}
                      strokeColor="#000"
                      fillColor="rgba(255,0,0,0.5)"
                      strokeWidth={2}
                    />
                  )}
                </MapView>
                <View style={styles.buttonContainer}>
                  {/*{this.state.editing && (*/}
                    {/*<TouchableOpacity*/}
                      {/*onPress={() => this.createHole()}*/}
                      {/*style={[styles.bubble, styles.button]}*/}
                    {/*>*/}
                      {/*<Text>*/}
                        {/*{this.state.creatingHole ? "Finish Hole" : "Create Hole"}*/}
                      {/*</Text>*/}
                    {/*</TouchableOpacity>*/}
                  {/*)}*/}
                  {/*{this.state.editing && (*/}
                    {/*<TouchableOpacity*/}
                      {/*onPress={() => this.finish()}*/}
                      {/*style={[styles.bubble, styles.button]}*/}
                    {/*>*/}
                      {/*<Text>Finish</Text>*/}
                    {/*</TouchableOpacity>*/}
                  {/*)}*/}
                </View>
                {/*<Button bordered style={{alignSelf: 'baseline'}}>*/}
                {/*<Icon name='remove' />*/}
                {/*</Button>*/}
                {/*<View style={{flex: 1, }}>*/}
                {/*<TextField*/}
                {/*label='Кол-во комнат'*/}
                {/*value={maxPrice}*/}
                {/*containerStyle={{paddingLeft: 10}}*/}
                {/*animationDuration={50}*/}
                {/*onChangeText={ (maxPrice) => this.setState({ maxPrice }) }*/}
                {/*/>*/}
                {/*</View>*/}
                {/*<Button bordered style={{alignSelf: 'baseline'}}>*/}
                {/*<Icon name='add' />*/}
                {/*</Button>*/}
              </View>
            </ScrollView>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

export default Filter;
