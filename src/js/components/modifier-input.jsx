import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ColorTypes, ProductTypes} from '../constants.js';
import {extend} from '../utils.js';

const ERROR_CLASS = `product__error`;

const ModifierInput = ({children, modifier, onDataChange, onValidityChange, modifierNeedClear, onModifierClear}) => {
  const {id, name = ``, type = ``, color = ``, colorType = ColorTypes[0]} = modifier;
  const initialState = {id, name, type, color, colorType};
  const productTypeRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputColorRef = useRef(null);
  const colorTypesRef = useRef(null);
  const [state, setState] = useState(initialState);

  const toggleError = (data, ref) => {
    if (data) {
      ref.current.classList.remove(ERROR_CLASS);
    } else {
      ref.current.classList.add(ERROR_CLASS);
    }
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
          </option>
        )}
      </select>
    </div>
    <div className="product__container">
      <label htmlFor={`product-modifier-${id}`} className="product__label">Название модификатора</label>
      <input onChange={(evt) => dataChangeHandler(evt, `name`)} id={`product-modifier-${id}`} ref={inputNameRef} className="product__input" type="text" value={state.name} placeholder="Например, red apple"/>
    </div>
    <div className="product__container">
      <label htmlFor={`product-color-${id}`} className="product__label">Цвет модификатора</label>
      <input id={`product-color-${id}`} onChange={(evt) => dataChangeHandler(evt, `color`)} ref={inputColorRef} className="product__input" type="text" value={state.color} placeholder="Например, #ff00ff" />
      <div className="product__radio-group" ref={colorTypesRef}>
        {ColorTypes.map((item) =>
          <label key={item} className="product__radio-label">
            <input
              type="radio"
              value={item}
              name={`product-color-type-${id}`}
              checked={state.colorType === item}
              onChange={(evt) => dataChangeHandler(evt, `colorType`)}/>
            {item}
          </label>
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
    colorType: PropTypes.oneOf(ColorTypes),
    type: PropTypes.oneOf(ProductTypes.map((item) => item.value)),
  }).isRequired,
  onDataChange: PropTypes.func.isRequired,
  onValidityChange: PropTypes.func,
  modifierNeedClear: PropTypes.bool,
  onModifierClear: PropTypes.func
};

export default ModifierInput;
