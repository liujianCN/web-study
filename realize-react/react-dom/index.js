const ReactDOM = {};

//挂载方法
const render = (vnode, container) => container.appendChild(_render(vnode));

function compRender(vnode) {
  _render(vnode);
}

// 创建组件的方法
const createComponent = (comp, props) => {
  let vnode;
  if (comp.isReactClass) {
    vnode = new comp(props).render();
    console.log('实例', vnode);
  } else {
    // inst
    vnode = comp(props);
  }
  return vnode;
};

// 核心的render方法
function _render(vnode) {
  const setAttrs = (dom, key, value) => {
    if (key === 'className') {
      key = 'class';
    }
    if (/on\w+/.test(key)) {
      key = key.toLowerCase();
      // console.log('key', key);
      dom[key] = value;
    } else if (key === 'style') {
      if (!value || typeof value === 'string') {
        dom.style.cssText = value;
      } else if (typeof value === 'object') {
        Object.keys(value).forEach(key => (dom.style[key] = value[key]));
      }
    } else {
      if (Object.prototype.hasOwnProperty.call(dom, key)) {
        dom[key] = value;
      }
      if (value) {
        dom.setAttribute(key, value);
      } else {
        dom.remove(key);
      }
    }
  };
  // console.log(vnode);

  // 有要render的内容没有
  if (vnode === undefined || vnode === null || vnode === '') return;

  // 如果渲染的是字符串或者数字
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return document.createTextNode(vnode);
  }

  // 如果要渲染的是vnode对象
  if (typeof vnode === 'object') {
    const { tag, attrs, childrens } = vnode;

    // 如果渲染的是组件
    if (typeof tag === 'function') {
      const vnode = createComponent(tag, attrs);
      compRender(vnode)
    }
    const dom = document.createElement(tag);

    // 如果有属性，设置属性
    if (attrs) {
      Object.keys(attrs).forEach(key => {
        const value = attrs[key];
        setAttrs(dom, key, value);
      });
    }
    if (childrens && childrens.length > 0) {
      childrens.forEach(children => render(children, dom));
    }
    return dom;
  }
}

Object.defineProperty(ReactDOM, 'render', {
  value: render
});

export default ReactDOM;
