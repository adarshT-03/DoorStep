import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/FontAwesome';

class AddLuggage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: new Date(),
      nameoforder: '',
      source: '',
      destination: '',
      weight: '',
      numberofitems: '',
      price: '',
    };
  }
  componentDidMount() {
    const date = this.state.date.toDateString();
    console.log(date);
  }
  render() {
    return (
      <>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1, backgroundColor: 'white'}}>
          <View>
            <DatePicker
              modal
              mode="date"
              theme="dark"
              open={this.state.open}
              date={this.state.date}
              onConfirm={date => {
                this.setState(
                  {
                    open: false,
                    date: date,
                  },
                  function () {
                    console.log(this.state.date.toLocaleDateString(), 'date');
                  },
                );
              }}
              onCancel={() => {
                this.setState({open: false});
              }}
            />
            <TextInput
              label="Name of order"
              //   value={this.state.author}
              onChange={e =>
                this.setState({
                  author: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            />
            <TextInput
              label="Source"
              //   value={this.state.author}
              onChange={e =>
                this.setState({
                  author: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            />
            <TextInput
              label="Destination"
              //   value={this.state.author}
              onChange={e =>
                this.setState({
                  author: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            />
            <TouchableOpacity
              onPress={() => this.setState({open: true})}
              style={{
                borderColor: '#0163d2',
                borderWidth: 1,
                marginHorizontal: 15,
                marginVertical: 10,
                paddingVertical: 18,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 16,
                }}>
                Date of Pickup
              </Text>
              <Feather name="calendar" size={25} color="black" />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginHorizontal: 15,
              }}>
              <TextInput
                label="Weight"
                //   value={this.state.author}
                onChange={e =>
                  this.setState({
                    author: e.nativeEvent.text,
                  })
                }
                clearButtonMode="always"
                mode="outlined"
                style={{
                  marginVertical: 10,
                  backgroundColor: 'white',
                  width: '45%',
                  marginRight: 10,
                }}
                activeOutlineColor="#0163D2"
                outlineColor={'#0163D2'}
              />
              <TextInput
                label="Number of Items"
                //   value={this.state.author}
                onChange={e =>
                  this.setState({
                    author: e.nativeEvent.text,
                  })
                }
                clearButtonMode="always"
                mode="outlined"
                style={{
                  marginVertical: 10,
                  backgroundColor: 'white',
                  width: '45%',
                }}
                activeOutlineColor="#0163D2"
                outlineColor={'#0163D2'}
              />
            </View>
            <TextInput
              label="Price"
              //   value={this.state.author}
              onChange={e =>
                this.setState({
                  author: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            />
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin:15,
              position:'relative',
              height:130,
              borderRadius:5
            }}>
            <View style={{position:'absolute',top:-40,marginLeft:10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                  
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin:15,
              position:'relative',
              height:130,
              borderRadius:5
            }}>
            <View style={{position:'absolute',top:-40,marginLeft:10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                  
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin:15,
              position:'relative',
              height:130,
              borderRadius:5
            }}>
            <View style={{position:'absolute',top:-40,marginLeft:10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                  
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin:15,
              position:'relative',
              height:130,
              borderRadius:5
            }}>
            <View style={{position:'absolute',top:-40,marginLeft:10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                  
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin:15,
              position:'relative',
              height:130,
              borderRadius:5
            }}>
            <View style={{position:'absolute',top:-40,marginLeft:10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                  
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,

              backgroundColor: '#0163D2',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Place Order
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
export default AddLuggage;
