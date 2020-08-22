import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({ navigation, route }) => {

    const { setConsultarAPI } = route.params;

    const [ nombre, setNombre ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ correo, setCorreo ] = useState('');
    const [ empresa, setEmpresa ] = useState('');
    const [ alerta, setAlerta ] = useState(false);

    // DETECTAR SIE STAMOS EDITANDO O CREANDO
    useEffect( () => {
        if( route.params.cliente ){
            const { name, id, email, body } = route.params.cliente;

            setNombre(name);
            setTelefono( name );
            setCorreo( email );
            setEmpresa( body );
        }
    }, []);

    const guardarCliente = async () => {
        // validar
        if( nombre === '' || telefono === '' || correo === '' || empresa === '' ){
            setAlerta( true );
            return;
        }

        // generar cliente
        const cliente = { nombre, telefono, empresa, correo };

        // verify if creating or editing
        if( route.params.cliente ){

            const { id } = route.params.cliente;
            cliente.id = id;

            const url = `http://localhost:3000/clientes/${ id }`;

            try {
                await axios.put(url, cliente);
            } catch (error) {
                console.log( error );
            }

        }else{
            try {
            
                if( Platform.OS === 'ios'){
                    await axios.post('http://localhost:3000/clientes', cliente);
                }else{
                    const res = await axios.post('http://10.0.2.2:3000/clientes', config, cliente);
                }
                
            } catch (error) {
                console.log("Cath");
                console.log( error );
            }
        }
        

        
        navigation.navigate( 'Inicio' );

        // limpiar
        setNombre('');
        setTelefono('');
        setCorreo('');
        setEmpresa('');
        
        // CAMBIAR A TRUE
        setConsultarAPI( true );
    };

    return(
        <View style={ globalStyles.contenedor }>

            <Headline style={ globalStyles.titulo } >
                Añadir Nuevo Cliente
            </Headline>

            <TextInput 
                label="Nombre"
                placeholder="Juan"
                onChangeText={ texto => setNombre( texto ) }
                style={ styles.input }
                value={ nombre }
            />

            <TextInput 
                label="Teléfono"
                placeholder="1234-1234"
                onChangeText={ telefono => setTelefono( telefono ) }
                style={ styles.input }
                value={ telefono }
            />

            <TextInput 
                label="Correo"
                placeholder="correo@correo.com"
                onChangeText={ correo => setCorreo( correo ) }
                style={ styles.input }
                value={ correo }
            />

            <TextInput 
                label="Empresa"
                placeholder="Nombre empresa"
                onChangeText={ empresa => setEmpresa( empresa ) }
                style={ styles.input }
                value={ empresa }
            />

            <Button 
                icon="pencil-circle" 
                mode="contained" 
                onPress={ () => guardarCliente() }
            >
                Guardar cliente
            </Button>

            <Portal>
                <Dialog
                    visible={ alerta }
                    onDismiss={ () => setAlerta(false) }
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => setAlerta(false) }>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );

};

const styles = StyleSheet.create({

    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }

});

export default NuevoCliente;