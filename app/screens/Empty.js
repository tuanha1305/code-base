import React from 'react';
import {
    Text,
    View
} from 'react-native';
import {CBView} from 'components';
import {appStyles} from 'configs/styles';
import {helpers} from "configs/themes";

import Base from 'screens/Base';

export default class Empty extends Base {

    onPress = () => {

    };

    render() {
        return (
            <CBView style={[appStyles.container, helpers('container', this.scheme)]}>
                <View style={[appStyles.content, {alignItems: 'center', justifyContent: 'center'}, helpers('content', this.scheme)]}>
                    <Text style={[appStyles.text, helpers('text', this.scheme)]} onPress={this.onPress}>{'Empty'}</Text>
                </View>
            </CBView>
        );
    }
}
