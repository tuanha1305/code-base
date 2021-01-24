import React from 'react';
import {
    View
} from 'react-native';
import {CBView} from 'components';
import {appStyles} from 'configs/styles';

const Demo = ({navigation, route}) => {
    return (
        <CBView style={appStyles.container}>
            <View style={appStyles.content}>

            </View>
        </CBView>
    );
};

export default Demo;
