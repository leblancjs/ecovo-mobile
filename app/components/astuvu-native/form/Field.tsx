import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Item, Label, Icon, Text } from 'native-base'
import PropTypes from 'prop-types'

export enum FieldLabelTypes {
    FLOATING = 'floating',
    STACKED = 'stacked',
}

export interface FieldProps {
    style?: object
    bottomBorder?: boolean
    labelType?: FieldLabelTypes
    label: string
    error?: string | null
    errorIcon?: boolean
}

export const FieldDefaultProps: FieldProps = {
    style: {},
    bottomBorder: true,
    labelType: FieldLabelTypes.FLOATING,
    label: '',
    error: null,
    errorIcon: false,
}

class Field extends Component<FieldProps> {
    static defaultProps = FieldDefaultProps

    constructor(props: FieldProps) {
        super(props)
    }

    render = () => {
        /*
         * If we weren't told what kind of label to use, we revert to one that
         * floats (because Fred said he likes it that way).
         */
        let floatingLabel: boolean, stackedLabel: boolean

        switch (this.props.labelType) {
            case FieldLabelTypes.STACKED:
                floatingLabel = false
                stackedLabel = true
                break
            case FieldLabelTypes.FLOATING:
            default:
                floatingLabel = true
                stackedLabel = false
                break
        }

        let itemStyle = this.props.bottomBorder ?
            FieldStyles.item : FieldStyles.itemWithoutBottomBorder

        return (
            <View style={{ ...this.props.style }}>
                <Item
                    style={itemStyle}
                    floatingLabel={floatingLabel}
                    stackedLabel={stackedLabel}
                    error={!!this.props.error}
                >
                    <Label>{this.props.label}</Label>
                    {this.props.children}
                    {
                        this.props.error && this.props.errorIcon &&
                            <Icon name="close-circle"/>
                    }
                </Item>
                {
                    this.props.error &&
                        <Text style={FieldStyles.errorText}>
                            {this.props.error}
                        </Text>
                }
            </View>
        )
    }
}

export const FieldStyles = StyleSheet.create({
    item: {
        // We can add styles here, if needed.
    },
    itemWithoutBottomBorder: {
        borderBottomWidth: 0,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    errorIconContainer: {
        flex: 0.2,
    },
    errorIcon: {
        fontSize: 24,
        color: '#ed2f2f',
        marginRight: 8,
    },
    errorText: {
        fontSize: 12,
        color: '#ed2f2f',
        margin: 8,
    },
})

// TODO: Remove once everything is ported to TS
export const FieldPropTypes = {
    style: PropTypes.object,
    bottomBorder: PropTypes.bool,
    labelType: PropTypes.oneOf([FieldLabelTypes.FLOATING, FieldLabelTypes.STACKED]),
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    errorIcon: PropTypes.bool,
}

export default Field