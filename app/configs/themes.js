import colors from 'configs/colors';
import dimens from 'configs/dimens';

const lightTheme = {
    elements: {
        colors: {
            primary: colors.primaryColor
        },
        Button: {
            disabledTitleStyle: {
                color: colors.white
            }
        },
        Image: {
            placeholderStyle: {
                backgroundColor: colors.white
            }
        }
    }
};

const darkTheme = {
    elements: {
        colors: {
            primary: colors.primaryColor
        },
        Button: {
            disabledTitleStyle: {
                color: colors.white
            }
        },
        Image: {
            placeholderStyle: {
                backgroundColor: colors.white
            }
        }
    }
};

export function helpers(name, theme) {
    return theme === 'dark' ? darkTheme[name] : lightTheme[name];
}
