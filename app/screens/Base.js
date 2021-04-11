import React, {Component} from 'react';
import {Appearance} from 'react-native';
import DropdownAlertHolder from '../../DropdownAlertHolder';
import DialogAlertHolder from '../../DialogAlertHolder';
import RootNavigation from 'screens/RootNavigation';
import JsonUtil from 'utils/JsonUtil';

export default class Base extends Component {

    scheme = Appearance.getColorScheme();
    defaultParam = {};

    componentDidMount() {
        this.setNavigation();
        this.setDefaultParam();
    }

    setNavigation() {
        RootNavigation.setNavigation(this.props.navigation);
        RootNavigation.setRoute(this.props.route);
        this.focusSubscription = this.props.navigation.addListener('focus', this.handleFocusSubscription);
        this.blurSubscription = this.props.navigation.addListener('blur', this.handleBlurSubscription);
    }

    handleFocusSubscription = () => {
        RootNavigation.setNavigation(this.props.navigation);
        RootNavigation.setRoute(this.props.route);
        this.componentFocus();
    };

    handleBlurSubscription = () => {
        this.componentBlur();
    };

    setDefaultParam() {
        const {params} = this.props.route;
        if (params && params.defaultParam) {
            this.defaultParam = JsonUtil.parseJsonString(params.defaultParam);
        }
    }

    componentFocus() {

    }

    componentBlur() {

    }

    componentWillUnmount() {
        this.focusSubscription();
        this.blurSubscription();
    }

    alertWithType(...args) {
        DropdownAlertHolder.alertWithType(...args);
    }

    alert(...args) {
        DialogAlertHolder.alert(...args);
    }

    dismiss() {
        DialogAlertHolder.dismiss();
    }

    render() {
        return null;
    }
}
