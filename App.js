import React, {useEffect} from 'react';
import {Alert, LogBox} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import SplashScreen from 'react-native-splash-screen';
import I18n from 'react-native-i18n';
import moment from 'moment';

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        Alert.alert(strings('title_alert_crash'), strings('message_alert_crash'));
    } else {
        console.log(e);
    }
};

setJSExceptionHandler(errorHandler, !__DEV__);

setNativeExceptionHandler((errorString) => {
    Alert.alert(strings('title_alert_crash'), strings('message_alert_crash'));
});

LogBox.ignoreAllLogs(__DEV__);

import Demo from 'screens/Demo';

const Stack = createStackNavigator();
const App: () => React$Node = () => {

    I18n.locale = 'vi';
    moment.locale('vi');

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <ThemeProvider theme={helpers('elements', 'light')}>
            <NavigationContainer initialRouteName={'Demo'}>
                <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                    <Stack.Screen name={'Demo'} component={Demo} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
