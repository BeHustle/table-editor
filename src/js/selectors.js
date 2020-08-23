export const getModifiers = (state) => state.modifiers.sort((a, b) => a.position - b.position);

export const getModifierNeedClear = (state) => state.modifierNeedClear;
