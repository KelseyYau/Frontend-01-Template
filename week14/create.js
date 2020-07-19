export function create(Cls, attributes, ...children) {
  console.log(arguments)
  let o
  if (typeof Cls === "string") {
    o = new Wraper(Cls)
  } else {
    o = new Cls
  }

  for(let name in attributes) {
    o.setAttribute(name, attributes[name])
    // o[name] = attributes[name]
  }

  let visit = (children) => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new Text(child)
      }
      if (typeof child === "object" && child instanceof Array) {
        visit(child)
        continue
      }
      o.appendChild(child)
    }
  }

  visit(children)
  return o
}

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

export class Wraper {
  constructor(type) {
    this.children = []
    this.root = document.createElement(type)
  }

  set id(v) { // 属性
    console.log("parent", v)
  }

  appendChild(child) {
    // child.mountTo(this.root)
    this.children.push(child)
  }

  addEventListener(type, handler, config) {
    this.root.addEventListener(...arguments)
  }

  setAttribute(name, value) {
    console.log(name, value)
    this.root.setAttribute(name, value)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
    for(let child of this.children) {
      child.mountTo(this.root)
    }
  }
}