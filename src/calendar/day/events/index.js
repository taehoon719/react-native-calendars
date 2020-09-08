import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { shouldUpdate } from '../../../component-updater';

import styleConstructor from './style';
import BlockedTime from './BlockedTime.png';
import moment from 'moment';

class Day extends Component {
    static displayName = 'IGNORE';

    static propTypes = {
        // TODO: disabled props should be removed
        state: PropTypes.oneOf(['disabled', 'today', '']),
        // Specify theme properties to override specific styles for calendar parts. Default = {}
        theme: PropTypes.object,
        marking: PropTypes.any,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        date: PropTypes.object,
        availability: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.style = styleConstructor(props.theme);

        this.onDayPress = this.onDayPress.bind(this);
        this.onDayLongPress = this.onDayLongPress.bind(this);
    }

    onDayPress() {
        this.props.onPress(this.props.date);
    }
    onDayLongPress() {
        this.props.onLongPress(this.props.date);
    }

    shouldComponentUpdate(nextProps) {
        return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
    }

    renderPeriods(marking) {
        const baseDotStyle = [this.style.dot, this.style.visibleDot];
        if (
            marking.length > 0) {
            // Filter out dots so that we we process only those items which have key and color property
            //const validPeriods = marking.periods.filter(d => d && d.color);
            return marking.map((event, index) => {
                const style = [
                    ...baseDotStyle,
                    {
                        backgroundColor: event.color,
                        borderTopLeftRadius: 2,
                        borderBottomLeftRadius: 2,
                        marginLeft: 4,
                        borderTopRightRadius: 2,
                        borderBottomRightRadius: 2,
                        marginRight: 4
                    }
                ];
                return (
                    index < 3
                        ?
                        <View key={event.id} style={[{
                            borderWidth: 2,
                            borderColor: event.color,
                            borderRadius: 5,
                            flexDirection: 'row',
                            height: 21,
                            padding: 3,
                            overflow: 'hidden',
                            marginTop: 2
                        }, style.shadowEffect]}>
                            <Text style={{ fontWeight: 'bold', color: event.color, fontSize: 11 }}>{event.title}</Text>
                        </View>
                        :
                        index === 3
                            ?
                            <View style={{ marginTop: 2, justifyContent: 'flex-start', alignItems: 'flex-start', height: 21 }}>
                                <Text style={{ paddingLeft: 3, fontSize: 15, marginTop: -5, fontWeight: 'bold', color: 'gray' }}>...</Text>
                            </View>
                            :
                            null
                )
                //return <View key={index} style={style}/>;
            });
        }
        return;
    }

    render() {
        const containerStyle = [this.style.base];
        const textStyle = [this.style.text];
        const marking = this.props.marking || {};
        const periods = this.renderPeriods(marking);
        const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';

        if (marking.selected) {
            containerStyle.push(this.style.selected);
            textStyle.push(this.style.selectedText);
        } else if (isDisabled) {
            textStyle.push(this.style.disabledText);
        } else if (this.props.state === 'today') {
            containerStyle.push(this.style.today);
            textStyle.push(this.style.todayText);
        }
        return (
            <TouchableOpacity
                style={{ alignSelf: 'stretch', borderWidth: 1, borderColor: '#DBDBDB', }}
                onPress={this.onDayPress}
                disabled={this.props.availability[moment(this.props.date.dateString).format('dddd').toUpperCase()][0].startHour === this.props.availability[moment(this.props.date.dateString).format('dddd').toUpperCase()][0].endHour}
                onLongPress={this.onDayLongPress}
            >
                {this.props.availability[moment(this.props.date.dateString).format('dddd').toUpperCase()][0].startHour === this.props.availability[moment(this.props.date.dateString).format('dddd').toUpperCase()][0].endHour &&
                    <Image source={BlockedTime} style={{ position: 'absolute', flex: 1, height: '100%' }} />
                }
                <View
                    testID={this.props.testID}
                    style={containerStyle}
                    disabled={marking.disableTouchEvent}
                    accessible
                    accessibilityRole={isDisabled ? undefined : 'button'}
                    accessibilityLabel={this.props.accessibilityLabel}
                >
                    <Text allowFontScaling={false} style={textStyle}>
                        {String(this.props.children)}
                    </Text>
                </View>
                <View style={this.style.eventSection}>
                    <ScrollView style={{ paddingLeft: 5, paddingRight: 5 }} showsVerticalScrollIndicator={false} >
                        {periods}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Day;
