export { Component } from './component';
const React = {};

Object.defineProperty(React, 'createElement', {

  value: function(tag, attrs, ...childrens) {
    return {
      tag,
      attrs,
      childrens
    }
  }
});

export default React;