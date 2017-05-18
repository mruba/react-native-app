/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Animated,
  Easing,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

class List extends Component{
  render(){
    let items = this.props.data.map((value, key) => {
      return(
        <Text key={key} onClick={
          () => this.props.fn(key)
        }>{value.name}</Text>
      )
    })

    return (
            <View>
              {items}
            </View>)
  }
}



class ChatScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      pokemons: [
        {
          name: 'charmander',
          desempleado: false
        },
        {
          name: 'squerer',
          desempleado: true
        },
        {
          name: 'charizard',
          desempleado: false
        }
      ]
    }
  }

addFunction (key) {
    // this.state.pokemons[key].desempleado = !this.state.pokemons[key].desempleado
    this.setState({
      pokemons: this.state.pokemons
    })
  }

  static navigationOptions = {
    title: 'Todo List',
  };
  render() {
    return (
      <View>
        <List data={this.state.pokemons} fn={this.addFunction.bind(this)}/>

      </View>
    );
  }
}



export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }



  constructor(props){
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
      profileImage : '',
      profileName : '',
      repoUrl : '',
      userRepos: []
    }
  }
  componentWillMount(){
    fetch('https://api.github.com/users/mruba')
      .then((response) => response.json())
      .then((responseJson) => {
        console.warn(responseJson)
        let {avatar_url, login, repos_url} = responseJson
        this.setState({
          profileImage : avatar_url,
          profileName : login,
          repoUrl : repos_url
        })
      })
  }

  componentDidMount() {
    Animated.timing(  // Uses easing functions
      this.state.fadeAnim, // The value to drive
        { toValue: 1,  // Target
          duration: 2000,  // Configuration
        },
    ).start();  // Don't forget start!
  }

  showRepositories(){

    fetch(this.state.repoUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.warn(responseJson)
        this.setState({
          userRepos: responseJson
        })
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    let tasks = [
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
      {name: 'hola mundo', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy'},
    ]
    return (
      <View style={styles.container}>

        <View style={{flex: 1, flexDirection: 'column'}}>
         <Animated.View  // Special animatable View
            style={{ opacity: this.state.fadeAnim,  // Binds
            }}>
            <View
              style={{width: 400, height: 150,
                backgroundColor: 'steelblue',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
                }} >
              <Image
                style={{width: 90, height: 90, borderRadius: 50}}
                source={{uri: this.state.profileImage}}
              />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.name}>
                  Hello {this.state.profileName}
                </Text>

                <Text style={styles.instructions}>
                  To get started, edit index.ios.js
                </Text>

                <Button
                  onPress={this.showRepositories.bind(this)}
                  title="Show me the repos!"
                />

                <Button
                  onPress={() => navigate('Chat')}
                  title="Contact Me!"
                />
              </View>
            </View>
          </Animated.View>
          <View
            style={{width: 400, height: 100,
              justifyContent: 'center',
              alignItems: 'flex-end',
              flexDirection: 'row'
              }} >
            <View style={{width: 200,
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              backgroundColor: 'skyblue'}}>
              <Text style={styles.number}>
                12
              </Text>
              <Text style={styles.task}>
                remaning task!
              </Text>
            </View>
            <View style={{width: 200,
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              backgroundColor: 'pink'}}>
              <Text style={styles.number}>
                32
              </Text>
              <Text style={styles.task}>
                completed task!
              </Text>
            </View>
          </View>

          <View
            style={{width: 300, height: 50,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'column'
              }} >
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.today}>
                Today
              </Text>
            </View>

            <View >
              {this.state.userRepos.map((item)=>{
                return (
                  <Text style={styles.today}>
                    {item.name}
                  </Text>
                )
              })}
            </View>
          </View>

        </View>



        {/* <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <View>
          <Text>Hello, Chat App!</Text>
          <Button
            onPress={() => navigate('Chat')}
            title="Chat with Lucy"
          />
        </View> */}
      </View>
    );
  }
}

const nativeTest = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  today:{
    fontSize: 20,
    color: 'gray',
    paddingLeft: 30
  },
  number:{
    fontSize: 20,
    color: '#FFFFFF',
  },
  task: {
    color: '#FFFFFF',
  },
  name:{
    fontSize: 20,
    color: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativeTest', () => nativeTest);
