import React, {PureComponent} from 'react';
import {
    Appearance,
    Image,
    Keyboard,
    Text,
    View
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Modal, {
    ModalContent,
    ModalFooter,
    ModalButton,
    ScaleAnimation
} from 'react-native-modals';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import CBHandler from 'handlers/CBHandler';
import ImageUtil from 'utils/ImageUtil';
import HTMLView from 'react-native-htmlview';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';

export default class DialogAlert extends PureComponent {

    constructor(props) {
        super(props);
        this.modalAnimation = new ScaleAnimation();
        this.state = {
            visible: false,
            title: '',
            message: '',
            buttons: [],
            options: {}
        };
    }

    alert(title = '', message = '', buttons = [], options = {}) {
        Keyboard.dismiss();
        this.setState({
            visible: true,
            title: title,
            message: message,
            buttons: buttons,
            options: options
        });
    }

    hide(callback) {
        this.setState({
            visible: false
        }, this.fallback(callback));
    }

    fallback = (callback) => () => {
        if (callback) {
            setTimeout(callback, 300);
        }
    };

    onBlur = () => {
        Keyboard.dismiss();
    };

    onDismiss = () => {
        const {options} = this.state;
        if (options && options.onDismiss && typeof options.onDismiss === 'function') {
            options.onDismiss();
        }
    };

    onTouchOutside = () => {
        const {options} = this.state;
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            this.hide();
        }
    };

    onHardwareBackPress = () => {
        const {options} = this.state;
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            this.hide();
        }
        return true;
    };

    onPress = (index) => () => {
        const {buttons} = this.state;
        const button = buttons[index];
        if (button && button.onPress && typeof button.onPress === 'function') {
            this.hide(button.onPress);
        } else if (button && button.refId) {
            this.hide(() => CBControl.navigateWith(button.refId, button.defaultParam, button.injection));
        } else {
            this.hide();
        }
        if (button && button.tracking) {
            EventTracker.logEvent('master_popup', {action: 'click_button_' + button.tracking});
        }
    };

    onClose = () => {
        this.hide();
        EventTracker.logEvent('master_popup', {action: 'click_button_close'});
    };

    renderButtons() {
        const scheme = Appearance.getColorScheme();
        const borderStyle = helpers('border', scheme);
        const textStyle = helpers('text', scheme);
        const {buttons} = this.state;
        if (buttons && buttons.length > 1) {
            return (
                <ModalFooter style={borderStyle}>
                    <ModalButton
                        key={'negative'}
                        style={borderStyle}
                        text={buttons[0] && buttons[0].text ? buttons[0].text.toUpperCase() : ''}
                        textStyle={[appStyles.negative, textStyle]}
                        onPress={this.onPress(0)}
                        bordered={true}
                    />
                    <ModalButton
                        key={'positive'}
                        style={borderStyle}
                        text={buttons[1] && buttons[1].text ? buttons[1].text.toUpperCase() : ''}
                        textStyle={appStyles.positive}
                        onPress={this.onPress(1)}
                        bordered={true}
                    />
                </ModalFooter>
            );
        } else if (buttons && buttons.length > 0) {
            return (
                <ModalFooter style={borderStyle}>
                    <ModalButton
                        key={'positive'}
                        style={borderStyle}
                        text={buttons[0] && buttons[0].text ? buttons[0].text.toUpperCase() : ''}
                        textStyle={appStyles.positive}
                        onPress={this.onPress(0)}
                        bordered={true}
                    />
                    <View style={{width: 1}}/>
                </ModalFooter>
            );
        } else {
            return (
                <ModalFooter style={borderStyle}>
                    <ModalButton
                        key={'positive'}
                        style={borderStyle}
                        text={strings('button_close').toUpperCase()}
                        textStyle={appStyles.positive}
                        onPress={this.onClose}
                        bordered={true}
                    />
                    <View style={{width: 1}}/>
                </ModalFooter>
            );
        }
    }

    onLinkPress = (url) => {
        if (url && url.indexOf('http') > -1) {
            this.hide(() => CBHandler.openUrl(url));
        } else if (url && url.length > 0) {
            const array = url.split('~');
            this.hide(() => CBControl.navigateWith(array[0], array[1], array[2]));
        } else {
            this.hide();
        }
    };

    render() {
        const scheme = Appearance.getColorScheme();
        const contentStyle = helpers('content', scheme);
        const textStyle = helpers('text', scheme);
        const htmlStyles = helpers('html', scheme);
        const {visible, title, message, options} = this.state;
        const {uri, children, html} = options;
        return (
            <Modal
                onDismiss={this.onDismiss}
                onTouchOutside={this.onTouchOutside}
                onHardwareBackPress={this.onHardwareBackPress}
                width={0.9}
                visible={visible}
                modalStyle={contentStyle}
                modalAnimation={this.modalAnimation}
                modalTitle={uri ? <Image style={appStyles.cover} source={ImageUtil.getImage(uri)}/> : null}
                footer={this.renderButtons()}>
                <TouchableWithoutFeedback onPress={this.onBlur}>
                    <ModalContent style={[{paddingHorizontal: 15}, contentStyle]}>
                        {title ? <Text style={[appStyles.title, {textAlign: 'center', marginTop: uri ? 24 : 0}, textStyle]}>{title}</Text>: null}
                        {message ? <Text style={[appStyles.text, {textAlign: 'center', marginTop: title ? 10 : uri ? 24 : 0}, textStyle]}>{message}</Text> : null}
                        {
                            html ?
                                <HTMLView
                                    style={{marginTop: 10}}
                                    stylesheet={htmlStyles}
                                    textComponentProps={{style: [htmlStyles.p, {textAlign: 'center'}]}}
                                    value={html}
                                    onLinkPress={this.onLinkPress}
                                /> : null
                        }
                        {children}
                    </ModalContent>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}
