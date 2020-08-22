export const extend = (obj1, obj2) => Object.assign({}, obj1, obj2);

export const getIndex = (arr, obj) => arr.findIndex((it) => it.id === obj.id);

export const copyObj = (obj) => Object.assign({}, obj);
