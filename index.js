import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import CodePush from 'react-native-code-push';
import {name as appName} from './app.json';
import App from './App';

const CBApp = CodePush({
    checkFrequency: CodePush.CheckFrequency.MANUAL
})(App);

AppRegistry.registerComponent(appName, () => CBApp);
