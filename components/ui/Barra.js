import React from 'react';
import { Button } from 'react-native-paper';

const BarraSuperior = ({ navigation, route }) => {

    const handlePress = () =>{
        navigation.navigate('NuevoCliente');
    };

    return (
        <Button color="#FFF" icon="plus" onPress={ () => handlePress() }>
            Cliente
        </Button>
    );
};

export default BarraSuperior;