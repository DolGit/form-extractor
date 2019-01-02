'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Extractor = function () {
    function Extractor(handle) {
        _classCallCheck(this, Extractor);

        var el = document.getElementById(handle);
        if (el) {
            this.extract(el.querySelector('form'), el);
        }
    }

    Extractor.prototype.extract = function extract(el, parent) {
        this.formProps = this.attributes(el.attributes);
        this.childInputs = this.children(el.children);
        parent.parentNode.removeChild(parent);
    };

    Extractor.prototype.setName = function setName(name) {
        this.name = name;
    };

    Extractor.prototype.children = function children() {
        var _this = this;

        var childs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return Object.values(childs).map(function (child) {
            return { tag: child.tagName.toLowerCase(), props: _this.attributes(child.attributes) };
        });
    };

    Extractor.prototype.attributes = function attributes() {
        var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        Object.values(attrs).forEach(function (attr) {
            var name = attr.name == 'class' ? 'class-name' : attr.name;
            name = name.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
            object[name] = attr.value;
        });
        return object;
    };

    return Extractor;
}();

;

var forms = {};

var RailsForm = function (_React$Component) {
    _inherits(RailsForm, _React$Component);

    function RailsForm(props) {
        _classCallCheck(this, RailsForm);

        var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

        var form = forms[props.handle];
        _this2.form = form ? form : new Extractor(props.handle);
        forms[props.handle] = _this2.form;
        return _this2;
    }

    RailsForm.prototype.render = function render() {
        return _react2.default.createElement(
            'form',
            this.form.formProps,
            this.form.childInputs.map(function (input, index) {
                var Tag = input.tag;
                return _react2.default.createElement(Tag, _extends({ key: index }, input.props));
            }),
            this.props.children
        );
    };

    return RailsForm;
}(_react2.default.Component);

RailsForm.propTypes = process.env.NODE_ENV !== "production" ? {
    handle: _propTypes2.default.string.isRequired
} : {};

exports.default = RailsForm;
module.exports = exports['default'];