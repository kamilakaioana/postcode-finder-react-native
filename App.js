import React, {useState, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Keyboard} from 'react-native';
import api from './src/services/api';

function App(){
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar (){
      if(cep == '' || cep.length != 8){
        alert('Digite um CEP valido');
        setCep('');
        return;
      }

      try{
        const response = await api.get(`/${cep}/json`);
        console.log(response.data);

        setCepUser(response.data);
        Keyboard.dismiss();

      } catch(error){
        console.log('ERROR: ' + error);
      }     
  }

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return(
    <SafeAreaView style={styles.container}>
     <View style={styles.alinhar}> 
      <View style={styles.CentralizarElementos}>
        <Image
        source={require('./src/img/localizar.jpg')}
        style={styles.img}
        />
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput
        style={styles.textInput}
        placeholder={"Ex: 87491000"}
        value={cep}
        onChangeText={(texto) => setCep(texto)}
        keyboardType="numeric"
        ref={inputRef}
        />     

      </View>
      <View style={styles.areaBotoes}>
        <TouchableOpacity 
          style={[ styles.botao, {backgroundColor: '#1A0F91'}]}
          onPress={buscar}
          >
          <Text style={styles.textoBotao}>Buscar</Text>
        </TouchableOpacity>
    
        <TouchableOpacity 
          style={[ styles.botao, {backgroundColor: '#F98179'} ]}
          onPress={ limpar }
        >
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>

     { cepUser &&
         <View style={styles.resultado}>
         <Text style={styles.itemResultado}>CEP: {cepUser.cep}</Text>
         <Text style={styles.itemResultado}>Logradouro: {cepUser.logradouro} </Text>
         <Text style={styles.itemResultado}>Bairro: {cepUser.bairro}</Text>
         <Text style={styles.itemResultado}>Cidade: {cepUser.localidade}</Text>
         <Text style={styles.itemResultado}>Estado: {cepUser.uf}</Text>
       </View>
     }
      </View>    

    </SafeAreaView>
 
  );
}
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    
  },
  CentralizarElementos:{
    // flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginHorizontal:32,
    
  },
  img:{
    width: 200, 
    height: 200,
 },
  text:{
    marginTop:16,
    marginBottom:16,
    fontSize:24,
    fontWeight:'bold',
  },
  textInput:{
    backgroundColor:'#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '100%',
    textAlign:'center',
    padding:8,
    fontSize: 18
   },
   areaBotoes:{
    justifyContent:'space-evenly', 
    alignItems:'center',
     flexDirection:'row',
    
     marginTop: 16,
     
   },
   botao:{
     height: 56,
     padding: 16,
     borderRadius: 5, 
     alignItems:'center',
     justifyContent:'center',
   }, 
   textoBotao:{
     color: '#FFF',
     fontSize: 20,
     textAlign:'center',
   },
  
  alinhar:{
    flex: 1,
    justifyContent: 'center',
  },
  resultado:{
    alignItems:'center',
    paddingTop: 16,

  },
  itemResultado:{
    fontSize:20,
    color: '#000',
  },

});
export default App;
