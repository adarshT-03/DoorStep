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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }
  _retrieveData = async key => {
    try {
      const data = await AsyncStorage.getItem('token');
      console.log(data, 'token at tabNavigation');
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
  async handleLogin() {
    if (this.state.email == '' || this.state.password == '') {
      alert('Please fill all the details!!!');
    } else {
      this.setState({
        loading: true,
      });
      await fetch('https://doorstep-server-api.herokuapp.com/login-user', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status == 'ok') {
            AsyncStorage.setItem('isLogged', JSON.stringify(true));
            AsyncStorage.setItem('token', JSON.stringify(data.data));
            this.props.navigation.navigate('Home');
            alert('Login Successful!!');
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
  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/LoginImage.png')}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login Here!!</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#0163d2"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor="#b0b0b0"
              style={styles.textInput}
              value={this.state.email}
              onChange={e =>
                this.setState({
                  email: e.nativeEvent.text,
                })
              }
            />

            {/* {this.state.uemail.length < 9 ? null : (
              <Feather name="check-circle" color="green" size={20} />
            )} */}
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#0163d2" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              placeholderTextColor="#b0b0b0"
              style={styles.textInput}
              value={this.state.password}
              secureTextEntry={!this.state.showPassword}
              onChange={e =>
                this.setState({
                  password: e.nativeEvent.text,
                })
              }
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
                this.handleLogin();
              }}
              style={styles.inBut}>
              <View>
                {this.state.loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.textSign}>Log in</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 15}}
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#919191'}}>
                New User Register Here!!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Login;
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
