import React from 'react';
import {
    Text,
    View
} from 'react-native';
import {CBView} from 'components';
import {appStyles} from 'configs/styles';

const Demo = ({navigation, route}) => {
    return (
        <CBView style={appStyles.container}>
            <View style={[appStyles.content, {alignItems: 'center', justifyContent: 'center'}]}>
                <Text style={appStyles.text}>{'Demo'}</Text>
            </View>
        </CBView>
    );
};

export default Demo;
