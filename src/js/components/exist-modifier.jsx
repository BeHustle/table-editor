import React, {useState} from 'react';
import {Operation} from '../reducer.js';
import {extend} from '../utils.js';
import ModifierInput from './modifier-input.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const ExistModifier = (props) => {
  const {
    isFirst, isLast, onModifierChange, onModifierDelete, onModifierUp, onModifierDown
  } = props;
  const [data, setData] = useState({});

  const dataChangeHandler = (newData) => {
    onModifierChange(newData);
    setData((prev) => extend(prev, newData));
  };

  const modifierDeleteHandler = (evt) => {
    evt.preventDefault();
    onModifierDelete(data);
  };

  const modifierUpHandler = (evt) => {
    evt.preventDefault();
    onModifierUp(data);
  };

  const modifierDownHandler = (evt) => {
    evt.preventDefault();
    onModifierDown(data);
  };

  return <ModifierInput {...props} onDataChange={dataChangeHandler}>
    <div className="product__controls">
      <button onClick={modifierUpHandler} className="product__btn" type="button" aria-label="Переместить модификатор вверх" disabled={isFirst}>
        <img src="./img/arrow-up.svg" width="32" height="32" alt="" />
      </button>
      <button onClick={modifierDownHandler} className="product__btn" type="button" aria-label="Переместить модификатор вниз" disabled={isLast}>
        <img src="./img/arrow-down.svg" width="32" height="32" alt="" />
      </button>
      <button onClick={modifierDeleteHandler} className="product__btn" type="button" aria-label="Удалить модификатор">
        <img src="./img/minus.svg" width="32" height="32" alt="" />
      </button>
    </div>
  </ModifierInput>;
};

ExistModifier.propTypes = {
  onModifierChange: PropTypes.func.isRequired,
  onModifierDelete: PropTypes.func.isRequired,
  onModifierUp: PropTypes.func.isRequired,
  onModifierDown: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onModifierChange(modifier) {
    dispatch(Operation.updateModifier(modifier));
  },
  onModifierDelete(modifier) {
    dispatch(Operation.deleteModifier(modifier));
  },
  onModifierUp(modifier) {
    dispatch(Operation.upModifier(modifier));
  },
  onModifierDown(modifier) {
    dispatch(Operation.downModifier(modifier));
  }
});

export default connect(null, mapDispatchToProps)(ExistModifier);
