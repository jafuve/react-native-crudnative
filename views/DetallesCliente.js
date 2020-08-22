import React from 'react';
import { View, StyleSheet, Alert, FAB } from 'react-native';
import { Headline, Text, Subheading, Button } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({ navigation, route }) => {

    const { setConsultarAPI } = route.params;

    // const { nombre, telefono, correo, empresa } = route.params.item;
    const { id, name, email, body } = route.params.item;

    const mostrarConfirmacion = () => {
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si, eliminar', onPress: () => eliminarContacto() },
                { text: 'Cancelar', style: 'cancel' },
            ]
        );
    };

    const eliminarContacto = async () => {

        // console.log("Eliminando");
        // return;

        const url = `http://localhost:3000/clientes/${id}`;

        try {
            await axios.delete(url);
        } catch (error) {
            console.log(error);
        }

        // REDIRECCIONAR
        navigation.navigate("Inicio");

        // VOLVER A CONSULTAR API
        setConsultarAPI(true);
    };

    return(
        <View style={ globalStyles.contenedor } >

            <Headline style={ globalStyles.titulo }>{ name }</Headline>

            <Text style={ styles.text }>Body: <Subheading>{ body }</Subheading> </Text>

            <Text style={ styles.text }>Correo: <Subheading>{ email }</Subheading> </Text>

            <Text style={ styles.text }>Id: <Subheading>{ id }</Subheading> </Text>

            <Button
                style={ styles.boton }
                mode="contained" icon="cancel"
                onPress = { () => mostrarConfirmacion() }
            >
                Eliminar Cliente
            </Button>

            <Button
                style={ styles.boton }
                mode="contained" icon="pencil"
                onPress={ () => navigation.navigate('NuevoCliente', { cliente: route.params.item, setConsultarAPI }) }
            >
                Editar cliente 
            </Button>

            {/* <FAB
                style= { globalStyles.fab }
             /> */}

        </View>
    );

};

const styles = StyleSheet.create({

    text: {
        marginBottom: 20,
        fontSize: 18
    },

    boton: {
        marginTop: 50,
        backgroundColor: 'red'
    }

})

export default DetallesCliente;
