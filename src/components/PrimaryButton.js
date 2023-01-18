import React from 'react'
import Button from './Button'

export default class PrimaryButton extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render () {
        let {
            onClick,
            id,
            name,
            children,
            className,
            color,
            icon,
            ...rest
        } = this.props
        if (color === undefined) {
            color = 'indigo'
        }
        let text = `text-indigo-800 hover:text-indigo-100 focus:text-indigo-100`,
            bg = `bg-indigo-200 hover:bg-indigo-900 focus:bg-indigo-900`,
            border = `border-indigo-500`
        return (
            <div>
                <Button
                    onClick={onClick}
                    name={name}
                    {...rest}
                    className={`${bg} ${text} borde shadow shadow-lg focus:shadow-inner ${border} w-full ${className}`}>
                    <i className={`float-left py-1 text-sm fa fa-${icon}`}></i>
                    {children}
                </Button>
            </div>
        )
    }
}
