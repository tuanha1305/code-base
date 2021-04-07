import React, {useEffect} from 'react';
import {Alert, LogBox, StatusBar, useColorScheme} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import SplashScreen from 'react-native-splash-screen';
import {ModalPortal} from 'react-native-modals';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';

import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './DropdownAlertHolder';
import DialogAlert from './DialogAlert';
import DialogAlertHolder from './DialogAlertHolder';

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

const CBDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF'
    }
};

const CBDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#000000'
    }
};

import Demo from 'screens/Demo';

const Stack = createStackNavigator();
const App: () => React$Node = () => {

    const scheme = useColorScheme();

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <ThemeProvider theme={helpers('elements', scheme)}>
            <StatusBar barStyle={'dark-content'} backgroundColor={colors.statusBarColor}/>
            <NavigationContainer theme={scheme === 'dark' ? CBDarkTheme : CBDefaultTheme} initialRouteName={'Demo'}>
                <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                    <Stack.Screen name={'Demo'} component={Demo} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
            <DropdownAlert ref={ref => DropdownAlertHolder.setDropdownAlert(ref)} inactiveStatusBarStyle={'dark-content'} inactiveStatusBarBackgroundColor={colors.statusBarColor}/>
            <DialogAlert ref={ref => DialogAlertHolder.setDialogAlert(ref)}/>
            <ModalPortal/>
        </ThemeProvider>
    );
};

export default App;
