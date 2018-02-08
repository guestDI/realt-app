import * as React from "react";
import {Header, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail} from "native-base";

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

class FilterView extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    componentWillReceiveProps(newProps) {
        const {rate: oldRate, comment: oldComment} = this.props;
        const {rate: newRate, comment: newComment} = newProps;
        if (oldRate !== newRate || oldComment !== newComment) {
            this.setRateAndComment(newRate, newComment);
        }
    }

    setRateAndComment = (rate, comment) => {
        this.onStarRatingPress(rate);
        this.setState({
            comment: comment
        });
    }

    returnRating = (rate) => {
        switch (rate) {
            case 1:
                return rates[1];
            case 2:
                return rates[2];
            case 3:
                return rates[3];
            case 4:
                return rates[4];
            case 5:
                return rates[5];
            default:
                return rates[0];
        }
    }

    onSave = () => {
        this.props.onClose();
        this.props.onSave({rate: this.state.starCount, comment: this.state.comment})
    }

	render() {
		// const param = this.props.navigation.state.params;
		let emotion = this.state.emotion;
		let rate = this.returnRating(this.state.starCount);

		return (
			<Modal
				animationType={'slide'}
				transparent={true}
				onDismiss={this.props.onClose}
				onRequestClose={this.props.onClose}
				visible={this.props.visible}>
                <ScrollView>
                    <View style={styles.containerStyle}>
                        <View style={{flex: 1}}>
                            <Image
                                source={{uri: this.props.img}}
                                style={{height: height*0.2}}
                            >
                            </Image>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image
                                    resizeMode="contain"
                                    source={rate.image}
                                    style={{height: 90, width: 90, position: 'absolute', }}/>
                            </View>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '2%'}}>
                            <Text style={{fontSize: 24, color: '#E25042', fontFamily: 'sans-serif-medium',}}>{rate.desc}</Text>
                        </View>
                        <View style={styles.ratingsContainer}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                starColor="#E25042"
                                emptyStarColor="#a5abb6"
                                starSize={40}
                                starStyle={{padding: 3}}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                        <View style={{paddingTop: 20}}>
                            <View style={{flexDirection: "row", paddingLeft: 10}}>
                                <Icon name='chatboxes' style={{fontSize: 20, color: '#a5abb6', paddingRight: 5}}/>
                                <Text style={{fontSize: 14}}>
                                    Оставить комментарий (необязательно)
                                </Text>
                            </View>
                            <View style={{padding: 10, paddingTop: 5}}>
                                <TextInput
                                    value={this.state.comment}
                                    style={{ height: 120, borderColor: '#a5abb6', borderWidth: 1, borderRadius: 5,
                                        textAlignVertical: 'top', padding: 3}}
                                    editable = {true}
                                    maxLength = {250}
                                    underlineColorAndroid='transparent'
                                    multiline={true}
                                    onChangeText={text => this.setState({comment: text})}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: 'center', justifyContent: "center", padding: 10, paddingTop: 0}}>
                            <Button bordered transparent
                                    onPress={() => this.props.onClose()}
                                    style={{flex: 2, justifyContent: 'center', borderColor: '#bec4cf', borderRadius: 3,}}
                            >
                                {/*<Icon name='save' style={{fontSize: 20, color: 'black', paddingRight: 5}}/>*/}
                                <Text style={{color: 'black'}}>Не сейчас</Text>
                            </Button>
                            <Button bordered transparent
                                    style={{flex: 2, justifyContent: 'center', borderColor: '#bec4cf', borderRadius: 3,}}
                                    onPress={this.onSave}
                            >
                                {/*<Icon name='save' style={{fontSize: 20, color: 'black', paddingRight: 5}}/>*/}
                                <Text style={{color: 'black'}}>Оценить</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
			</Modal>
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

export default FilterView;
