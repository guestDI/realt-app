import * as React from "react";
import {Header, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail, Container} from "native-base";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SliderCustomMarker from './components/SliderCustomMarker'
import {
	Image,
	View,
    Dimensions,
	Modal,
    StyleSheet,
    TextInput,
    ScrollView,
    Slider
} from "react-native";
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

class Filter extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            multiSliderValue: [0, 3000],
        };
    }

	render() {
		return (
            <Container >
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon
                                active
                                name="arrow-back"
                                // onPress={() => this.props.navigation.navigate("Home")}
                            />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Фильтр</Title>
                    </Body>
                    <Right >
                        <Button transparent>
                            <Icon name="trash" style={{fontSize: 28}}/>
                            {/*<Icon*/}
                            {/*active*/}
                            {/*name="menu"*/}
                            {/*onPress={() => this.props.navigation.navigate("DrawerOpen")}*/}
                            {/*/>*/}
                        </Button>
                    </Right>
                </Header>
                <View style={{flex: 1}}>
                    <ScrollView style={{backgroundColor: '#FFFFFF',}} >
                        <View style={styles.sliderOne}>
                            <Text style={{fontSize: 26, padding: 5, color: '#8c919c'}}>Цена</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 20}}>
                                    <Text >{this.state.multiSliderValue[0]} </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 20}}>
                                    <Text >{this.state.multiSliderValue[1]}</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, margin: 20, width: 280,}}>
                                <MultiSlider
                                    unselectedStyle={{
                                        backgroundColor: 'silver',
                                    }}
                                    selectedStyle={{
                                        backgroundColor: 'silver',
                                    }}
                                    touchDimensions={{
                                        height: 200,
                                        width: 200,
                                        borderRadius: 60,
                                        slipDisplacement: 70,
                                    }}
                                    trackStyle={{
                                        height: 3,
                                    }}
                                    values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                                    sliderLength={280}
                                    // onValuesChange={this.multiSliderValuesChange}
                                    min={0}
                                    max={3000}
                                    step={10}
                                    allowOverlap
                                    // snapped
                                    customMarker={SliderCustomMarker}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Container>
		);
	}
}

const styles = StyleSheet.create({
    containerStyle: {
        height: height*0.7,
        width: width*0.9,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: height*0.1,
    },
    image: {
        height: 40,
        width: 40
    },
    sliderOne: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default Filter;
