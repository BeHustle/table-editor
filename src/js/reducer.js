import {getModifiers} from './selectors.js';
import {copyObj, delObjFromArr, extend, getIndex} from './utils.js';

const initialState = {
  modifiers: [],
  modifierNeedClear: false,
  test: false
};

const ActionTypes = {
  SET_MODIFIERS: `SET_MODIFIERS`,
  ADD_MODIFIER: `ADD_MODIFIER`,
  DELETE_MODIFIER: `DELETE_MODIFIER`,
  UPDATE_MODIFIER: `UPDATE_MODIFIER`,
  SET_MODIFIER_CLEAR: `SET_MODIFIER_CLEAR`,
  UP_MODIFIER: `UP_MODIFIER`,
  DOWN_MODIFIER: `DOWN_MODIFIER`,
  TEST: `TEST`
};

const addModifier = (modifier) => ({
  type: ActionTypes.ADD_MODIFIER,
  payload: modifier
});

const deleteModifier = (modifier) => ({
  type: ActionTypes.DELETE_MODIFIER,
  payload: modifier
});

const setModifiers = (modifiers) => ({
  type: ActionTypes.SET_MODIFIERS,
  payload: modifiers
});

const updateModifier = (modifier) => ({
  type: ActionTypes.UPDATE_MODIFIER,
  payload: modifier
});

const upModifier = (modifier) => ({
  type: ActionTypes.UP_MODIFIER,
  payload: modifier
});

const downModifier = (modifier) => ({
  type: ActionTypes.DOWN_MODIFIER,
  payload: modifier
});

export const setModifierClear = (type) => ({
  type: ActionTypes.SET_MODIFIER_CLEAR,
  payload: type
});

const updateStorage = (state) => {
  window.localStorage.setItem(`modifiers`, JSON.stringify(getModifiers(state)));
};

export const Operation = {
  loadModifiers: () => (dispatch) => {
    const modifiers = JSON.parse(window.localStorage.getItem(`modifiers`));
    if (modifiers) {
      dispatch(setModifiers(modifiers));
    }
  },
  addModifier: (modifier) => (dispatch, getState) => {
    const modifierId = getModifiers(getState()).length + 1;
    const newModifier = extend(modifier, {id: modifierId, position: modifierId});
    dispatch(addModifier(newModifier));
    updateStorage(getState());
  },
  updateModifier: (modifier) => (dispatch, getState) => {
    dispatch(updateModifier(modifier));
    updateStorage(getState());
  },
  deleteModifier: (modifier) => (dispatch, getState) => {
    dispatch(deleteModifier(modifier));
    updateStorage(getState());
  },
  upModifier: (modifier) => (dispatch, getState) => {
    dispatch(upModifier(modifier));
    updateStorage(getState());
  },
  downModifier: (modifier) => (dispatch, getState) => {
    dispatch(downModifier(modifier));
    updateStorage(getState());
  }
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.SET_MODIFIERS:
      return extend(state, {modifiers: action.payload});
    case ActionTypes.ADD_MODIFIER:
      return extend(state, {modifiers: [...state.modifiers.slice(), action.payload]});
    case ActionTypes.SET_MODIFIER_CLEAR:
      return extend(state, {modifierNeedClear: action.payload});
    case ActionTypes.UPDATE_MODIFIER:
      const updIndex = getIndex(state.modifiers, action.payload);
      if (updIndex === -1) {
        return state;
      }
      const updModifiers = state.modifiers.slice();
      updModifiers[updIndex] = action.payload;
      return extend(state, {modifiers: updModifiers});
    case ActionTypes.DELETE_MODIFIER:
      const delIndex = getIndex(state.modifiers, action.payload);
      if (delIndex === -1) {
        return state;
      }
      const delModifiers = state.modifiers.slice();
      delModifiers.splice(delIndex, 1);
      return extend(state, {modifiers: delModifiers});
    case ActionTypes.UP_MODIFIER:
      const toUpIndex = getIndex(state.modifiers, action.payload);
      if (toUpIndex === -1 || toUpIndex === 0) {
        return state;
      }
      const toDownIndex = toUpIndex - 1;
      const upModifiers = state.modifiers.slice();
      upModifiers[toUpIndex].position--;
      upModifiers[toDownIndex].position++;
      return extend(state, {modifiers: upModifiers});
    case ActionTypes.DOWN_MODIFIER:
      const toDownIndex2 = getIndex(state.modifiers, action.payload);
      if (toDownIndex2 === -1 || toDownIndex2 === (state.modifiers.length - 1)) {
        return state;
      }
      const toUpIndex2 = toDownIndex2 + 1;
      const downModifiers = state.modifiers.slice();
      downModifiers[toDownIndex2].position++;
      downModifiers[toUpIndex2].position--;
      return extend(state, {modifiers: downModifiers});
    default:
      return state;
  }
};

export default reducer;
