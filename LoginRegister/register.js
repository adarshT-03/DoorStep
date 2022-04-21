import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Register extends React.Component {
  render() {
    return (
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
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#0163d2"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Mobile or Email"
              autoCapitalize="none"
              placeholderTextColor="#b0b0b0"
              style={styles.textInput}
              //   value={this.state.uemail}
              //   onChange={e => this.handleEmail(e)}
            />

            {/* {this.state.uemail.length < 9 ? null : (
              <Feather name="check-circle" color="green" size={20} />
            )} */}
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#0163d2"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Mobile or Email"
              autoCapitalize="none"
              placeholderTextColor="#b0b0b0"
              style={styles.textInput}
              //   value={this.state.uemail}
              //   onChange={e => this.handleEmail(e)}
            />

            {/* {this.state.uemail.length < 9 ? null : (
              <Feather name="check-circle" color="green" size={20} />
            )} */}
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#0163d2"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Mobile or Email"
              autoCapitalize="none"
              placeholderTextColor="#b0b0b0"
              style={styles.textInput}
              //   value={this.state.uemail}
              //   onChange={e => this.handleEmail(e)}
            />

            {/* {this.state.uemail.length < 9 ? null : (
              <Feather name="check-circle" color="green" size={20} />
            )} */}
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#0163d2" style={styles.smallIcon} />
            <TextInput
              placeholder="Mobile or Email"
              autoCapitalize="none"
              placeholderTextColor="#b0b0b0"
              style={styles.textInput}
              //   value={this.state.uemail}
              //   onChange={e => this.handleEmail(e)}
            />

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
            <TouchableOpacity style={styles.inBut}>
              <View>
                {/* {this.state.loading ? (
                  <ActivityIndicator color="white" />
                ) : ( */}
                <Text style={styles.textSign}>Register</Text>
                {/* )} */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
