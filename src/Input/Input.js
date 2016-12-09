import React from 'react';
import styles from './Input.scss';
import classNames from 'classnames';
import SvgExclamation from '../svg/Exclamation.js';
import MagnifyingGlass from '../svg/MagnifyingGlass.js';

class Input extends React.Component {

  constructor(params) {
    super(params);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  render() {
    const {
      id,
      style,
      value,
      forceHover,
      forceFocus,
      placeholder,
      error,
      unit,
      magnifyingGlass,
      defaultValue,
      tabIndex,
      onChange,
      rtl,
      autoFocus,
      onFocus,
      onKeyUp,
      onBlur
    } = this.props;

    const inputClasses = forceFocus ? styles.focus : (forceHover ? styles.hover : '');

    const exclamation = error ? (
      <div className={styles.exclamation}>
        <SvgExclamation width={2} height={11}/>
      </div>) : null;

    const unitDom = unit ? <div className={styles.unit} onClick={this._focus}>{unit}</div> : null;

    const magnifyingGlassDom = magnifyingGlass && !error ?
      <div className={styles.magnifying_glass} onClick={this._focus}><MagnifyingGlass alignLeft={!rtl}/></div> : null;

    const classes = classNames({
      [styles.input]: true,
      [styles[style]]: true,
      [styles.rtl]: !!rtl,
      [styles.error]: !!error,
      [styles.endpadding]: !!magnifyingGlass || !!error,
      [styles.inputWithUnit]: !!unit
    });

    return (
      <div className={classes} onDoubleClick={this._onDoubleClickMargin} id={id} >
        {unitDom}
        <input
          ref="input"
          className={inputClasses}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={this._onKeyDown}
          onDoubleClick={this._onDoubleClick}
          placeholder={placeholder}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          onKeyUp={onKeyUp}
          />

        {exclamation}

        {magnifyingGlassDom}

      </div>
    );
  }

  focus() {
    this.refs.input.focus();
  }

  blur() {
    this.refs.input.blur();
  }

  select() {
    this.refs.input.select();
  }

  _onKeyDown(e) {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.keyCode === 13 /* enter */) {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.keyCode === 27 /* esc */) {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  style: 'normal'
};

Input.propTypes = {
  id: React.PropTypes.string,
  value: React.PropTypes.string,
  style: React.PropTypes.oneOf(['normal', 'paneltitle']),
  forceHover: React.PropTypes.bool,
  forceFocus: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  error: React.PropTypes.bool,
  unit: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  tabIndex: React.PropTypes.number,
  magnifyingGlass: React.PropTypes.bool,
  rtl: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onEscapePressed: React.PropTypes.func,
  onEnterPressed: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onKeyUp: React.PropTypes.func
};

export default Input;
