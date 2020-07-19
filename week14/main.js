import { create, Wraper, Text } from './create'



//////////////////////////////////////////
class Carousel {
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
    // this.attributes.set(name, value)
    this[name] = value
  }

  set title(value) {
    this.properties.set('title', value)
  }

  render() {
    return <div class="carousel">
      { this.data.map( url => {
        let element = <img src={url} />
        element.addEventListener("dragstart", event => event.preventDefault())
        
        return element
      }) }
    </div>
  }

  mountTo(parent) {
    // this.slot = <div></div>

    // for(let child of this.children) {
    //   this.slot.appendChild(child)
    // }

    this.render().mountTo(parent)
  }
}

// let component = <div id="a" style="width: 100px;height: 100px; background-color:lightgreen">
//   <div></div>
//   <div></div>
//   <div></div>
// </div>

let  component = <Carousel data={[
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}></Carousel>
// component.title = "aaa"
console.log(component)
// component.setAttribute("id", "a")


component.mountTo(document.body)
