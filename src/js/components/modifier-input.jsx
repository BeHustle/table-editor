import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ColorTypes, DEFAULT_COLOR_TYPE, ProductTypes, cover, popover} from '../constants.js';
import {setModifierClear} from '../reducer.js';
import {getModifierNeedClear} from '../selectors.js';
import {extend} from '../utils.js';
import {ChromePicker} from 'react-color';
import convert from 'color-convert';
import {connect} from 'react-redux';

const ERROR_CLASS = `product__error`;

const ModifierInput = ({children, modifier, onDataChange, onValidityChange, modifierNeedClear, onModifierClear}) => {
  const {id, position, name = ``, type = ``, color = ``, colorType = DEFAULT_COLOR_TYPE} = modifier;
  const initialState = {id, name, type, color, colorType, position};
  const productTypeRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputColorRef = useRef(null);
  const colorTypesRef = useRef(null);
  const [state, setState] = useState(initialState);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleError = (data, ref) => {
    if (data) {
      ref.current.classList.remove(ERROR_CLASS);
    } else {
      ref.current.classList.add(ERROR_CLASS);
    }
  };

  const convertFromDefaultColorType = () => {
    if (state.colorType === DEFAULT_COLOR_TYPE) {
      return state.color;
    }
    return convert[DEFAULT_COLOR_TYPE][state.colorType](state.color);
  };

  const validate = () => {
    const {name: currentName, type: currentType, color: currentColor, colorType: currentColorType} = state;
    let isValid = false;
    toggleError(currentName, inputNameRef);
    toggleError(currentType, productTypeRef);
    toggleError(currentColor, inputColorRef);
    toggleError(currentColorType, colorTypesRef);
    if (currentName && currentType && currentColor && currentColorType) {
      isValid = true;
    }
    return isValid;
  };

  const dataChangeHandler = (evt, key) => {
    const {value} = evt.currentTarget;
    setState((prev) => extend(prev, {[key]: value}));
  };

  const colorChangeHandler = (colorChecked) => {
    const evt = {currentTarget: {value: colorChecked.hex}};
    dataChangeHandler(evt, `color`);
  };

  useEffect(() => {
    if (typeof onValidityChange === `function`) {
      onValidityChange(validate());
      onDataChange(state);
    } else if (validate()) {
      onDataChange(state);
    }
  }, [state]);

  useEffect(() => {
    if (modifierNeedClear) {
      setState(initialState);
      onModifierClear();
    }
  }, [modifierNeedClear]);

  return <li className="products__item product">
    <div className="product__container">
      <label htmlFor={`product-type-${id}`} className="product__label">Тип товара</label>
      <select onChange={(evt) => dataChangeHandler(evt, `type`)} ref={productTypeRef} value={state.type} id={`product-type-${id}`} className="product__select ">
        <option value="" hidden>Выберите из списка</option>
        {ProductTypes.map((item) =>
          <option
            key={item.value}
            value={item.value}>
            {item.name}
          </option>,
        )}
      </select>
    </div>
    <div className="product__container">
      <label htmlFor={`product-modifier-${id}`} className="product__label">Название модификатора</label>
      <input onChange={(evt) => dataChangeHandler(evt, `name`)} id={`product-modifier-${id}`} ref={inputNameRef} className="product__input" type="text" value={state.name} placeholder="Например, red apple"/>
    </div>
    <div className="product__container">
      <label htmlFor={`product-color-${id}`} className="product__label">Цвет модификатора</label>
      <input id={`product-color-${id}`} ref={inputColorRef} className="product__input" type="text" onClick={() => setShowColorPicker(true)} value={convertFromDefaultColorType()} readOnly={true} placeholder="Нажмите для выбора"/>
      {showColorPicker ? <div style={popover}>
        <div style={cover} onClick={() => setShowColorPicker(false)}/>
        <ChromePicker defaultView={state.colorType} color={state.color} onChangeComplete={colorChangeHandler} disableAlpha={true}/>
      </div> : null }
      <div className="product__radio-group" ref={colorTypesRef}>
        {Object.keys(ColorTypes).map((key) =>
          <label key={key} className="product__radio-label">
            <input
              type="radio"
              value={ColorTypes[key]}
              name={`product-color-type-${id}`}
              checked={state.colorType === ColorTypes[key]}
              onChange={(evt) => dataChangeHandler(evt, `colorType`)}/>
            {key}
          </label>,
        )}
      </div>
    </div>
    {children}
  </li>;
};

ModifierInput.propTypes = {
  children: PropTypes.element.isRequired,
  modifier: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
    colorType: PropTypes.oneOf(Object.values(ColorTypes)),
    type: PropTypes.oneOf(ProductTypes.map((item) => item.value)),
    position: PropTypes.number.isRequired,
  }).isRequired,
  onDataChange: PropTypes.func.isRequired,
  onValidityChange: PropTypes.func,
  modifierNeedClear: PropTypes.bool.isRequired,
  onModifierClear: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modifierNeedClear: getModifierNeedClear(state)
});

const mapDispatchToProps = (dispatch) => ({
  onModifierClear() {
    dispatch(setModifierClear(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifierInput);
