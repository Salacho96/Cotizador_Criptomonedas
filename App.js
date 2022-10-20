//to create this proyect "npx react-native init criptomonedas"
//to run it we use "npx react-native run-ios"

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

import { assets } from './react-native.config';

import axios from 'axios';

const App = () => {

  const [moneda,guardarMoneda] = useState('');

  const [criptomoneda,guardarCriptomoneda] = useState('');

  const [consultaAPI,guardarConsultaAPI] = useState(false)

  const [resultado, guardarResultado ]= useState({})

  const [cargando, guardarCargando] = useState(false)



  useEffect(()=>{
    const  cotizarCriptomoneda = async ()=>{
      if(consultaAPI){
        // console.log('listo para cotizar')
        //consultar API para obtener la cotizacion
  
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;//template string para agregar valores, su caracter es ` `
        const resultado = await axios.get(url);
        // console.log(moneda)
        // console.log(criptomoneda)
        // console.log(url)
        guardarCargando(true)
        
        //ocultar el spinner y mostrar el resultado

        setTimeout(()=>{
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda] )
          guardarConsultaAPI(false)
          guardarCargando(false)
        },3000)

      }
    }
    cotizarCriptomoneda()
  },[consultaAPI])


  const componente = cargando ? <ActivityIndicator/> : <Cotizacion size="large" color='#5E49E2' resultado={resultado} />



  return (
    <>
    <ScrollView>

      <Header
       
      />
      <Image
        style = {styles.imagen}
        source = {require('./assets/img/cryptomonedas.png') }
      />

      <View style={styles.contenido}>

        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultaAPI={guardarConsultaAPI}
        /> 

        
      </View>
      
      <View style={{marginTop: 40}}>
        {componente}
      </View>
      

      </ScrollView>
    </>
   
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
