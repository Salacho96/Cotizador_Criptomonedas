import React, {useState, useEffect }  from 'react'
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import axios from "axios";

const Formulario = ({moneda,criptomoneda,guardarMoneda,guardarCriptomoneda,guardarConsultaAPI}) => {

    
    
    const [criptomonedas,guardarCriptomonedas] = useState([]);

    //almacena las selecciones del usuario
    const obtenerMoneda = moneda =>{
        guardarMoneda(moneda)
    }

    //almacena las selecciones del usuario
    const obteneCriptorMoneda = cripto =>{
        guardarCriptomoneda(cripto)
    } 

    const cotizarPrecio= () =>{
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta();
            return;
        }
        // console.log('paso validacion')
        guardarConsultaAPI(true)
    }

    const mostrarAlerta =() =>{
        Alert.alert(
            'Error',
            'Ambos Campos Son Obligatorios',
            [
                {text: 'OK'},
            ]
        )
    }

    useEffect(()=>{
        const consultaAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            // console.log(resultado.data.Data)
            guardarCriptomonedas(resultado.data.Data);
        }
        
        consultaAPI()
    }, []);


    
    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda) }
                itemStyle={{height: 120}}
            >
                <Picker.Item label= "- Selecione -" value="" />
                <Picker.Item label= "Dolar Americano" value="USD" />
                <Picker.Item label= "Peso Colombiano" value="COP" />
                <Picker.Item label= "Euro" value="EUR" />
                <Picker.Item label= "Libra Esterlina" value="GBP" />
            </Picker>


            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto => obteneCriptorMoneda(cripto) }
                itemStyle={{height: 120}}
            >
                <Picker.Item label= "- Selecione -" value="" />
                { criptomonedas.map(cripto =>(
                    <Picker.Item  key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ) ) }
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
            
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        fontSize: 22,
        marginVertical: 20,
        textTransform: 'uppercase'
    },
    btnCotizar:{
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textoCotizar:{
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})

export default Formulario