import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

export default {
    isTablet: DeviceInfo.isTablet(),
    statusBar: getStatusBarHeight(true),
    appBar: Platform.select({ios: 44, android: 56}),
    widthScreen: width,
    heightScreen: height,
    yottaLargeText: 35,
    zettaLargeText: 33,
    exaLargeText: 31,
    petaLargeText: 29,
    teraLargeText: 27,
    megaLargeText: 25,
    xxxLargeText: 23,
    xxLargeText: 21,
    xLargeText: 19,
    largeText: 17,
    mediumText: 15,
    normalText: 13,
    smallText: 11,
    tinyText: 9
}
