import * as React from "react";
import { Dimensions, View, Text, Image, StyleSheet, ScrollView, StatusBar, WebView, TouchableOpacity, TouchableWithoutFeedback,
    Linking, NativeModules, Platform } from "react-native"
import { Button, Icon, Root, Toast, Container, Header, Title, Content, Left, Body, Right } from "native-base"
import { Card   } from "react-native-elements"
import ImageView from './components/ImageView'
import { MapView } from 'expo';

export interface Props {
	navigation: any;
}
export interface State {}
export interface Props {
    navigation: any;
    movie: Object;
    myRate: ?{rate: number, comment: string};
    onRateChanged: Function;
}

const { StatusBarManager } = NativeModules;

const {height, width} = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class FlatPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            alert: null,
            visible: false,
            viewerVisible: false,
            follow: false,
            fullRead: false,
            statusBarColor: 'rgba(0, 0, 0, 0.3)',
            friendsModalVisible: false,
            imageNumberSelected: 0,
        };
    }

    friendsModalHandler = () => {
        this.setState({
            friendsModalVisible: true
        });
    }

    viewerHandler = (imageNumber) => {
        this.setState({
            viewerVisible: true,
            statusBarColor: 'black',
            imageNumberSelected: imageNumber,
        });
    }

    onCloseRatingsHandler = () => {
        this.setState({
            visible: false
        });

    }

    onCloseFriendsRatingHandler = () => {
        this.setState({
            friendsModalVisible: false
        });

    }

    onCloseViewerHandler = () => {
        this.setState({
            viewerVisible: false,
            statusBarColor: 'rgba(0, 0, 0, 0.3)'
        });
    }

    viewFullSynopsis = () => {
        let current = this.state.fullRead
        this.setState({
            fullRead: !current
        });
    }

    onFollowHandler = () => {
        let current = this.state.follow
        this.setState({
            follow: !current
        });

        return this.state.follow ? "Удачно отписаны" : "Удачно подписаны"
    }

    onChangeRate = (rate) => {
        Toast.show({
            text: 'Ваша оценка сохранена успешно',
            position: 'bottom',
            buttonText: 'Скрыть',
            duration: 2000
        })

        // this.props.onRateChanged(rate)
    }

	render() {
		const param = this.props.navigation.state.params;
		// const {movie, myRate} = this.props;

        // const rate = myRate ? myRate.rate : null;
        // const comment = myRate ? myRate.comment : null;
        //
        const photos = this.props.flat.photos ? this.props.flat.photos : [];
        // const videos = movie.media && movie.media.video ? Object.values(movie.media.video) : [];

		return (
		    <Container >
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon
                                active
                                name="menu"
                                onPress={() => this.props.navigation.navigate("DrawerOpen")}
                            />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Аренда</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{flex: 1}}>
                    <ScrollView style={{backgroundColor: '#FFFFFF',}}>
                        {/*<StatusBar*/}
                            {/*translucent={true}*/}
                            {/*backgroundColor={this.state.statusBarColor}*/}
                            {/*barStyle={'light-content'}*/}
                        {/*/>*/}
                        {/*page={this.state.imageNumberSelected}*/}
                        {/*<TouchableOpacity key={index} onPress={() => this.viewerHandler(shots.indexOf(image))}>*/}
                            {/*<Image style={styles.cardImage} source={{uri: image}} />*/}
                        {/*</TouchableOpacity>*/}
                        {/*<View style={{flexDirection: "row", alignItems: 'center'}}>*/}
                            {/*<Text style={{fontSize: 22, fontWeight: "bold", padding: 5}}>{this.props.flat.address}</Text>*/}
                            {/*<Image*/}
                            {/*resizeMode="contain"*/}
                            {/*source={require("../../../../assets/images/location-icon-grey.png")}*/}
                            {/*style={{height: 20, width: 23}}/>*/}
                        {/*</View>*/}
                        <View
                            style={styles.scrollContainer}
                        >
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                            >
                                {photos.map((image, index) => (
                                    <Image key={index} style={styles.cardImage} source={{uri: image}} />
                                ))}
                            </ScrollView>
                        </View>
                        {/*<View style={{borderBottomWidth: 1, borderColor: '#aaafba', width: width*0.95, alignSelf: 'center'}}>*/}
                            {/*<Text style={{fontSize: 24, padding: 5, color: '#8c919c'}}>Основная информация</Text>*/}
                        {/*</View>*/}
                        <View style={{flex: 1, flexDirection: "row", }}>
                            <View style={{flexDirection: "column", paddingLeft: 10}}>
                                <Text style={{fontSize: 18, padding: 5, }}>Кол-во комнат: 2</Text>
                                <Text style={{fontSize: 18, padding: 5, }}>Цена: {this.props.flat.price}</Text>
                                <View style={{flexDirection: "row", alignItems: 'center'}}>
                                    <Image
                                        resizeMode="contain"
                                        source={require("../../../../assets/images/location-icon-grey.png")}
                                        style={{height: 24, width: 35}}/>
                                    <Text style={{fontSize: 16}}>
                                        {this.props.flat.address}
                                    </Text>
                                </View>
                                    {this.props.flat.contacts.map((num, index) => {
                                        return (
                                            <View key={index} style={{flexDirection: "row", alignItems: 'center', paddingTop: 5}}>
                                                <Image
                                                    resizeMode="contain"
                                                    source={require("../../../../assets/images/phone-512.png")}
                                                    style={{height: 24, width: 35}}/>
                                                <Text style={{fontSize: 16}}>
                                                    {num}
                                                </Text>
                                            </View>
                                        )
                                    })}
                            </View>

                            {/*<View style={{flexDirection: "column", }}>*/}
                                {/*<Text style={{fontSize: 18, padding: 5,}}>Район</Text>*/}
                                {/*<Text style={{fontSize: 18, padding: 5,}}>{this.props.flat.address}</Text>*/}
                            {/*</View>*/}
                        </View>
                        <View style={{borderBottomWidth: 1, borderColor: '#aaafba', width: width*0.95, alignSelf: 'center'}}>
                            <Text style={{fontSize: 24, padding: 5, color: '#8c919c'}}>Описание</Text>
                        </View>
                        <Text style={{fontSize: 16, paddingLeft: 10, paddingTop: 5, paddingBottom: 10}}>{this.props.flat.description}</Text>
                        <View style={{borderBottomWidth: 1, borderColor: '#aaafba', width: width*0.95, alignSelf: 'center'}}>
                            <Text style={{fontSize: 24, padding: 5, color: '#8c919c'}}>Местоположение</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: "row", }}>
                            <View style={{flexDirection: "column", paddingLeft: 10}}>
                                <Text style={{fontSize: 18, padding: 5, color: '#8c919c'}}>Район</Text>
                                <Text style={{fontSize: 18, padding: 5, color: '#8c919c'}}>Улица</Text>
                            </View>
                            <View style={{flexDirection: "column", }}>
                                <Text style={{fontSize: 18, padding: 5,}}>Район</Text>
                                <Text style={{fontSize: 18, padding: 5,}}>{this.props.flat.address}</Text>
                            </View>
                        </View>
                        <View>
                            <MapView
                                style={{ flex: 1, width: width, height: height*0.5}}
                                initialRegion={{
                                    latitude: this.props.flat.latitude,
                                    longitude: this.props.flat.longitude,
                                    latitudeDelta: 0.0222,
                                    longitudeDelta: 0.0121,
                                }}
                                showsTraffic={false}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: this.props.flat.latitude,
                                        longitude: this.props.flat.longitude}}
                                    title={this.props.flat.address}
                                />
                            </MapView>

                        </View>
                        {/*<View style={{flexDirection: "column", marginTop: 5}}>*/}
                            {/*<View>*/}
                                {/*<Text>Кол-во комнат: 2</Text>*/}
                            {/*</View>*/}
                            {/*<View>*/}
                                {/*<Text>Цена: {this.props.flat.price}</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                            {/*<View style={{flexDirection: "row", marginBottom: 5, marginTop: 5, alignItems: 'center', justifyContent: "center"}}>*/}
                                {/*<View style={{flexDirection: "row", paddingRight: 10, paddingBottom: 3}}>*/}
                                    {/*<Icon name='calendar' style={{fontSize: 16, color: '#a5abb6', paddingRight: 3}}/>*/}
                                    {/*<Text style={{fontSize: 12, color: '#a5abb6'}}>{movie.date}</Text>*/}
                                {/*</View>*/}
                                {/*<View style={{flexDirection: "row", paddingBottom: 3}}>*/}
                                    {/*<Icon name='clock' style={{fontSize: 16, color: '#a5abb6', paddingRight: 3}}/>*/}
                                    {/*<Text style={{fontSize: 12, color: '#a5abb6'}}>{movie.duration} минут</Text>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            {/*<View style={{flexDirection: "row", marginBottom: 10, alignItems: 'center', justifyContent: "center"}}>*/}
                                {/*<View style={{padding: 5, borderWidth: 1, borderColor: '#bec4cf', borderRadius: 5}}>*/}
                                    {/*<Text style={{fontSize: 10}}>Драма</Text>*/}
                                {/*</View>*/}
                                {/*<View style={{padding: 5, borderWidth: 1, borderColor: '#bec4cf', borderRadius: 5, marginLeft: 5}}>*/}
                                    {/*<Text style={{fontSize: 10}}>Приключения</Text>*/}
                                {/*</View>*/}
                                {/*<View style={{padding: 5, borderWidth: 1, borderColor: '#bec4cf', borderRadius: 5, marginLeft: 5}}>*/}
                                    {/*<Text style={{fontSize: 10}}>Фэнтэзи</Text>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            {/*{*/}
                                {/*this.state.fullRead ? <Text style={{fontSize: 14, padding: 5, paddingTop: 0, paddingBottom: 0}}>{movie.synopsis}</Text>*/}
                                {/*: <Text numberOfLines={3} style={{fontSize: 14, padding: 5, paddingTop: 0, paddingBottom: 0}}>{movie.synopsis}</Text>*/}
                            {/*}*/}
                            {/*{ movie.synopsis ?*/}
                                {/*<Text onPress={() => this.viewFullSynopsis()} style={{fontSize: 14, color: '#b2b8c3', marginBottom: 10, paddingLeft: 5}}>*/}
                                    {/*{this.state.fullRead ? 'Скрыть' : 'Читать полностью' }*/}
                                {/*</Text> : <Text style={{fontSize: 12, marginBottom: 10, paddingLeft: 5, fontStyle: 'italic'}}>Описание пока недоступно... </Text> }*/}
                            {/*<View >*/}
                                {/*<View style={{flexDirection: "row", marginBottom: 5, alignItems: 'center', justifyContent: "center"}}>*/}
                                    {/*<TouchableWithoutFeedback onPress={() =>*/}
                                        {/*this.props.navigation.navigate("FriendsRating", {*/}
                                            {/*movie: movie.id*/}
                                        {/*})}>*/}
                                        {/*<View style={{alignItems: 'center', flex: 2 }}>*/}
                                            {/*<Text style={{fontSize: 28}}>*/}
                                                {/*5<Text style={{fontSize: 12, color: '#bec4cf'}}>/5</Text>*/}
                                            {/*</Text>*/}
                                            {/*<View style={{flexDirection: "row", alignItems: 'center'}}>*/}
                                                {/*<Icon name='person' style={{fontSize: 18, color: 'red', paddingRight: 5}}/>*/}
                                                {/*<Text style={{fontSize: 16}}>*/}
                                                    {/*Друзья*/}
                                                {/*</Text>*/}
                                            {/*</View>*/}
                                        {/*</View>*/}
                                    {/*</TouchableWithoutFeedback>*/}
                                    {/*<View style={{alignItems: 'center', flex: 3}}>*/}
                                        {/*<Text style={{fontSize: 28}}>*/}
                                            {/*{movie.ratings.rt}<Text style={{fontSize: 12, color: '#bec4cf'}}>%</Text>*/}
                                        {/*</Text>*/}
                                        {/*<View style={{flexDirection: "row", alignItems: 'center',}}>*/}
                                            {/*/!*<Icon name='star-half' style={{fontSize: 16, color: 'red', paddingRight: 3}}/>*!/*/}
                                            {/*<Image*/}
                                                {/*resizeMode="contain"*/}
                                                {/*source={require("../../../../assets/images/rottentomatoes_03.png")}*/}
                                                {/*style={{height: 21, width: 35}}/>*/}
                                            {/*<Text style={{fontSize: 14}}>*/}
                                                {/*ROTTEN TOMATOES*/}
                                            {/*</Text>*/}
                                        {/*</View>*/}
                                    {/*</View>*/}
                                    {/*<View style={{alignItems: 'center', flex: 2}}>*/}
                                        {/*<Text style={{fontSize: 28}}>*/}
                                            {/*{movie.ratings.imdb}<Text style={{fontSize: 12, color: '#bec4cf'}}>/10</Text>*/}
                                        {/*</Text>*/}
                                        {/*<View style={{flexDirection: "row", alignItems: 'center',}}>*/}
                                            {/*<Image*/}
                                                {/*resizeMode="contain"*/}
                                                {/*source={require("../../../../assets/images/IMDb-icon.png")}*/}
                                                {/*style={{height: 14, width: 23}}/>*/}
                                            {/*/!*<Icon name='star-half' style={{fontSize: 16, color: 'red', paddingRight: 3}}/>*!/*/}
                                            {/*<Text style={{fontSize: 14, paddingLeft: 5}}>*/}
                                                {/*IMDb*/}
                                            {/*</Text>*/}
                                        {/*</View>*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                            {/*<View style={{flexDirection: "row", alignItems: 'center', justifyContent: "center", paddingBottom: 10}}>*/}
                                {/*<View style={{padding: 5, flex: 2}}>*/}
                                    {/*<Button bordered transparent light iconLeft*/}
                                            {/*onPress={() => this.rateHandler()}*/}
                                            {/*style={{alignSelf: 'stretch', justifyContent: 'center', borderColor: '#bec4cf'}}*/}
                                    {/*>*/}
                                        {/*<Icon name='star' style={{fontSize: 20, color: 'black', paddingRight: 5}}/>*/}
                                        {/*<Text>Оценить</Text>*/}
                                    {/*</Button>*/}
                                {/*</View>*/}
                                {/*<View style={{padding: 5, flex: 2}}>*/}
                                    {/*<Button bordered transparent light iconLeft*/}
                                            {/*// onPress={() =>*/}
                                            {/*//     this.props.navigation.navigate("FriendProfile", {*/}
                                            {/*//         movieId: movie.id, movieImage: movie.image_url_small*/}
                                            {/*//     })}*/}
                                            {/*onPress={()=> Toast.show({*/}
                                                {/*text: this.onFollowHandler(),*/}
                                                 {/*// text: this.state.follow ? 'Удачно подписаны' : 'Удачно отписаны',*/}
                                                 {/*position: 'bottom',*/}
                                                 {/*buttonText: 'Скрыть',*/}
                                                 {/*duration: 1000*/}
                                             {/*})}*/}
                                            {/*style={{alignSelf: 'stretch', justifyContent: 'center', borderColor: '#bec4cf'}}*/}
                                    {/*>*/}
                                        {/*<Icon name='eye' style={{fontSize: 20, color: 'black', paddingRight: 5}}/>*/}
                                        {/*{*/}
                                            {/*this.state.follow ? <Text>Отписаться</Text> : <Text>Хочу посмотреть</Text>*/}
                                        {/*}*/}
                                    {/*</Button>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        {/*{ (shots.length > 0 || videos.length > 0) &&*/}
                            {/*<View>*/}
                                {/*<View style={{flexDirection: "row", padding: 5}}>*/}
                                    {/*<Icon name='film' style={{fontSize: 14, color: '#CF5768', paddingRight: 5}}/>*/}
                                    {/*<Text style={{fontSize: 14}}>*/}
                                        {/*Трейлер и кадры*/}
                                    {/*</Text>*/}
                                {/*</View>*/}
                                {/*<View*/}
                                    {/*style={styles.scrollContainer}*/}
                                {/*>*/}
                                    {/*<ScrollView*/}
                                        {/*horizontal*/}
                                        {/*pagingEnabled*/}
                                        {/*showsHorizontalScrollIndicator={false}*/}
                                    {/*>*/}
                                        {/*{videos.map((video, index) => (*/}
                                            {/*<TouchableOpacity key={index} onPress={() => Linking.openURL('https://youtube.com/watch?v=' + video).catch(err => console.error('An error occurred', err))}>*/}
                                                {/*<View style={styles.trailerContainer}>*/}
                                                    {/*<Image*/}
                                                        {/*source={{uri: 'https://img.youtube.com/vi/' + video + '/default.jpg'}}*/}
                                                        {/*style={styles.cardImage}*/}
                                                    {/*>*/}
                                                    {/*</Image>*/}
                                                    {/*<View style={{*/}
                                                        {/*justifyContent: 'center',*/}
                                                        {/*alignItems: 'center',*/}
                                                        {/*position: 'absolute',*/}
                                                    {/*}}>*/}
                                                        {/*<Image*/}
                                                            {/*resizeMode="contain"*/}
                                                            {/*source={require("../../../../assets/images/media_youtube.png")}*/}
                                                            {/*style={{height: 50, width: 50, top: 30, left: 40}}/>*/}
                                                    {/*</View>*/}
                                                {/*</View>*/}
                                                {/*/!*<View >*!/*/}
                                                    {/*/!*<Image style={styles.videoLayoutImage} source={require("../../../../assets/images/media_youtube.png")} />*!/*/}
                                                    {/*/!*<Image style={styles.cardImage} source={{uri: 'https://img.youtube.com/vi/' + video + '/default.jpg'}} />*!/*/}
                                                {/*/!*</View>*!/*/}
                                            {/*</TouchableOpacity>*/}
                                        {/*))}*/}

                                        {/*{shots.map((image, index) => (*/}
                                            {/*<TouchableOpacity key={index} onPress={() => this.viewerHandler(shots.indexOf(image))}>*/}
                                                {/*<Image style={styles.cardImage} source={{uri: image}} />*/}
                                            {/*</TouchableOpacity>*/}
                                        {/*))}*/}
                                    {/*</ScrollView>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        {/*}*/}
                    </ScrollView>
                    {/*<SetRatingPage*/}
                        {/*img={movie.image_url_small}*/}
                        {/*visible={this.state.visible}*/}
                        {/*onClose={this.onCloseRatingsHandler}*/}
                        {/*rate={rate}*/}
                        {/*comment={comment}*/}
                        {/*onSave={this.onChangeRate}*/}
                    {/*/>*/}
                    {/*<ImageView visible={this.state.viewerVisible} page={this.state.imageNumberSelected} images={shots} onClose={this.onCloseViewerHandler}/>*/}
                    {/*<FriendsRating*/}
                        {/*visible={this.state.friendsModalVisible}*/}
                        {/*onClose={this.onCloseFriendsRatingHandler}*/}
                        {/*movie={movie.id}/>*/}
                </View>
            </Container>
		);
	}
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        height: height*0.4,
        borderWidth: 1,
        borderColor: '#a5abb6',
        marginBottom: 5
    },
    cardImage: {
        width: width,
        height: '100%',
    },
    trailerContainer: {
        flex: 1,
        width: width/3,
        height: 100,
        margin: 1,
    }
});

export default FlatPage;
