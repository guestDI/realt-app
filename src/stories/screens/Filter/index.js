import * as React from "react";
import {Header, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail, Container} from "native-base";

import {
	Image,
	View,
    Dimensions,
	Modal,
    StyleSheet,
    TextInput,
    ScrollView
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
                                onPress={() => this.props.navigation.navigate("Home")}
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
                        <View style={{flex: 1, flexDirection: "row", }}>
                            <Text>1111111</Text>
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
    ratingsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '1%'
    }
})

export default Filter;
