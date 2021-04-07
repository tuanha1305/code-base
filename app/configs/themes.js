import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

const lightTheme = {
    navigation: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.primaryColor
        }
    },
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
    },
    status: colors.white

};

const darkTheme = {
    navigation: {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: colors.primaryColor
        }
    },
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
    },
    status: colors.white
};

export function helpers(name, theme) {
    return theme === 'dark' ? darkTheme[name] : lightTheme[name];
}
