import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../../style';


const STYLESHEET_ID = 'stylesheet.day.events';

export default function styleConstructor(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    eventSection: {
        height: 100
    },
    shadowEffect: {
        shadowColor: "#000",
        shadowOffset: {
            width: Platform.OS === 'android' ? 1 : 0,
            height: Platform.OS === 'android' ? 2 : 4,
        },
        shadowOpacity: Platform.OS === 'android' ? 0.18 : 0.22,
        shadowRadius: Platform.OS === 'android' ? 1.00 : 3.46,
        elevation: Platform.OS === 'android' ? 5 : 6,
        backgroundColor: 'white'
    },
    base: {
      width: 32,
      height: 32,
      alignItems: 'center',
    },
    text: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: appStyle.textDayFontWeight,
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 16
    },
    today: {
      backgroundColor: appStyle.todayBackgroundColor
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    dot: {
      // width: 42,
      height: 4,
      marginVertical: 1,
      // borderRadius: 2,
      opacity: 0
    },
    leftFiller: {
      width: 4,
      height: 4,
      marginTop: 1,
      marginRight: -2
    },
    rightFiller: {
      width: 4,
      height: 4,
      marginTop: 1,
      marginLeft: -2
    },
    rounded: {
      borderRadius: 2
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    },
    startingPeriod: {
      width: 18,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
