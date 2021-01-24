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
