import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, Dimensions } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { Button } from '../components/Button';
import { Spinner } from '../components/Spinner';

export default class Login extends Component {
  static navigationOptions = {
      headerStyle: {
          backgroundColor: '#9D2235',
        },
  };

  constructor(props) {
      super(props);
      //this.studentRef = firebase.firestore().collection('students');
      //this.unsubscribe = null;
      this.state = {
          loading: true,
      }
  }

  checkIfStudentExist = ()  => {
    const db = firebase.firestore();
    var found = false;
    //010222111
    const studentRef = db.collection('students').doc(this.state.ID);
    //this.props.navigation.navigate('App');
    studentRef.get().then(function(doc) {
        if(doc.exists) {
            console.log(doc.data());
            found = true;
            console.log(found);
            
        } else {
            console.log("No student exist");
        }
    }).catch(function(error) {
        console.log("Error getting document: ", error);
    });
    console.log('2' +found);
    if(found)
    {
        this.props.navigation.navigate('App');   
    }
  }

/*   componentWillUnmount() {
      this.unsubscribe();
  } */

/*   onCollectionUpdate = (querySnapshot) => {
      const students = [];

      querySnapshot.forEach((doc) => {
          const { id } = doc.data();
          console.log(id);
          students.push({
              key: doc.id,
              doc,
              id
          });
      });

      this.setState({
          students,
          loading: false,
      });
  } */

  state = {
    ID: '',
  };

  loginToApp = () => {
    console.log('Login in');
    this.props.navigation.navigate('App');
  }

    render() {
/*         if(this.state.loading) {
            return (
                <Spinner></Spinner>
            )
        } */
        return (
            <View style={styles.container}>
                <Image source={require('./img/Logo.png')} style={{flex: 1, alignSelf: 'center', height: 200, width: 200}} resizeMode="contain" />
                <TextInput style={styles.User} placeholder="Student ID" onChangeText={(value) => this.setState({ID: value})}/>
                <Button color="#ffffff" onPress={() => { this.checkIfStudentExist(); }}>
                    {'Login'}
                </Button>
                <View style={{flex: 1}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9D2235',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        flex: 0
    },
    User: {
        textAlign: 'center',
        color: '#ffffff',

    },
    buttonStyle: {
      backgroundColor: '#ffffff',
    }
});
