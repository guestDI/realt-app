import * as React from "react";

import {
    Header,
    Text,
    Footer,
    FooterTab
} from "native-base";

import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Slider,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import { CheckBox } from 'react-native-elements'
import StationCheckbox from '../StationCheckbox/index'
import Modal from 'react-native-modalbox';

export interface State {}

const { height, width } = Dimensions.get("window");

class StationsModal extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: this.props.isModalStationOpen,
      allStationsSelected: false,
      lineStations: []
    };
  }

  componentWillReceiveProps(nextProps) {
        if (this.props.isModalStationOpen !== nextProps.isModalStationOpen) {
            this.setState({
                isModalStationOpen: nextProps.isModalStationOpen,
            });
        }

        // if(this.props.selectedLineStations !== nextProps.selectedLineStations){
        //     this.setState({
        //         lineStations: nextProps.selectedLineStations,
        //     });
        // }
    }

    addStationToTheLine = (station, status) => {
      let stations = this.state.lineStations.slice()
            if(status){
                this.setState({
                    lineStations: [...stations, station]
                })
            } else if(!status){
                let removeIndex = stations.map(function(item) { return item.name; }).indexOf(station.name);
                if (removeIndex > -1) {
                    stations.splice(removeIndex, 1);
                    this.setState({
                        lineStations: stations.slice(),
                        allStationsSelected: false
                    })
                }
        }
        //console.log(stations)
    }

  manageAllStationsState = () => {
    this.setState({
        allStationsSelected: !this.state.allStationsSelected
    })
  }

  saveSelectedStations = () => {
    if (this.props.onStationsSaved) {
      this.props.onStationsSaved(this.state.lineStations);
    }

    this.props.closeSubwayModal()
  }

  render() {
    return (
        <Modal isOpen={this.state.isModalOpen} onClosed={() => this.setState({isModalOpen: false})}
               style={[styles.modal, styles.modal1]} backButtonClose={true}
               position={"bottom"} ref={"modal1" } swipeToClose={true} backdropPressToClose={false}>
            <Header style={{ backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#dcdcdc'}}>
                <StatusBar
                    barStyle={ 'dark-content'}
                    backgroundColor={'#FFFFFF'}
                    translucent={false}
                />
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-between"
                }}>
                   <CheckBox
                     title="Выбрать все"
                     checked={this.state.allStationsSelected}
                     checkedColor={"#87b357c4"}
                     textStyle={{color:"#414141"}}
                     onPress={this.manageAllStationsState}
                     containerStyle={{borderColor: "#FFF", backgroundColor: '#FFF'}}
                   />
                   <TouchableOpacity onPress={this.props.closeSubwayModal} style={{marginRight: 10}}>
                     <Text style={{color:"#414141", fontSize: 14}}>Отмена</Text>
                   </TouchableOpacity>
                </View>
            </Header>
            <ScrollView style={{flexGrow: 1, marginBottom: 10}}>
                {this.props.selectedLine.map((s, index)=>{
                    return(
                        <View key={index} style={{alignSelf: 'center', width: width*0.95,}}>
                            <StationCheckbox key={index} station={s} checked={false}
                                             onCheckChanged={this.addStationToTheLine}/>
                        </View>
                    )
                })}
            </ScrollView>
            <Footer style={{height: '10%'}}>
                <FooterTab style={{backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#eeeeee', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={{height: '75%', width: '80%', borderWidth: 1, borderRadius: 3, borderColor: '#FFFFFF' , alignItems: 'center', justifyContent: 'center',
                        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1, backgroundColor: '#87b357c4' }}
                                      onPress={this.saveSelectedStations}>
                        <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>Выбрать</Text>
                    </TouchableOpacity>
                </FooterTab>
            </Footer>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    modal1: {
        height: height,
    },
});

export default StationsModal;
