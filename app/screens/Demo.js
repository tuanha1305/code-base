import React, {useEffect} from 'react';
import {
    Text,
    View
} from 'react-native';
import {CBView} from 'components';
import {appStyles} from 'configs/styles';

const Demo = ({navigation, route}) => {

    useEffect(() => {

    }, []);

    const onPress = () => {

    };

    return (
        <CBView style={appStyles.container}>
            <View style={[appStyles.content, {alignItems: 'center', justifyContent: 'center'}]}>
                <Text style={appStyles.text} onPress={onPress}>{'Demo'}</Text>
            </View>
        </CBView>
    );
};

export default Demo;
