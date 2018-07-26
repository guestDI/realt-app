import * as React from "react";
import {
  Header,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Container,
  Picker,
    Footer,
    FooterTab
} from "native-base";
import { TextField } from "react-native-material-textfield";
import { Button as ButtonElement } from "react-native-elements";
import ToggleButton from "./components/ToggleButton";
import MapView from 'react-native-maps';
import { MINSK_COORDINATES } from '../../../utils/coordinates'
import { CheckBox } from 'react-native-elements'
import StationCheckbox from './components/StationCheckbox/index'
import Modal from 'react-native-modalbox';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Slider,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import  StationsModal from './components/StationsModal/index'
const Item = Picker.Item;
const subwaySelection = [
    {
        label:"Не важно",
        value:"ANY_SUBWAY"
    },
    {
        label:"Возле метро",
        value:"NEAR_SUBWAY"
    }
]

const radius = 1.5

const moscowLine = [
    {
      name: 'Малиновка',
      latitude: 53.849514766118595,
      longitude: 27.47477396132308,
      radiusInKm: radius
    },
    {
      name: 'Петровщина',
      latitude: 53.86409541550409,
      longitude: 27.48543534540238,
        radiusInKm: radius
    },
    {
      name: 'Михалово',
      latitude: 53.87697133829262,
      longitude: 27.497083671578253,
        radiusInKm: radius
    },
    {
      name: 'Грушевка',
      latitude: 53.88670159904609,
      longitude: 27.514727964062672,
        radiusInKm: radius
    },
    {
      name: 'Институт культуры',
      latitude: 53.8851207418056,
      longitude: 27.539060567245883,
        radiusInKm: radius
    },
    {
      name: 'Площадь Ленина',
        latitude: 53.89478215031429,
        longitude: 27.548201535568637,
        radiusInKm: radius
    },
    {
      name: 'Октябрьская',
      latitude: 53.90234279419695,
      longitude: 27.563050244675082,
        radiusInKm: radius
    },
    {
      name: 'Площадь Победы',
      latitude: 53.908185223610324,
      longitude: 27.57544904485735,
        radiusInKm: radius
    },
    {
      name: 'Площадь Якуба Коласа',
      latitude: 53.91541485245974,
      longitude: 27.58291631475481,
        radiusInKm: radius
    },
    {
      name: 'Академия наук',
      latitude: 53.922188333885245,
      longitude: 27.60046869054827,
        radiusInKm: radius
    },
    {
      name: 'Парк Челюскинцев',
      latitude: 53.92400788790166,
      longitude: 27.612012918148366,
        radiusInKm: radius
    },
    {
      name: 'Московская',
      latitude: 53.92796101095204,
      longitude: 27.627746237961105,
        radiusInKm: radius
    },
    {
      name: 'Восток',
      latitude: 53.934473537717,
      longitude: 27.65126772115923,
        radiusInKm: radius
    },
    {
      name: 'Борисовский тракт',
      latitude: 53.9384256121576,
      longitude: 27.66641296626267,
        radiusInKm: radius
    },
    {
      name: 'Уручье',
      latitude: 53.94536599374774,
      longitude: 27.68784077208693,
        radiusInKm: radius
    }
]

const zavodLine = [
    {
        name: 'Могилевская',
        latitude: 53.861626980837315,
        longitude: 27.674505745404076,
        radiusInKm: radius
    },
    {
        name: 'Партизанская',
        latitude: 53.8751396877767,
        longitude: 27.629530464642357,
        radiusInKm: radius
    },
    {
        name: 'Тракторный завод',
        latitude: 53.8892454216473,
        longitude: 27.61489085344192,
        radiusInKm: radius
    },
    {
        name: 'Пролетарская',
        latitude: 53.88967538467137,
        longitude: 27.585588256265055,
        radiusInKm: radius
    },
    {
        name: 'Первомайская',
        latitude: 53.89384832540525,
        longitude: 27.57052497043742,
        radiusInKm: radius
    },
    {
        name: 'Купаловская',
        latitude: 53.901409138247445,
        longitude: 27.56095484867228,
        radiusInKm: radius
    },
    {
        name: 'Немига',
        latitude: 53.90570731811712,
        longitude: 27.553916732217203,
        radiusInKm: radius
    },
    {
        name: 'Фрунзенская',
        latitude: 53.905353367072934,
        longitude: 27.539110938454996,
        radiusInKm: radius
    },
    {
        name: 'Молодежная',
        latitude: 53.906384222253706,
        longitude: 27.52257467959521,
        radiusInKm: radius
    },
    {
        name: 'Пушкинская',
        latitude: 53.90913983672495,
        longitude: 27.49627575027239,
        radiusInKm: radius
    },
    {
        name: 'Спортивная',
        latitude: 53.90850783112365,
        longitude: 27.479839173429127,
        radiusInKm: radius
    },
    {
        name: 'Кунцевщина',
        latitude: 53.90654176441074,
        longitude: 27.454132882230397,
        radiusInKm: radius
    },
    {
        name: 'Каменная горка',
        latitude: 53.90694626813671,
        longitude: 27.437739220731373,
        radiusInKm: radius
    }
]

export interface Props {
  navigation: any;
}
export interface State {}
export interface Props {
  navigation: any;
  onSave: Function;
}

const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ROOM_ENUM = {
    ROOM: "ROOM",
    ONE: "ONE_ROOM",
    TWO: "TWO_ROOMS",
    THREE: "THREE_ROOMS",
    FOUR_OR_MORE: "FOUR_OR_MORE_ROOMS"
};

let id = 0;

class Filter extends React.Component<Props, State> {
  constructor(props) {
    super(props);
      let rooms = this.props.filter.rooms ? this.props.filter.rooms : [];
      // let subway = this.props.filter.subway ? this.props.filter.subway : "ANY_SUBWAY";
      // console.log(this.props.filter)
    this.state = {
      isModalStationOpen: false,
      polygons: this.props.filter.coordinates,
      editing: null,
      creatingHole: false,
      minPrice: this.props.filter.minPrice,
      maxPrice: this.props.filter.maxPrice,
      rooms: this.props.filter.rooms,
      flat: this.checkWholeFlatStatus(rooms),
      room: rooms.includes(ROOM_ENUM.ROOM),
      oneRoom: rooms.includes(ROOM_ENUM.ONE),
      twoRooms: rooms.includes(ROOM_ENUM.TWO),
      threeRooms: rooms.includes(ROOM_ENUM.THREE),
      fourOrMore: rooms.includes(ROOM_ENUM.FOUR_OR_MORE),
      coordinates: [],
      subwayStations: [],
      selectedOwnerType: "OWNER_AND_AGENT",
      selectedSubway: this.props.filter.subway,
      mapScrollEnabled: true,
      mapIsEditable: false,
      regionIsChanging: false,
      errors: {},
      textColor: 'rgba(65,65,65,1)',
      savedLineStations: [],
      moscowLineStations: [],
      zavodLineStations: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
        let rooms = nextProps.filter.rooms ? nextProps.filter.rooms : [];
        let polygons = nextProps.filter.coordinates ? nextProps.filter.coordinates : [];
      this.setState({
        minPrice: nextProps.filter.minPrice,
        maxPrice: nextProps.filter.maxPrice,
        rooms: rooms,
        flat: this.checkWholeFlatStatus(rooms),
        room: rooms.includes(ROOM_ENUM.ROOM),
        oneRoom: rooms.includes(ROOM_ENUM.ONE),
        twoRooms: rooms.includes(ROOM_ENUM.TWO),
        threeRooms: rooms.includes(ROOM_ENUM.THREE),
        fourOrMore: rooms.includes(ROOM_ENUM.FOUR_OR_MORE),
        polygons: polygons,
        // selectedSubway: nextProps.subway,
        // selectedOwnerType: nextProps.filter.selectedOwnerType,
        // selectedSubway: nextProps.filter.selectedOwnerType
      });
    }
  }

  onPress(e) {
    if(this.state.mapIsEditable && this.state.polygons.length===0){
        const { editing, creatingHole } = this.state;
        if (!editing ) {
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
                    id: id++,
                    coordinates: [...editing.coordinates],
                    holes
                }
            });
        }
    }

  }

  onSubwayChanged = value => {
      this.setState({
          selectedSubway: value,
      });

    if(value === "NEAR_SUBWAY"){
      this.setState({
        isModalStationOpen: !this.state.isModalStationOpen
      });
    }

  };

  manageWholeFlatSearch = () => {
      let roomsNum = this.state.rooms;
      let status = this.state.flat

      let newStatus = !status

      this.setState({
          flat: newStatus
      })

      if (newStatus) {
          for (let room in ROOM_ENUM) {
              if(!roomsNum.includes(ROOM_ENUM[room]) && ROOM_ENUM[room] !=="ROOM"){
                  roomsNum.push(ROOM_ENUM[room]);
              }
          }
          this.setState({oneRoom: true});
          this.setState({twoRooms: true});
          this.setState({threeRooms: true});
          this.setState({fourOrMore: true});
      } else if (!newStatus) {
          if(roomsNum.includes(ROOM_ENUM.ROOM)){
              roomsNum = []
              roomsNum.push(ROOM_ENUM.ROOM)
              this.setState({oneRoom: false});
              this.setState({twoRooms: false});
              this.setState({threeRooms: false});
              this.setState({fourOrMore: false});
          } else {
              roomsNum = []
              this.setState({oneRoom: false});
              this.setState({twoRooms: false});
              this.setState({threeRooms: false});
              this.setState({fourOrMore: false});
          }
      }


      this.setState({
          rooms: roomsNum
      });

  }

  checkWholeFlatStatus = arr => {
      let flatContainsRoom = false;
      if(arr){
          for (let room in ROOM_ENUM) {
              if(ROOM_ENUM[room]!=="ROOM" && arr.includes(ROOM_ENUM[room])){
                  flatContainsRoom = true
              }
          }
      }
      // console.log(flatContainsRoom)
      return flatContainsRoom;
  }

  getRoomsNumber = (status, room) => {
    let roomsNum = this.state.rooms;

    if (status && !roomsNum.includes(room)) {
      roomsNum.push(room);
    } else if (!status && roomsNum.includes(room)) {
      const index = roomsNum.indexOf(room);
      roomsNum.splice(index, 1);
    }

    switch(room){
        case ROOM_ENUM.ROOM:
          this.setState({room: status});
          break;
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

    if(roomsNum.length===1 && roomsNum.includes(ROOM_ENUM.ROOM || roomsNum.length === 0)){
          this.setState({
              flat: false
        })
    } else if(roomsNum.length > 0 ){
        this.setState({
            flat: true
        });
    }

  };

  reset = () => {
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
            flat: false,
            rooms: [],
            coordinates: [],
            room: false,
            oneRoom: false,
            twoRooms: false,
            threeRooms: false,
            fourOrMore: false,
            // selectedOwnerType: 'OWNER_AND_AGENT',
            selectedSubway: 'ANY_SUBWAY'
          });
        }
      }
    ]);

  };

  onFilterSaved = () => {
      let errors = {};
      let polygons = this.state.polygons ? this.state.polygons.slice() : [];
      let tempCoordinates = polygons && polygons.length > 0 ? polygons : MINSK_COORDINATES
      let stationsCoordinates = [];

      if(this.state.savedLineStations) {
          this.state.savedLineStations.map(station => {
              stationsCoordinates.push({
                  latitude: station.latitude,
                  longitude: station.longitude,
                  radiusInKm: station.radiusInKm
              })
          })
      }

    let filter = {
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      rooms: this.state.rooms,
      owner: this.state.selectedOwnerType,
      subway: this.state.selectedSubway,
      subwayStations: stationsCoordinates,
      coordinates: tempCoordinates,
      page: 0,
    };


    if(this.state.maxPrice < this.state.minPrice){
        errors['maxPrice'] = "Неверное значение"

        this.setState({
            errors: Object.assign({}, errors),
            textColor: 'rgba(232,6,6,0.9)'
        })
    } else {
        this.props.onAddFilter(filter);
        this.props.navigation.goBack();
    }

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
          mapIsEditable: !this.state.mapIsEditable,
      });

      if(this.state.editing !== null && this.state.editing.coordinates.length > 0){

          const polygons  = this.state.polygons ? this.state.polygons : []
          const editing = this.state.editing ? this.state.editing : [];

          this.setState({
              polygons: [...polygons, editing],
              editing: null,
              creatingHole: false
          });
      }
  }

  onSelectedStationsSaved = val => {
      this.setState({
        savedLineStations: val.slice()
      })
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
  }

  closeSubwayModal = () => {
      this.setState({
          isModalStationOpen: false
      })
  }

  render() {
    const mapOptions = {
      scrollEnabled: this.state.mapScrollEnabled
    };

    let { minPrice, maxPrice, editing } = this.state;

    return (
      <Container style={{backgroundColor: '#FFFFFF'}}>
        <Header style={{ backgroundColor: '#FFFFFF', }}>
            <StatusBar
                barStyle={ 'dark-content'}
                backgroundColor={'#FFFFFF'}
                translucent={false}
            />
          <Left>
            <Button
                style={{marginLeft: 2, zIndex: 9999}}
                onPress={() => this.props.navigation.goBack()}
                transparent>
              <Icon
                  style={{color: "#414141", zIndex: 9999}}
                active
                name="close"
              />
            </Button>
          </Left>
          <Right>
              <TouchableOpacity onPress={this.reset} style={{marginRight: 2}}>
                  <Text>Очистить</Text>
              </TouchableOpacity>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "#FFFFFF", marginTop: 10 }} keyboardDismissMode="on-drag">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderColor: "#e5e5e5",
                            width: width * 0.9,
                            flex: 1,
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#414141", paddingBottom: 15 }}>
                            Тип жилья
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                width: width * 0.8,
                                paddingBottom: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}
                        >
                            <ToggleButton
                                onColor={"#87b357c4"}
                                effect={"pulse"}
                                status={this.state.flat}
                                _onPress={status => {
                                  this.manageWholeFlatSearch(status);
                                }}
                                text="Квартира"
                            />
                            <ToggleButton
                                onColor={"#87b357c4"}
                                effect={"pulse"}
                                status={this.state.room}
                                _onPress={status => {
                                    this.getRoomsNumber(status, ROOM_ENUM.ROOM);
                                }}
                                text="Комната"
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderColor: "#e5e5e5",
                            width: width * 0.9
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#414141", paddingBottom: 15 }}>
                            Количество комнат
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                width: width * 0.8,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingBottom: 20,
                                alignSelf: 'center'
                            }}
                        >
                            <ToggleButton
                                onColor={"#87b357c4"}
                                effect={"pulse"}
                                status={this.state.oneRoom}
                                _onPress={status => {
                                    this.getRoomsNumber(status, ROOM_ENUM.ONE);
                                }}
                                text="1"
                            />
                            <ToggleButton
                                onColor={"#87b357c4"}
                                effect={"pulse"}
                                status={this.state.twoRooms}
                                _onPress={status => {
                                    this.getRoomsNumber(status, ROOM_ENUM.TWO);
                                }}
                                text="2"
                            />
                            <ToggleButton
                                onColor={"#87b357c4"}
                                effect={"pulse"}
                                status={this.state.threeRooms}
                                _onPress={status => {
                                    this.getRoomsNumber(status, ROOM_ENUM.THREE);
                                }}
                                text="3"
                            />
                            <ToggleButton
                                onColor={"#87b357c4"}
                                effect={"pulse"}
                                status={this.state.fourOrMore}
                                _onPress={status => {
                                    this.getRoomsNumber(status, ROOM_ENUM.FOUR_OR_MORE);
                                }}
                                text="4+"
                            />
                        </View>
                    </View>
                </View>
              <View style={{ flex: 1, alignItems: "center", width: width*0.9, alignSelf: 'center', paddingTop: 20 }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#e5e5e5",
                    width: width * 0.9
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#414141" }}>
                    Ценовой диапазон
                  </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            paddingBottom: 20,
                            width: width * 0.8,
                            alignSelf: 'center'
                        }}
                    >
                        <TextField
                            label="Минимальная цена"
                            fontSize={16}
                            labelFontSize={14}
                            value={minPrice}
                            containerStyle={{ paddingRight: 10, width: width * 0.45 }}
                            animationDuration={50}
                            keyboardType={"numeric"}
                            maxLength={5}
                            tintColor="rgb(135,179,87)"
                            textColor="rgba(65,65,65,1)"
                            onChangeText={minPrice => this.setState({ minPrice })}
                        />
                        <TextField
                            label="Максимальная цена"
                            fontSize={16}
                            labelFontSize={14}
                            value={maxPrice}
                            containerStyle={{ paddingLeft: 10, width: width * 0.45 }}
                            animationDuration={50}
                            keyboardType={"numeric"}
                            tintColor="rgb(135,179,87)"
                            textColor={this.state.textColor}
                            maxLength={5}
                            error={this.state.errors['maxPrice']}
                            errorColor="rgb(232,6,6)"
                            onChangeText={maxPrice => this.setState({ maxPrice })}
                        />
                    </View>
                </View>
              </View>
              <View style={{ flex: 1, paddingTop: 20 }}>
                <View
                  style={{
                    width: width * 0.9,
                    alignSelf: "center",

                  }}
                >
                  {/*3f51b5*/}
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#414141", marginBottom: 15 }}>
                    Местоположение на карте
                  </Text>
                </View>
                  <View style={{flex: 1, width: width*0.9, alignSelf: 'center', borderBottomWidth: 1,
                      borderColor: "#e5e5e5", marginBottom: 20}}>
                      <Text style={{fontSize: 14, color: '#00000061'}}>Метро</Text>
                      <View style={{ backgroundColor: 'white'}}>
                        <Picker
                            style={{color: '#414141', }}
                              iosHeader="Выбрать"
                              placeholder="Выбрать"
                              mode="dropdown"
                              enabled={true}
                              selectedValue={this.state.selectedSubway}
                              onValueChange={this.onSubwayChanged}
                        >
                          {subwaySelection.map((i, index) => {
                              return(
                                  <Item key={index} label={i.label} value={i.value} />
                                  )
                          })}
                        </Picker>
                      </View>
                  </View>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 15,
                    alignItems: "center", justifyContent: 'space-between',}}>
                  <View style={{left: width*0.05, width: width*0.4,}}>
                      {
                      this.state.mapIsEditable ?
                          <TouchableOpacity style={{height: '100%', width: '100%', borderWidth: 1, borderRadius: 3, borderColor: '#FFFFFF' , alignItems: 'center', justifyContent: 'center',
                              shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 2, elevation: 1, backgroundColor: '#87b357c4' }}
                                            onPress={() => this.onEditHandler()}>
                              <Text style={{fontWeight: 'bold', color: '#FFFFFF', paddingTop: 5, paddingBottom: 5}}>Сохранить область</Text>
                          </TouchableOpacity> : this.state.polygons && this.state.polygons.length > 0 ?
                          <TouchableOpacity disabled={true} style={{height: '100%', width: '100%', borderWidth: 1, borderRadius: 3, borderColor: '#FFFFFF' , alignItems: 'center', justifyContent: 'center',
                              shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 2, elevation: 1, backgroundColor: '#93969b' }}>
                              <Text style={{fontWeight: 'bold', color: '#FFFFFF', paddingTop: 5, paddingBottom: 5}}>Выделить область</Text>
                          </TouchableOpacity> :
                          <TouchableOpacity style={{height: '100%', width: '100%', borderWidth: 1, borderRadius: 3, borderColor: '#FFFFFF' , alignItems: 'center', justifyContent: 'center',
                              shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 2, elevation: 1, backgroundColor: '#87b357c4' }}
                                            onPress={() => this.onEditHandler()}>
                              <Text style={{fontWeight: 'bold', color: '#FFFFFF', paddingTop: 5, paddingBottom: 5}}>Выделить область</Text>
                          </TouchableOpacity>
                      }

                  </View>
                  <View style={{right: width*0.05, width: width*0.4,}}>
                      {this.state.polygons && this.state.polygons.length > 0 || this.state.editing !== null ?
                          <TouchableOpacity style={{height: '100%', width: '100%', borderWidth: 1, borderRadius: 3, borderColor: '#FFFFFF' , alignItems: 'center', justifyContent: 'center',
                              shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 2, elevation: 1, backgroundColor: '#87b357c4' }}
                                            onPress={() => this.resetMap()}>
                              <Text style={{fontWeight: 'bold', color: '#FFFFFF', paddingTop: 5, paddingBottom: 5}}>Очистить область</Text>
                          </TouchableOpacity> :
                          <TouchableOpacity disabled={true} style={{height: '100%', width: '100%', borderWidth: 1, borderRadius: 3, borderColor: '#FFFFFF' , alignItems: 'center', justifyContent: 'center',
                              shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 2, elevation: 1, backgroundColor: '#93969b' }}
                                            onPress={() => this.resetMap()}>
                              <Text style={{fontWeight: 'bold', color: '#FFFFFF', paddingTop: 5, paddingBottom: 5}}>Очистить область</Text>
                          </TouchableOpacity>
                        }
                  </View>
                </View>
                <MapView
                  style={{
                    flex: 1,
                    width: width * 0.99,
                    height: height * 0.6,
                    alignSelf: "center"
                  }}
                  initialRegion={{
                    latitude: 53.902231,
                    longitude: 27.561876,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                  }}
                  showsUserLocation={true}
                  showsTraffic={false}
                  loadingEnabled={true}
                  // moveOnMarkerPress={false}
                  // scrollEnabled
                  // onRegionChangeComplete={e => this.onRegionChangeComplete(e)}
                  // onRegionChange={ e=> this.onRegionChange(e)}
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
                          // image={require("../../../../assets/images/pin.png")}

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
                <View style={styles.buttonContainer}/>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Content>
          {this.state.isModalStationOpen ?
              <StationsModal isModalStationOpen={this.state.isModalStationOpen} selectedSubway={this.state.selectedSubway}
                             closeSubwayModal={this.closeSubwayModal} moscowLine={moscowLine} zavodLine={zavodLine}
                             onStationsSaved={this.onSelectedStationsSaved} stations={this.props.filter.subwayStations}
              /> :
              <Footer style={{height: '10%'}}>
                  <FooterTab style={{backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                      <TouchableOpacity style={{height: '75%', width: '80%', borderWidth: 1, borderRadius: 3, borderColor: '#FFFFFF' , alignItems: 'center', justifyContent: 'center',
                          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1, backgroundColor: '#87b357c4' }}
                                        onPress={this.onFilterSaved}>
                          <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>Показать доступные квартиры</Text>
                      </TouchableOpacity>
                  </FooterTab>
              </Footer>
          }
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
    marginVertical: 5,
  },
  modal: {
      flex: 1
  },
  modal1: {
    height: height,
  },
});

export default Filter;
