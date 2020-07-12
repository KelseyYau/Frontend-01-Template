function create(Cls, attributes, ...children) {
  console.log(arguments)
  let o
  if (typeof Cls === "string") {
    o = new Wraper(Cls)
  } else {
    o = new Cls
  }

  for(let name in attributes) {
    // o.setAttribute(name, attributes[name])
    o[name] = attributes[name]
  }

  for (let child of children) {
    if (typeof child === "string") {
      child = new Text(child)
    }
    o.appendChild(child)
  }
  return o
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text)
  }

  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class Wraper {
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

//////////////////////////////////////////
class MyComponent {
  constructor(config) {
    this.children = []
    this.attributes = new Map()
    this.properties = new Map()
  }

  set id(v) { // 属性
    console.log("parent", v)
  }

  appendChild(child) {
    // child.mountTo(this.root)
    this.children.push(child)
  }

  setAttribute(name, value) {
    console.log(name, value)
    this.attributes.set(name, value)
  }

  set title(value) {
    this.properties.set('title', value)
  }

  render() {
    return <article>
      {/* <h1>{this.attributes.get("title")}</h1> */}
      <h1>{this.properties.get("title")}</h1>
      <header>i am header</header>
      {this.slot}
      <footer>i am footer</footer>
    </article>
  }

  mountTo(parent) {
    this.slot = <div></div>

    for(let child of this.children) {
      this.slot.appendChild(child)
    }

    this.render().mountTo(parent)
  }
}

// let component = <div id="a" style="width: 100px;height: 100px; background-color:lightgreen">
//   <div></div>
//   <div></div>
//   <div></div>
// </div>

let  component = <MyComponent title="title">{new Wraper("span")}</MyComponent>
// component.title = "aaa"
console.log(component)
// component.setAttribute("id", "a")


component.mountTo(document.body)
