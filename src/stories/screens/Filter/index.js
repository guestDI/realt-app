import * as React from "react";
import {Header, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail, Container, Form, Input, Picker, Item as FormItem} from "native-base";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { CheckBox } from 'react-native-elements'
import ToggleButton from './components/ToggleButton'
import { MapView } from 'expo';

import {
	Image,
	View,
    Dimensions,
	Modal,
    StyleSheet,
    TextInput,
    ScrollView,
    Slider,
    TouchableOpacity
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

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class Filter extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            polygons: [],
            editing: null,
            creatingHole: false,
            minPrice: '',
            maxPrice: '',
            rooms: [],
            coordinates: [],
            selectedOwnerType: this.props.filter.selectedOwnerType,
            selectedSubway: this.props.filter.selectedOwnerType
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter !== nextProps.filter) {
            this.setState({
                selectedOwnerType: nextProps.selectedOwnerType,
                selectedSubway: nextProps.selectedOwnerType
                // id: nextProps.userProfile.id,
                // firstname: nextProps.userProfile.firstname,
                // lastname: nextProps.userProfile.lastname,
                // email: nextProps.userProfile.email,
                // profilePhoto: nextProps.userProfile.profilePhoto,
                // role: nextProps.userProfile.role,
                // userInfo: nextProps.userProfile,
            });
        }
    }

    finish() {
        const { polygons, editing } = this.state;
        this.setState({
            polygons: [...polygons, editing],
            editing: null,
            creatingHole: false,
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
                    holes: [
                        ...editing.holes,
                        [],
                    ],
                },
            });
        } else {
            const holes = [...editing.holes];
            if (holes[holes.length - 1].length === 0) {
                holes.pop();
                this.setState({
                    editing: {
                        ...editing,
                        holes,
                    },
                });
            }
            this.setState({ creatingHole: false });
        }
    }

    onPress(e) {
        const { editing, creatingHole } = this.state;
        if (!editing) {
            this.setState({
                editing: {
                    id: id++,
                    coordinates: [e.nativeEvent.coordinate],
                    holes: [],
                },
            });
        } else if (!creatingHole) {
            this.setState({
                editing: {
                    ...editing,
                    coordinates: [
                        ...editing.coordinates,
                        e.nativeEvent.coordinate,
                    ],
                },
            });
        } else {
            const holes = [...editing.holes];
            holes[holes.length - 1] = [
                ...holes[holes.length - 1],
                e.nativeEvent.coordinate,
            ];
            this.setState({
                editing: {
                    ...editing,
                    id: id++, // keep incrementing id to trigger display refresh
                    coordinates: [
                        ...editing.coordinates,
                    ],
                    holes,
                },
            });
        }
    }

    onFilterSaved = () => {
        let filter = {
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            rooms: this.state.rooms,
            owner: this.state.selectedOwnerType,
            subway: this.state.selectedSubway,
            coordinates: this.state.editing
        }
        this.props.onAddFilter(filter);
        // this.props.onFetchFilter();
        // console.log(this.props.filter)
        this.props.navigation.goBack();
    }

    onValueChanged = (value) => {
        this.setState({
            selectedOwnerType: value
        });
    }

    onSubwayChanged = (value) => {
        this.setState({
            selectedSubway: value
        });
    }

	render() {
        const mapOptions = {
            scrollEnabled: true,
        };

        if (this.state.editing) {
            mapOptions.scrollEnabled = false;
            mapOptions.onPanDrag = e => this.onPress(e);
        }

        let { minPrice, maxPrice } = this.state
		return (
            <Container >
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
                    <Right >
                        <Button transparent>
                            <Icon name="checkmark" style={{fontSize: 28}}
                            onPress={this.onFilterSaved}
                            />
                        </Button>
                        <Button transparent>
                            <Icon name="trash" style={{fontSize: 28}}/>
                            {/*onPress={() => this.props.navigation.navigate("DrawerOpen")}*/}
                            {/*/>*/}
                        </Button>
                    </Right>
                </Header>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <ScrollView style={{backgroundColor: '#FFFFFF',}} >
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{borderBottomWidth: 1, borderColor: '#c7ccd7', width: width*0.9,}}>
                                <Text style={{fontSize: 20, padding: 5, color: '#8c919c'}}>Цена</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
                                    <TextField
                                        label='Минимальная цена'
                                        value={minPrice}
                                        containerStyle={{paddingRight: 10, width: width*0.45}}
                                        animationDuration={50}
                                        keyboardType={'numeric'}
                                        maxLength={5}
                                        onChangeText={ (minPrice) => this.setState({ minPrice }) }
                                    />
                                    <TextField
                                        label='Максимальная цена'
                                        value={maxPrice}
                                        containerStyle={{paddingLeft: 10, width: width*0.45}}
                                        animationDuration={50}
                                        keyboardType={'numeric'}
                                        maxLength={5}
                                        onChangeText={ (maxPrice) => this.setState({ maxPrice }) }
                                    />
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', paddingTop: 10}}>
                            <View style={{borderBottomWidth: 1, borderColor: '#c7ccd7', width: width*0.9, }}>
                                <Text style={{fontSize: 20, padding: 5, color: '#8c919c'}}>Количество комнат</Text>
                            </View>
                            <View style={{flexDirection: 'row', width: width*0.9, justifyContent: 'center', alignItems: 'center'}}>
                                <ToggleButton onColor={"orange"} effect={"pulse"} _onPress={(status) => {}} text="1" />
                                <ToggleButton onColor={"orange"} effect={"pulse"} _onPress={(status) => {}} text="2" />
                                <ToggleButton onColor={"orange"} effect={"pulse"} _onPress={(status) => {}} text="3" />
                                <ToggleButton onColor={"orange"} effect={"pulse"} _onPress={(status) => {}} text="4+" />
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', paddingTop: 10}}>
                            <View style={{borderBottomWidth: 1, borderColor: '#c7ccd7', width: width*0.9}}>
                                <Text style={{fontSize: 20, padding: 5, color: '#8c919c'}}>Тип объявлений</Text>
                            </View>
                            <View style={{flex: 1, width: width*0.9}}>
                                <Picker
                                    iosHeader="Собственник/Агент"
                                    mode="dropdown"
                                    selectedValue={this.state.selectedOwnerType}
                                    onValueChange={this.onValueChanged}
                                >
                                    <Item label="Не важно" value="ANY" />
                                    <Item label="Только собственник" value="OWNER" />
                                    <Item label="Собственник + проверенные агенты" value="OWNER_AND_AGENT" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', paddingTop: 10}}>
                            <View style={{borderBottomWidth: 1, borderColor: '#c7ccd7', width: width*0.9, }}>
                                <Text style={{fontSize: 20, padding: 5, color: '#8c919c'}}>Метро</Text>
                            </View>
                            <View style={{flex: 1, width: width*0.9}}>
                                <Picker
                                    iosHeader="Метро"
                                    mode="dropdown"
                                    selectedValue={this.state.selectedSubway}
                                    onValueChange={this.onSubwayChanged}
                                >
                                    <Item label="Не важно" value="ANY_SUBWAY" />
                                    <Item label="Возле метро" value="NEAR_SUBWAY" />
                                    <Item label="Московская линия" value="M_SUBWAY" />
                                    <Item label="Автозаводская линия" value="A_SUBWAY" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{flex: 1, }}>
                            <View style={{borderBottomWidth: 1, borderColor: '#aaafba', width: width*0.9, alignSelf: 'center'}}>
                                <Text style={{fontSize: 20, padding: 5, color: '#8c919c'}}>Местоположение на карте</Text>
                            </View>
                            <MapView
                                style={{ flex: 1, width: width*0.99, height: height*0.7, alignSelf: 'center'}}
                                initialRegion={{
                                    latitude: 53.902863,
                                    longitude: 27.551579,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                }}
                                showsTraffic={false}
                                onPress={e => this.onPress(e)}
                                {...mapOptions}
                            >
                                {this.state.editing!==null ? this.state.editing.coordinates.map(obj => (
                                    <MapView.Marker
                                        key={obj.longitude}
                                        coordinate={{
                                            latitude: obj.latitude,
                                            longitude: obj.longitude}}
                                        image={require("../../../../assets/images/pin.png")}
                                    >
                                    </MapView.Marker>
                                    )) : null}
                                {this.state.polygons.map(polygon => (
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
                                {this.state.editing && (
                                    <TouchableOpacity
                                        onPress={() => this.createHole()}
                                        style={[styles.bubble, styles.button]}
                                    >
                                        <Text>{this.state.creatingHole ? 'Finish Hole' : 'Create Hole'}</Text>
                                    </TouchableOpacity>
                                )}
                                {this.state.editing && (
                                    <TouchableOpacity
                                        onPress={() => this.finish()}
                                        style={[styles.bubble, styles.button]}
                                    >
                                        <Text>Finish</Text>
                                    </TouchableOpacity>
                                )}
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
            </Container>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

export default Filter;
