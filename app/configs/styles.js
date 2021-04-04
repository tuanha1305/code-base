import colors from 'configs/colors';
import dimens from 'configs/dimens';

export const appStyles = {
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        backgroundColor: colors.white
    },
    text: {
        fontSize: dimens.normalText,
        color: colors.primaryTextColor
    },
    subtext: {
        fontSize: dimens.smallText,
        color: colors.secondaryTextColor
    }
};

export const calendarStyles = {
    backgroundColor: colors.white,
    selectedDayBackgroundColor: colors.primaryColor,
    selectedDayTextColor: colors.white,
    todayTextColor: '#FF5E5E',
    dayTextColor: colors.black,
    textDisabledColor: '#D9E1E8',
    dotColor: colors.primaryColor,
    selectedDotColor: colors.white,
    arrowColor: colors.primaryColor,
    monthTextColor: colors.black,
    textSectionTitleColor: colors.black,
    textDayFontWeight: 'bold'
};

export const htmlStyles = {
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
};
