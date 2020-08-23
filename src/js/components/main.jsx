import PropTypes from 'prop-types';
import React from 'react';
import {ColorTypes, ProductTypes} from '../constants.js';
import {getModifiers} from '../selectors.js';
import NewModifier from './new-modifier.jsx';
import ExistModifier from './exist-modifier.jsx';
import {connect} from 'react-redux';

const Main = ({modifiers}) => {
  return <main className="container">
    <h1 className="title">Редактирование модификаторов цвета товара</h1>
    <ol className="products">
      {modifiers.map((modifier) =>
        <ExistModifier
          key={modifier.id}
          modifier={modifier}
          position={modifier.position}
          isLast={modifier.id === modifiers[modifiers.length - 1].id}
          isFirst={modifier.id === modifiers[0].id}
        />
      )}
      <NewModifier modifier={{id: 0, position: 0}} />
    </ol>
  </main>;
};

Main.propTypes = {
  modifiers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    color: PropTypes.string,
    colorType: PropTypes.oneOf(Object.values(ColorTypes)),
    type: PropTypes.oneOf(ProductTypes.map((item) => item.value)),
    position: PropTypes.number.isRequired
  }).isRequired),
};

const mapStateToProps = (state) => ({
  modifiers: getModifiers(state),
  needUpdate: state.needUpdate
});


export default connect(mapStateToProps)(Main);
