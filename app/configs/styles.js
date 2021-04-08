import React from 'react';
import {StyleSheet} from 'react-native';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    content: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    title: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        fontWeight: 'bold'
    },
    label: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        fontWeight: 'bold'
    },
    text: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor
    },
    subtext: {
        fontSize: dimens.normalText,
        color: colors.noteTextColor
    },
    blockquote: {
        fontSize: dimens.smallText,
        color: colors.noteTextColor
    },
    caption: {
        fontSize: dimens.smallText,
        color: colors.primaryTextColor
    },
    letter: {
        fontSize: dimens.atomText,
        color: colors.primaryTextColor
    },
    error: {
        fontSize: dimens.normalText,
        color: colors.errorTextColor
    },
    cover: {
        width: '100%',
        height: (0.9 * dimens.widthScreen) / 2
    },
    negative: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        padding: 2
    },
    positive: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        padding: 2
    }
});

export const htmlStyles = StyleSheet.create({
    p: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor
    },
    b: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontWeight: 'bold'
    },
    a: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        textDecorationLine: 'underline'
    }
});
