var parser = require('./parser')

module.exports = function (source, map) {
  // console.log(source)
  // console.log("my loader is running!")
  let tree = parser.parseHTML(source)
  // console.log(tree.children[1])
  // console.log(parser.parseHTML(source))

  let template = null
  let script = null

  for(let node of tree.children) {
    if (node.tagName === "template") {
      template = node.children.filter(e => e.type != "text")[0]
    }

    if (node.tagName === 'script') {
      script = node
    }
  }

  let createCode = ""
  // console.log(template)

  let visit = (node) => {
    if (node.type === 'text') {
      return JSON.stringify(node.content)
    }
    let attrs = {}
    for(let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value
    }

    let children = node.children.map(node => visit(node))
    return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
  }

  
  let r = `
  import {create, Text, Wrapper} from "./create"
  export class Carousel {
    render() {
      return ${visit(template)}
    }

    setAttribute(name, value) {
      this[name] = value
    }

    mountTo(parent) {
      this.render().mountTo(parent)
    }
  }
  `
  console.log(r)
  return r
}