import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class DriverProfile extends React.Component {
  userData = this.props.route.params.userData;
  render() {
    return (
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 20,
        }}>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: 'green'}]}>
              <FontAwesome name="user" size={24} style={{color: 'white'}} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Name</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.name == null ? '-' : this.userData.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: 'red'}]}>
              <Email name="email" size={24} style={{color: 'white'}} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Email</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.email == null ? '-' : this.userData.email}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: '#0163d2'}]}>
              <FontAwesome name="user-o" size={24} style={{color: 'white'}} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>User Type</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.userType == null ? '-' : this.userData.userType}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: 'green'}]}>
              <FontAwesome name="taxi" size={20} style={{color: 'white'}} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Taxi Number</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.taxiNumber == null
                  ? '-'
                  : this.userData.taxiNumber}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: 'red'}]}>
              <FontAwesome
                name="drivers-license"
                size={20}
                style={{color: 'white'}}
              />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>License Id</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.licenseId == null
                  ? '-'
                  : this.userData.licenseId}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: '#0163d2'}]}>
              <FontAwesome name="vcard-o" size={20} style={{color: 'white'}} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Aadhar Number</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.aadhar == null ? '-' : this.userData.aadhar}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: 'green'}]}>
              <FontAwesome
                name="credit-card"
                size={20}
                style={{color: 'white'}}
              />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>Account Number</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.accountNumber == null
                  ? '-'
                  : this.userData.accountNumber}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoMain}>
          <View style={styles.infoCont}>
            <View style={[styles.infoIconCont, {backgroundColor: 'red'}]}>
              <FontAwesome
                name="credit-card"
                size={20}
                style={{color: 'white'}}
              />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoSmall_Text}>IFSC</Text>
              <Text style={styles.infoLarge_Text} numberOfLines={1}>
                {this.userData.ifsc == null ? '-' : this.userData.ifsc}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default DriverProfile;
const styles = StyleSheet.create({
  infoMain: {
    marginTop: 10,
  },
  infoCont: {
    width: '100%',
    flexDirection: 'row',
  },
  infoIconCont: {
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,

    alignItems: 'center',
    elevation: -5,
    borderColor: 'black',
    backgroundColor: 'black',
  },

  infoText: {
    width: '80%',
    flexDirection: 'column',
    marginLeft: 25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#e6e6e6',
  },
  infoSmall_Text: {
    fontSize: 13,
    color: '#878686',
    fontWeight: '500',
  },
  infoLarge_Text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});
