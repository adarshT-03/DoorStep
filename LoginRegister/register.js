import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton, ActivityIndicator} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      userType: 'user',
      password: '',
      confirmPassword: '',
      emailVerify: '',
      taxiNumber: '',
      licenseId: '',
      aadharNUmber: '',
      accountNumber: '',
      ifsc: '',
      loading: false,
    };
  }
  handleEmail(e) {
    var email = e.nativeEvent.text;
    this.setState({
      email: email,
      emailVerify: false,
    });
    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
      this.setState(
        {
          email: email,
          emailVerify: true,
        },
        function () {
          console.log(this.state.emailVerify);
        },
      );
    }
  }
  async handleSubmit() {
    if (
      this.state.name == '' ||
      this.state.email == '' ||
      this.state.password == '' ||
      this.state.userType == ''
    ) {
      alert('Please fill all the details!!!');
    } else if (!this.state.emailVerify) {
      alert('Please enter proper email address e.g xavier@gmail.com');
    } else if (this.state.password.length < 6) {
      alert('Password length should be greater then 6 letters.');
    } else if (this.state.userType == 'driver') {
      if (
        this.state.taxiNumber == '' ||
        this.state.aadharNUmber == '' ||
        this.state.accountNumber == '' ||
        this.state.ifcs == '' ||
        this.state.licenseId == ''
      ) {
        alert('Please fill all the details!!!');
      } else {
        this.setState({
          loading: true,
        });
        await fetch(
          'https://doorstep-server-api.herokuapp.com/register-new-user',
          {
            method: 'POST',
            crossDomain: true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              name: this.state.name,
              email: this.state.email,
              encryptedPassword: this.state.password,
              userType: this.state.userType,
              taxiNumber: this.state.taxiNumber,
              licenseId: this.state.licenseId,
              aadhar: this.state.aadharNUmber,
              accountNumber: this.state.accountNumber,
              ifsc: this.state.ifsc,
              status: 0,
            }),
          },
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.status == 'ok') {
              alert('Registered Successful');
              this.props.navigation.navigate('Login');
              this.setState({
                loading: false,
              });
            } else {
              alert(data.error);
              this.setState({
                loading: false,
              });
            }
            this.setState({
              loading: false,
            });
          });
      }
    } else {
      this.setState({
        loading: true,
      });
      // alert(1);
      await fetch('https://doorstep-server-api.herokuapp.com/register-new-user', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          encryptedPassword: this.state.password,
          userType: this.state.userType,
          status: 1,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status == 'ok') {
            alert('Registered Successful');
            this.props.navigation.navigate('Login');
            this.setState({
              loading: false,
            });
          } else {
            alert(data.error);
            this.setState({
              loading: false,
            });
          }
          this.setState({
            loading: false,
          });
        });
    }
    console.log(this.state);
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        keyboardShouldPersistTaps="always">
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/RegisterImage.png')}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Register!!</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginLeft: 0,
              }}>
              <View
                style={{
                  marginRight: 50,
                }}>
                <Text
                  style={{color: '#0163d2', fontSize: 20, fontWeight: 'bold'}}>
                  Register as
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 20,
                  }}>
                  <RadioButton
                    color="#0163d2"
                    uncheckedColor="#0163d2"
                    value="user"
                    status={
                      this.state.userType === 'user' ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      this.setState({
                        userType: 'user',
                      })
                    }
                  />
                  <Text style={{color: '#0163d2', fontSize: 16}}>User</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}>
                  <RadioButton
                    color="#0163d2"
                    uncheckedColor="#0163d2"
                    value="driver"
                    status={
                      this.state.userType === 'driver' ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      this.setState({
                        userType: 'driver',
                      })
                    }
                  />
                  <Text style={{color: '#0163d2', fontSize: 16}}>Driver</Text>
                </View>
              </View>
            </View>

            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#0163d2"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Name"
                autoCapitalize="words"
                placeholderTextColor="#b0b0b0"
                style={styles.textInput}
                value={this.state.name}
                onChange={e => this.setState({name: e.nativeEvent.text})}
              />
            </View>
            <View style={styles.action}>
              <FontAwesome
                name="envelope"
                color="#0163d2"
                style={[styles.smallIcon, {fontSize: 20}]}
              />
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="#b0b0b0"
                style={styles.textInput}
                value={this.state.email}
                onChange={e => this.handleEmail(e)}
              />
            </View>
            {this.state.userType == 'driver' ? (
              <>
                <View style={styles.action}>
                  <FontAwesome
                    name="taxi"
                    color="#0163d2"
                    style={[
                      styles.smallIcon,
                      {
                        fontSize: 20,
                        marginTop: 2,
                      },
                    ]}
                  />
                  <TextInput
                    placeholder="Taxi Number"
                    autoCapitalize="words"
                    placeholderTextColor="#b0b0b0"
                    style={styles.textInput}
                    value={this.state.taxiNumber}
                    onChange={e =>
                      this.setState({taxiNumber: e.nativeEvent.text})
                    }
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome
                    name="drivers-license"
                    color="#0163d2"
                    style={[
                      styles.smallIcon,
                      {
                        fontSize: 20,
                        marginTop: 2,
                      },
                    ]}
                  />
                  <TextInput
                    placeholder="License Id"
                    autoCapitalize="words"
                    placeholderTextColor="#b0b0b0"
                    style={styles.textInput}
                    value={this.state.licenseId}
                    onChange={e =>
                      this.setState({licenseId: e.nativeEvent.text})
                    }
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome
                    name="vcard-o"
                    color="#0163d2"
                    style={[
                      styles.smallIcon,
                      {
                        fontSize: 20,
                        marginTop: 2,
                      },
                    ]}
                  />
                  <TextInput
                    placeholder="Aadhar Number"
                    autoCapitalize="words"
                    placeholderTextColor="#b0b0b0"
                    style={styles.textInput}
                    value={this.state.aadharNUmber}
                    onChange={e =>
                      this.setState({aadharNUmber: e.nativeEvent.text})
                    }
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome
                    name="credit-card"
                    color="#0163d2"
                    style={[
                      styles.smallIcon,
                      {
                        fontSize: 20,
                        marginTop: 2,
                      },
                    ]}
                  />
                  <TextInput
                    placeholder="Account Number"
                    autoCapitalize="words"
                    placeholderTextColor="#b0b0b0"
                    style={styles.textInput}
                    value={this.state.accountNumber}
                    onChange={e =>
                      this.setState({accountNumber: e.nativeEvent.text})
                    }
                  />
                </View>
                <View style={styles.action}>
                  <FontAwesome
                    name="credit-card"
                    color="#0163d2"
                    style={[
                      styles.smallIcon,
                      {
                        fontSize: 20,
                        marginTop: 2,
                      },
                    ]}
                  />
                  <TextInput
                    placeholder="Ifsc"
                    autoCapitalize="words"
                    placeholderTextColor="#b0b0b0"
                    style={styles.textInput}
                    value={this.state.ifsc}
                    onChange={e => this.setState({ifsc: e.nativeEvent.text})}
                  />
                </View>
              </>
            ) : null}

            <View style={styles.action}>
              <FontAwesome
                name="lock"
                color="#0163d2"
                style={styles.smallIcon}
              />
              <TextInput
                placeholder="Password"
                autoCapitalize="none"
                placeholderTextColor="#b0b0b0"
                style={styles.textInput}
                value={this.state.password}
                secureTextEntry={!this.state.showPassword}
                onChange={e => this.setState({password: e.nativeEvent.text})}
              />
              <TouchableOpacity
                style={{marginRight: 10}}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                onPress={() =>
                  this.setState({
                    showPassword: !this.state.showPassword,
                  })
                }>
                {this.state.password.length < 1 ? null : this.state
                    .showPassword ? (
                  <Feather
                    name="eye-off"
                    style={{marginRight: -10}}
                    color={this.state.password.length < 1 ? null : 'green'}
                    size={23}
                  />
                ) : (
                  <Feather
                    name="eye"
                    style={{marginRight: -10}}
                    color={this.state.password.length < 1 ? null : 'green'}
                    size={23}
                  />
                )}
              </TouchableOpacity>

              {/* {this.state.uemail.length < 9 ? null : (
              <Feather name="check-circle" color="green" size={20} />
            )} */}
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.handleSubmit();
                }}
                style={styles.inBut}>
                <View>
                  {this.state.loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.textSign}>Register</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Register;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 260,
    width: '100%',
    marginTop: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,

    paddingHorizontal: 15,

    borderWidth: 1,
    borderColor: '#0163d2',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,

    color: '#05375a',
  },
  loginContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#0163d2',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: -20,
    alignItems: 'center',
    textAlign: 'center',
    margin: 20,
  },
  inBut: {
    marginTop: 15,
    width: '70%',
    backgroundColor: '#0163d2',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  inBut2: {
    backgroundColor: '#420475',
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallIcon2: {
    fontSize: 40,
    // marginRight: 10,
  },
  bottomText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
});
