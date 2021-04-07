import React from 'react';
import {
    Text,
    View
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {CBView} from 'components';
import {appStyles} from 'configs/styles';

const Demo = ({navigation, route}) => {
    const {colors} = useTheme();

    return (
        <CBView style={appStyles.container}>
            <View style={[appStyles.content, {backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center'}]}>
                <Text style={appStyles.text}>{'Demo'}</Text>
            </View>
        </CBView>
    );
};

export default Demo;
