import { StyleSheet } from 'react-native';

const colors = {
  defBlue: '#4361EE',
  lightBlue: '#66B0F0',
  darkBlue: '#0D248C',
  white: '#FFFFFF',
  black: '#181925',
  defLight: '#F8F9FB',
  darkLight: '#ECEEF8',
  darkerLight: '#eef0f6',
  defYellow: '#FFCF2D',
  lightYellow: '#F5E86A',
  defGrey: '#B7B7B7',
  darkGrey: '#605F5F',
  darkRed: '#FF4733',
  defRed: '#FF8173',
  lightRed: '#FFB6AD',
  lightGreen: '#C2FFCF',
  defGreen: '#5CFF7F',
  darkGreen: '#00B828',
};

const styles = StyleSheet.create({
  customFileUpload: {
    borderWidth: 1,
    borderColor: '#ccc',
    display: 'inline-block',
    padding: 6,
    paddingHorizontal: 12,
    cursor: 'pointer',
  },
  fbgBlue: {
    backgroundColor: colors.defBlue,
  },
  fbgBlueHover: {
    backgroundColor: colors.darkBlue,
  },
  redIcon: {
    fontSize: 18,
    color: colors.defGrey,
    borderRadius: 50,
    padding: 8,
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: 150,
    cursor: 'pointer',
  },
  redIconHover: {
    backgroundColor: colors.defRed,
    color: colors.white,
  },
  minHAll32: {
    minHeight: 160,
  },
  inputField: {
    width: '100%',
    height: 48,
    borderWidth: 2,
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: 150,
    outline: 'none',
    borderRadius: 16,
    backgroundColor: colors.darkLight,
    borderColor: colors.darkLight,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputFieldFocus: {
    borderColor: colors.lightBlue,
  },
  button: {
    fontFamily: 'Nunito',
    fontWeight: '800',
    borderRadius: 12,
    borderWidth: 2,
    cursor: 'pointer',
    paddingVertical: 8,
    paddingHorizontal: 32,
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: 150,
  },
  loader: {
    borderTopColor: colors.defYellow,
    animation: 'spinner 1.5s linear infinite',
    borderWidth: 4,
  },
  blueButton: {
    borderColor: colors.defBlue,
    color: colors.white,
    backgroundColor: colors.defBlue,
  },
  blueButtonHover: {
    backgroundColor: colors.darkBlue,
  },
  greyButton: {
    borderColor: colors.darkerLight,
    color: colors.darkBlue,
    backgroundColor: colors.defLight,
  },
  greyButtonHover: {
    backgroundColor: colors.darkLight,
  },
  showMore: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 9999,
    fontWeight: '600',
    cursor: 'pointer',
    color: colors.defBlue,
    padding: 8,
    fontSize: 18,
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: 150,
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    justifyItems: 'center',
  },
  showMoreHover: {
    backgroundColor: colors.defBlue,
    color: colors.white,
  },
});

export default styles;
