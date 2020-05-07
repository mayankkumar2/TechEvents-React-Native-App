import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Logo from './assets/images/logo.png';
import Spinner from 'react-native-spinkit';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import axios from 'axios';
function f(month) {
  if (month == 'Jan') {
    return '01';
  } else if (month.slice(0, 3) == 'Feb') {
    return '02';
  } else if (month.slice(0, 3) == 'Mar') {
    return '03';
  } else if (month.slice(0, 3) == 'Apr') {
    return '04';
  } else if (month.slice(0, 3) == 'May') {
    return '05';
  } else if (month.slice(0, 3) == 'Jun') {
    return '06';
  } else if (month.slice(0, 3) == 'Jul') {
    return '07';
  } else if (month.slice(0, 3) == 'Aug') {
    return '08';
  } else if (month.slice(0, 3) == 'Sep') {
    return '09';
  } else if (month.slice(0, 3) == 'Oct') {
    return '10';
  } else if (month.slice(0, 3) == 'Nov') {
    return '11';
  } else if (month.slice(0, 3) == 'Dec') {
    return '12';
  }
}

export default class App extends React.Component {
  state = {
    events: [],
  };
  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: '#34495E', paddingHorizontal: 10}}>
        <Image
          source={Logo}
          resizeMode="contain"
          style={{alignSelf: 'center', height: 200}}
        />
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            backgroundColor: '#EEEE',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <ScrollView
            style={{
              padding: 10,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            {this.state.events.map((value, index) => {
              return (
                <>
                  <View
                    style={{
                      backgroundColor: 'rgb(255,255,255)',
                      height: 150,
                      borderWidth: 0.5,
                      borderRadius: 10,
                      borderColor: 'rgba(72,72,72,0.4)',
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          paddingLeft: 10,
                          overflow: 'hidden',
                        }}>
                        <Text
                          style={{
                            fontFamily: 'BalooBhaina2-Medium',
                          }}>
                          Name:{' '}
                          <Text style={{fontFamily: 'BalooBhaina2-Bold'}}>
                            {' ' + this.state.events[index]['name']}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'BalooBhaina2-Medium',
                          }}>
                          Start Date:{' '}
                          <Text style={{fontFamily: 'BalooBhaina2-Bold'}}>
                            {' ' + this.state.events[index]['startDate']}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'BalooBhaina2-Medium',
                          }}>
                          Start Time:{' '}
                          <Text style={{fontFamily: 'BalooBhaina2-Bold'}}>
                            {' ' + this.state.events[index]['startTime']}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'BalooBhaina2-Medium',
                          }}>
                          End Date:{' '}
                          <Text style={{fontFamily: 'BalooBhaina2-Bold'}}>
                            {' ' + this.state.events[index]['endDate']}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'BalooBhaina2-Medium',
                          }}>
                          End Time:{' '}
                          <Text style={{fontFamily: 'BalooBhaina2-Bold'}}>
                            {' ' + this.state.events[index]['endTime']}
                          </Text>
                        </Text>
                        <Image
                          source={require('./assets/images/codechef_avatar.png')}
                          resizeMode="contain"
                          style={{
                            position: 'absolute',
                            bottom: -5,
                            height: 150,
                            right: -105,
                            opacity: 0.6,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          height: 150,
                          width: 100,
                          padding: 5,
                          backgroundColor: 'transparent',
                        }}>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            borderRadius: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#6894C1',
                          }}
                          onPress={() => {
                            let startDate = this.state.events[index][
                              'startDate'
                            ]
                              .trim()
                              .split(' ');
                            let DateStr =
                              startDate[2] +
                              '-' +
                              f(startDate[1]) +
                              '-' +
                              startDate[0] +
                              'T' +
                              this.state.events[index]['startTime'].trim() +
                              '.000+05:30';
                            let endDate = this.state.events[index]['endDate']
                              .trim()
                              .split(' ');
                            let endStr =
                              endDate[2] +
                              '-' +
                              f(endDate[1]) +
                              '-' +
                              endDate[0] +
                              'T' +
                              this.state.events[index]['endTime'].trim() +
                              '.000+05:30';
                            const config = {
                              title:
                                this.state.events[index]['code'].trim() +
                                ' - ' +
                                this.state.events[index]['name'],
                              startDate: new Date(DateStr).toISOString(),
                              endDate: new Date(endStr).toISOString(),
                              notes: this.state.events[index]['href'],
                            };
                            AddCalendarEvent.presentEventCreatingDialog(config)
                              .then(
                                (eventInfo) => {
                                  // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
                                  // These are two different identifiers on iOS.
                                  // On Android, where they are both equal and represent the event id, also strings.
                                  // when { action: 'CANCELED' } is returned, the dialog was dismissed
                                  console.warn(JSON.stringify(eventInfo));
                                },
                              )
                              .catch((error) => {
                                // handle error such as when user rejected permissions
                                console.warn(error);
                              });
                          }}>
                          <Icon name="calendar" color="white" size={50} />
                        </TouchableOpacity>
                        <View style={{height: 4}} />
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            borderRadius: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#49698C',
                          }}
                          onPress={async () => {
                            let url = this.state.events[index]['href'].trim();
                            // Checking if the link is supported for links with custom URL scheme.
                            const supported = await Linking.canOpenURL(url);

                            if (supported) {
                              // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                              // by some browser in the mobile
                              await Linking.openURL(url);
                            } else {
                              Alert.alert(
                                `Don't know how to open this URL: ${url}`,
                              );
                            }
                          }}>
                          <MaterialIcon name="web" color="white" size={50} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{height: 10}} />
                </>
              );
            })}
            {this.state.events.length == 0 ? (
              <Spinner
                style={{alignSelf: 'center'}}
                isVisible={true}
                color="#4500b3"
                size={300}
                type="Pulse"
              />
            ) : (
              <>
                <View style={{height: 100}} />
              </>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  async componentDidMount() {
    let value = await axios
      .get('https://cp-events-api.herokuapp.com/api/v1/codechef')
      .catch(err => alert(err));
    while (value.status != 200) {
      value = await axios
        .get('https://cp-events-api.herokuapp.com/api/v1/codechef')
        .catch(err => alert(err));
    }
    if (value.status == 200) {
      this.setState({
        events: value.data.events,
      });
    } else {
      alert('Error! fetching the events');
    }
  }
}
