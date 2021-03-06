import cx from 'classnames';
import React from 'react';


export default class EditableText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
        };
    }

    render() {
        const tagName = this.props.tagName || 'p';
        const props = {
            className: cx('EditableText', this.props.className, {
                editing: this.state.editing,
                empty: !this.props.content,
                flashing: this.props.flash,
            }),
            contentEditable: true,
            onFocus: ev => {
                const text = ev.target.innerText;
                const state = {
                    editing: true,
                };

                this.setState(state);
            },
            onBlur: ev => {
                const text = ev.target.innerText.replace('\n', '');
                if (text != this.props.content) {
                    if (this.props.onChange) {
                        this.props.onChange(text);
                    }
                }

                this.setState({
                    editing: false,
                });
            },
            onKeyDown: (ev) => {
                if (!this.props.multiline) {
                    if (ev.key === 'Enter') {
                        ev.preventDefault()
                    }
                }
                if (ev.target.innerText.length > this.props.maxLength) {
                    const regex = /^[\w\W ]$/;
                    if (ev.key.match(regex)) {
                        ev.preventDefault()
                    }
                }
            },
            dangerouslySetInnerHTML: {
                __html: this.state.editing? this.props.content : (this.props.content || this.props.placeholder),
            },
        };

        return React.createElement(tagName, props);
    }
}
