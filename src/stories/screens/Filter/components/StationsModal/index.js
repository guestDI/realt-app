import * as React from "react";

import {
    Header,
    Text,
    Footer,
    FooterTab,
    Content,
    Icon
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
import Accordion from 'react-native-collapsible/Accordion';

export interface State {}

const { height, width } = Dimensions.get("window");
const DataArray = [
    { title: "m_line", content: "Московская линия" },
    { title: "a_line", content: "Автозаводская линия" }
];

class StationsModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    let stations = this.props.stations ? this.props.stations : [];

    this.state = {
      isModalOpen: this.props.isModalStationOpen,
      allStationsSelected: stations.length === this.props.moscowLine.length + this.props.zavodLine.length,
      lineStations: stations.slice()
    };
  }

  componentWillReceiveProps(nextProps) {
        if (this.props.isModalStationOpen !== nextProps.isModalStationOpen) {
            this.setState({
                isModalStationOpen: nextProps.isModalStationOpen,
            });
        }
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

    }

  manageAllStationsState = () => {
    let currentState = !this.state.allStationsSelected
    this.setState({
        allStationsSelected: currentState
    })

    if(currentState){
        let commonArray = this.props.moscowLine.concat(this.props.zavodLine);
        this.setState({
            lineStations: commonArray
        })
    } else if(!currentState){
        this.setState({
            lineStations: []
        })
    }

  }

  saveSelectedStations = () => {
    if (this.props.onStationsSaved) {
      this.props.onStationsSaved(this.state.lineStations);
    }

    // console.log(this.state.lineStations)
    this.props.closeSubwayModal()
  }

    _renderHeader = (section) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.content}</Text>
                <Icon
                    active
                    name="ios-arrow-down"
                    style={{color: "#FFF", zIndex: 9999, fontSize: 18, marginRight: 10}}
                />
            </View>
        );
    }


    checkStationInTheList = (station) => {
        this.state.lineStations.map(item => {
            if(item.name === station.name){
                return true;
            }
        })
        return false;
    }

    _renderContent = section => {
        let lines = section.title === "m_line" ? this.props.moscowLine.slice() : this.props.zavodLine.slice()

        //console.log('s', this.state.lineStations)

        lines.map((el, index) => {
            let flatIndex = this.state.lineStations.map(item => {
                return item.name;
            }).indexOf(el.name);
            lines[index].status = flatIndex > -1;
        })

        //console.log(lines)

      return(
          <ScrollView>
            { lines.map((s, index)=>{
              return(
                <View key={index} style={{alignSelf: 'center', width: width*0.95,}}>
                  <StationCheckbox key={index} station={s} checked={s.status}
                                   onCheckChanged={this.addStationToTheLine}/>
                </View>
              )
            })}
          </ScrollView>
        )
    }

  render() {
      //console.log('stations',this.props.stations)
    return (
        <Modal isOpen={this.state.isModalOpen} onClosed={() => {
            this.setState({isModalOpen: false});
            this.props.closeSubwayModal();
        }}
               style={[styles.modal, styles.modal1]} backButtonClose={true}
               position={"bottom"} ref={"modal1" } swipeToClose={false} backdropPressToClose={false}>
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
            <Content padder>
                <Accordion
                    sections={DataArray}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    //activeSection={0}
                />
            </Content>
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
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#87b357c4',
        padding: 10,
        borderRadius: 3,
        marginBottom: 7
    },
    headerText: {
      fontSize: 17,
      fontWeight: "500",
      color: '#FFF'
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
});

export default StationsModal;
