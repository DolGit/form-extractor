import React from 'react'
import PropTypes from 'prop-types';

class Extractor {
    constructor(handle) {
        let el = document.getElementById(handle)
        if (el) {
            this.extract(el.querySelector('form'), el)
        }
    }

    extract(el, parent) {
        this.formProps = this.attributes(el.attributes);
        this.childInputs = this.children(el.children);
        parent.parentNode.removeChild(parent)
    }

    setName(name) {
        this.name = name;
    }

    children(childs={}) {
        return Object.values(childs).map(child => {
            return {tag: child.tagName.toLowerCase(), props: this.attributes(child.attributes)}
        })
    }

    attributes(attrs={}, object={}) {
        Object.values(attrs).forEach(attr => {
            var name = attr.name == 'class' ? 'class-name' : attr.name
            name = name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
            object[name] = attr.value
        })
        return object;
    }
};

const forms = {}

class FormExtractor extends React.Component {
    constructor(props) {
        super(props)
        const form = forms[props.handle]
        this.form = form ? form : new Extractor(props.handle)
        forms[props.handle] = this.form
    }
    render() {
        return (
            <form {...this.form.formProps} {...this.props}>
                {this.form.childInputs.map((input, index) => {
                    let Tag = input.tag;
                    return (
                        <Tag key={index} {...input.props}></Tag>
                    )
                })}
                {this.props.children}
            </form>

        )
    }
}

FormExtractor.propTypes = {
    handle: PropTypes.string.isRequired,
};

export default FormExtractor