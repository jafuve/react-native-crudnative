import React, { useState, useEffect } from 'react';
import { Text, FlatList, View } from 'react-native';
import axios from 'axios';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({ navigation }) => {

    const [ clientes, setClientes ] = useState([]);
    const [ consultarAPI, setConsultarAPI ] = useState(true);

    useEffect( () => {

        const obtenerClientesApi = async () => {

            const testUrl = 'https://jsonplaceholder.typicode.com/comments';

            // const testUrl = 'http://localhost:8081/clientes';

            try {
                const resultado = await axios.get( testUrl );
                let newResultado = [];

                for( let i = 0; i < 10; i++ ){
                    newResultado.push( resultado[i] );
                }

                setClientes( resultado.data );
                setConsultarAPI( false );

                console.log( resultado );
            } catch (error) {
                console.log(error);
            }

        };

        if( consultarAPI ){
            obtenerClientesApi();
        }
        

    }, [ consultarAPI ]);

    return(
        <View style={ globalStyles.contenedor }>

            <Button icon="plus-circle" onPress={ () => navigation.navigate('NuevoCliente', { setConsultarAPI }) }>
                Nuevo Cliente
            </Button>

            <Headline style={ globalStyles.titulo } >
                {
                    clientes.length > 0 ? "Clientes" : "Aún  no hay clientes"
                }
            </Headline>

            <FlatList 
                data={ clientes }
                // keyExtractor={(item, index) => 'key'+index}
                keyExtractor={ cliente => (cliente.id).toString() }
                renderItem={ ({ item }) => (
                    <List.Item 
                        title={ item.name }
                        description={ item.body }
                        onPress={ () => navigation.navigate('DetallesCliente', { item, setConsultarAPI }) }
                    />
                ) }
            />

            <FAB 
                icon="plus"
                style={ globalStyles.fab }
                onPress={ () => navigation.navigate('NuevoCliente', { setConsultarAPI }) }
            />

        </View>
        
    );

};

export default Inicio;