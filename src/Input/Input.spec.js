import 'react';
import {componentFactory, inputDriverFactory} from './Input.driver';
import _ from 'lodash/fp';

describe('Input', () => {
  const {createShallow, createMount} = componentFactory();

  const createDriver = _.compose(inputDriverFactory, createShallow);
  const createMountDriver = _.compose(inputDriverFactory, createMount);

  describe('value attribute', () => {
    it('should pass down to the wrapped input', () => {
      const value = 'hello';
      const driver = createDriver({value});

      expect(driver.getValue()).toEqual(value);
    });
  });

  describe('defaultValue attribute', () => {
    it('should pass down to the wrapped input', () => {
      const defaultValue = 'hello';

      const driver = createDriver({defaultValue});

      expect(driver.getDefaultValue()).toEqual(defaultValue);
    });
  });

  describe('tabIndex attribute', () => {
    it('should pass down to the wrapped input', () => {

      const tabIndex = 1;

      const driver = createDriver({tabIndex});

      expect(driver.getTabIndex()).toEqual(tabIndex);
    });
  });

  describe('error attribute', () => {
    it('should display an error icon if error is true', () => {
      const error = true;

      const driver = createDriver({error});

      expect(driver.hasExclamation()).toEqual(true);
      expect(driver.hasError()).toBe(true);
    });
  });

  describe('unit attribute', () => {
    it('should the unit text if passed', () => {
      const unit = '$';

      const driver = createDriver({unit});

      expect(driver.getUnit()).toEqual(unit);
    });
  });

  describe('magnifyingGlass attribute', () => {
    it('should display a magnifying glass icon if magnifyingGlass is true', () => {
      const magnifyingGlass = true;

      const driver = createDriver({magnifyingGlass});

      expect(driver.hasMagnifyingGlass()).toEqual(true);
    });

    it('should not display a magnifying glass icon if magnifyingGlass is false', () => {
      const magnifyingGlass = false;

      const driver = createDriver({magnifyingGlass});

      expect(driver.hasMagnifyingGlass()).toEqual(false);
    });

    it('should not display a magnifying glass icon if error is true', () => {
      const magnifyingGlass = false;
      const error = true;

      const driver = createDriver({magnifyingGlass, error});

      expect(driver.hasMagnifyingGlass()).toEqual(false);
    });
  });

  describe('rtl attribute', () => {
    it('should have rtl if rtl prop is true', () => {
      const rtl = true;

      const driver = createDriver({rtl});

      expect(driver.isRTL()).toBe(true);
    });

    it('should not have rtl if rtl prop is false', () => {
      const rtl = false;

      const driver = createDriver({rtl});

      expect(driver.isRTL()).toBe(false);
    });
  });

  describe('onChange attribute', () => {
    it('should be called when text is entered to the input', () => {
      const onChange = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver({onChange});

      driver.trigger('change', event);

      expect(onChange).toBeCalledWith(event);
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called after keybord key got pressed and then released', () => {
      const onKeyUp = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver({onKeyUp});

      driver.trigger('keyUp', event);

      expect(onKeyUp).toBeCalledWith(event);
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();

      const driver = createDriver({onFocus});

      driver.trigger('focus');

      expect(onFocus).toBeCalled();
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input gets blured', () => {
      const onBlur = jest.fn();

      const driver = createDriver({onBlur});

      driver.trigger('blur');

      expect(onBlur).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onKeyDown = jest.fn();
      const event = {keyCode: 40};

      const driver = createDriver({onKeyDown});

      driver.trigger('keyDown', event);

      expect(onKeyDown).toBeCalledWith(event);
    });
  });

  describe('endpadding class', () => {
    it('should have endpadding when error is true', () => {
      const error = true;

      const driver = createDriver({error});

      expect(driver.hasEndWrapping()).toBe(true);
    });

    it('should have endpadding when magnifyingGlass is true', () => {
      const magnifyingGlass = true;

      const driver = createDriver({magnifyingGlass});

      expect(driver.hasEndWrapping()).toBe(true);
    });
  });

  describe('forceFocus attribute', () => {
    it('should have focus class on input if forceFocus is true', () => {
      const forceFocus = true;

      const driver = createDriver({forceFocus});

      expect(driver.isFocusedStyle()).toBe(true);
    });
  });

  describe('forceHover attribute', () => {
    it('should have hover class on input if forceHover is true', () => {
      const forceHover = true;

      const driver = createDriver({forceHover});

      expect(driver.isHoveredStyle()).toBe(true);
    });

    it('should be hovered if forceFocus is false and forceHover is true', () => {
      const forceFocus = false;
      const forceHover = true;

      const driver = createDriver({forceHover, forceFocus});

      expect(driver.isHoveredStyle()).toBe(true);
    });
  });

  describe('autoFocus attribute', () => {
    it('Mounting an input element with autoFocus=false, should give it the focus', () => {
      const component = createMount({autoFocus: false});
      const driver = inputDriverFactory(component);
      expect(driver.isFocus()).toBe(false);
      component.setProps({autoFocus: true});
      expect(driver.isFocus()).toBe(false);
    });

    it('Mounting an input element with autoFocus=true, gives it the focus', () => {
      const driver = createMountDriver({autoFocus: true});
      expect(driver.isFocus()).toBe(true);
    });
  });

  describe('focus function', () => {
    it('calling focus should give focus to the input', () => {
      const component = createMount({autoFocus: false});
      const driver = inputDriverFactory(component);
      expect(driver.isFocus()).toBe(false);
      component.node.focus();
      expect(driver.isFocus()).toBe(true);
    });
  });

  describe('style attribute', () => {
    it('should set the style by default to "normal"', () => {
      const driver = createDriver({});
      expect(driver.isOfStyle('normal')).toBe(true);
    });

    it('should allowing setting the style to "paneltitle"', () => {
      const driver = createDriver({style: 'paneltitle'});
      expect(driver.isOfStyle('paneltitle')).toBe(true);
    });
  });
});
