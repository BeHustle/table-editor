import React, {useState} from 'react';
import {Operation, setModifierClear} from '../reducer.js';
import PropTypes from 'prop-types';
import {extend} from '../utils.js';
import ModifierInput from './modifier-input.jsx';
import {connect} from 'react-redux';

const NewModifier = (props) => {
  const [validity, setValidity] = useState(false);
  const [data, setData] = useState({});
  const {onModifierAdd} = props;

  const validityHandler = (state) => {
    setValidity(state);
  };

  const dataChangeHandler = (newData) => {
    setData((prev) => extend(prev, newData));
  };

  const modifierAddHandle = (evt) => {
    evt.preventDefault();
    if (validity) {
      onModifierAdd(data);
    }
  };

  return <ModifierInput {...props} onValidityChange={validityHandler} onDataChange={dataChangeHandler}>
    <div className="product__controls">
      <button onClick={modifierAddHandle} className="product__btn" type="button" aria-label="Добавить модификатор">
        <img src="./img/plus.svg" width="32" height="32" alt=""/>
      </button>
    </div>
  </ModifierInput>;
};

NewModifier.propTypes = {
  onModifierAdd: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onModifierAdd(modifier) {
    dispatch(Operation.addModifier(modifier));
    dispatch(setModifierClear(true));
  },
});

export default connect(null, mapDispatchToProps)(NewModifier);
