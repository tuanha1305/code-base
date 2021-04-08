import React, {Component} from 'react';
import {Appearance, AppState, Linking, LogBox, StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import CBCache from 'caches/CBCache';
import CBConfig from 'configs/CBConfig';
import ConfigManager from 'controls/ConfigManager';
import CBDeeplinkHandler from 'handlers/CBDeeplinkHandler';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import {ModalPortal} from 'react-native-modals';
import DeviceInfo from 'react-native-device-info';
import {Settings} from 'react-native-fbsdk-next';
import OneSignal from 'react-native-onesignal';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';

import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './DropdownAlertHolder';
import DialogAlert from './DialogAlert';
import DialogAlertHolder from './DialogAlertHolder';

import Demo from 'screens/Demo';

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
    } else {
        console.log(e);
    }
};

setJSExceptionHandler(errorHandler, !__DEV__);

setNativeExceptionHandler((errorString) => {
    DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
});

LogBox.ignoreAllLogs(__DEV__);

const Stack = createStackNavigator();

export default class App extends Component {

    constructor(props) {
        super(props);
        Settings.initializeSDK();
        this.state = {
            appState: AppState.currentState,
            isSubscribed: false
        };
    }

    componentDidMount() {
        ConfigManager.execute();
        Promise.all([DeviceInfo.getDeviceName(), DeviceInfo.getManufacturer(), DeviceInfo.isEmulator()]).then(values => {
            CBCache.uniqueId = DeviceInfo.getUniqueId();
            CBCache.deviceId = escape(DeviceInfo.getDeviceId() || '');
            CBCache.deviceName = escape(values[0] || '');
            CBCache.manufacturer = escape(values[1] || '');
            CBCache.isEmulator = values[2] || false;
        });

        this.unsubscribeNetwork = NetInfo.addEventListener(this.handleConnectivityChange);

        AppState.addEventListener('change', this.handleAppStateChange);

        Linking.addEventListener('url', this.handleOpenUrl);
        Linking.getInitialURL().then((url) => {
            CBDeeplinkHandler.handleUrl(url);
        }).catch((error) => console.error('An error occurred', error));

        this.unsubscribeDynamicLinks = dynamicLinks().onLink(this.handleOpenDynamicUrl);
        dynamicLinks().getInitialLink().then((link) => {
            CBDeeplinkHandler.handleDynamicUrl(link?.url);
        }).catch((error) => console.error('An error occurred', error));

        this.unsubscribeMessaging = messaging().onMessage(async (remoteMessage) => {
            console.log('dctan :: ' + JSON.stringify(remoteMessage));
        });

        OneSignal.setAppId(CBConfig.ONE_SIGNAL_APP_ID);
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.promptForPushNotificationsWithUserResponse(response => {

        });
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {

        });
        OneSignal.setNotificationOpenedHandler(notification => {

        });
        OneSignal.setInAppMessageClickHandler(event => {

        });
        OneSignal.addEmailSubscriptionObserver((event) => {

        });
        OneSignal.addSubscriptionObserver(event => {

        });
        OneSignal.addPermissionObserver(event => {

        });
        OneSignal.getDeviceState().then(deviceState => {
            this.setState({
                isSubscribed: deviceState.isSubscribed
            }, this.onLoaded);
        }).catch((error) => console.error('An error occurred', error));
    }

    componentWillUnmount() {
        if (this.unsubscribeNetwork) this.unsubscribeNetwork();

        AppState.removeEventListener('change', this.handleAppStateChange);

        Linking.removeEventListener('url', this.handleOpenUrl);

        if (this.unsubscribeDynamicLinks) this.unsubscribeDynamicLinks();

        if (this.unsubscribeMessaging) this.unsubscribeMessaging();
    }

    handleConnectivityChange = (state) => {
        const {appState: action} = this.state;
        if (action === 'active') {
            const {isConnected} = state;
            if (!isConnected) {
                DropdownAlertHolder.alertWithType('error', strings('title_alert_no_internet'), strings('message_alert_no_internet'));
            }
        }
    };

    handleAppStateChange = (state) => {
        this.setState({appState: state});
    };

    handleOpenUrl = (event) => {
        CBDeeplinkHandler.handleUrl(event?.url);
    };

    handleOpenDynamicUrl = (link) => {
        CBDeeplinkHandler.handleDynamicUrl(link?.url);
    };

    onLoaded = () => {
        SplashScreen.hide();
    };

    render() {
        const scheme = Appearance.getColorScheme();
        const barStyle = scheme === 'dark' ? 'light-content' : 'dark-content';
        const statusBarColor = scheme === 'dark' ? colors.statusBarColor : colors.statusBarDarkColor;
        return (
            <ThemeProvider theme={helpers('elements', scheme)}>
                <StatusBar barStyle={barStyle} backgroundColor={statusBarColor}/>
                <NavigationContainer theme={helpers('navigation', scheme)} initialRouteName={'Demo'}>
                    <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                        <Stack.Screen name={'Demo'} component={Demo}/>
                    </Stack.Navigator>
                </NavigationContainer>
                <DropdownAlert ref={ref => DropdownAlertHolder.setDropdownAlert(ref)} inactiveStatusBarStyle={barStyle} inactiveStatusBarBackgroundColor={statusBarColor}/>
                <DialogAlert ref={ref => DialogAlertHolder.setDialogAlert(ref)}/>
                <ModalPortal/>
            </ThemeProvider>
        );
    }
}
