import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component {
constructor(){
  super();
  this.state={
    text:'',
    isSearchedPressed:false,
    word:'',
    lexicalCategory:'',
    examples: '',
    definition:'',
    displayText:'',
  }
}

getWord =(word)=>{
  var searchKeyword=word.toLowerCase();
  var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
  return fetch(url)
  .then((data)=>{
    if(data.status === 200){
      return data.json()
    }
    else{
      return null
    }
  })
  .then((response)=>{
    var responseObject = response;
    if(responseObject){
      var wordData = responseObject.definition[0]
      var definition = wordData.description
      var lexicalCategory = wordData.wordtype

      this.setState({
        "word": this.state.text,
        "definition": definition,
        "lexicalCategory": lexicalCategory
      }) 
    } else{
      this.setState({
        "word": this.state.text,
        "definition": "Not Found",
      })
    }
  })
}
  render() {
    return (
      <View style={styles.container}>
      <SafeAreaProvider>
       <Header backgroundColor="#0a2f35" centerComponent={{text:'Dictonary App', style:{color: 'white', fontSize:27}}}/>
       <View style={styles.inputContainer}>
       <TextInput 
       style={styles.input}
       onChangeText={text =>{
        this.setState({
          text:text,
          isSearchedPressed:false,
          word: "Loading...",
          lexicalCategory: '',
          examples: [],
          definition: ""
        });
       }}
       value={this.state.text}/>
       <TouchableOpacity 
       style={styles.button}
       onPress={()=>{
         this.setState({isSearchedPressed:true});
         this.getWord(this.state.text);
       }}><Text style={styles.buttonText}>Search</Text></TouchableOpacity>
       </View>
     
      <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Word :{""}</Text>
      <Text style={{fontSize:18, color:'white'}}>{this.state.word}</Text>
      </View>

      <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Type :{""}</Text>
      <Text style={{fontSize:18, color:'white'}}>{this.state.lexicalCategory}</Text>
      </View>

      <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Definition :{""}</Text>
      <Text style={{fontSize:18, color:'white'}}>{this.state.d}</Text>
      </View>
      </SafeAreaProvider>
      </View>
       );
    }

}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#f56038',
  },
  inputContainer:{
    marginTop: 25,
    alignItems:'center',
    justifyContent: 'center',
  },
  input:{
    height: 40,
    width: '80%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor:'white',
  },
  button:{
    marginTop: 20,
    backgroundColor: '#0a2f35',
    justifyContent: 'center',
    height: 50,
    width: 150,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize:20,
    alignSelf:'center',
    justifyContent: 'center',
  },
  detailsContainer:{
    alignItems:'center',
    justifyContent: 'center',
    marginTop:20,
  },
  detailsTitle:{
    fontSize:25,
    color: '#0a2f35',
  },
});
