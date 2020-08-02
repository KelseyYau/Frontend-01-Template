import { create, Wraper, Text } from './create'
// import {Carousel} from "./carousel.view";
import {Timeline, Animation} from './cssAnimation/animation'
import {ease} from './cssAnimation/cubicBezier'
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
    let timeline = new Timeline
    timeline.start()

    let position = 0

    let nextPicStopHandler = null

    let children = this.data.map((url, currentPosition) => {
      let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length
      let nextPosition = (currentPosition + 1) % this.length

      let offset = 0

      let onStart = () => {
        timeline.pause()
        clearTimeout(nextPicStopHandler)

        let currentElement = children[currentPosition]

        let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])
        offset = currentTransformValue + 500 * currentPosition
      }

      let onPan = event => {
        let lastElement = children[lastPosition]
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]

        let dx = event.clientX - event.startX

        let currentTransformValue = -500 * currentPosition + offset + dx
        let lastTransformValue = -500 - 500 * lastPosition + offset + dx
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx

        lastElement.style.transform = `translateX(${lastTransformValue}px)`
        currentElement.style.transform = `translateX(${currentTransformValue}px)`
        nextElement.style.transform = `translateX(${nextTransformValue}px)`
      }

      let onPanend = event => {
        let direction = 0
        let dx = event.clientX - event.startX

        if (dx + offset > 250) {
          direction = 1
        } else if(dx + offset < -250) {
          direction = -1
        }

        timeline.resume()
        timeline.start()

        let lastElement = children[lastPosition]
        let currentElement = children[currentPosition]
        let nextElement = children[nextPosition]

        let lastAnimation = new Animation(lastElement.style, "transform", v => `translateX(${v}px)`, -500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 500, 0, ease)
        let currentAnimation = new Animation(currentElement.style, "transform", v => `translateX(${v}px)`, -500 * currentPosition + offset + dx, -500 * currentPosition + direction * 500, 500, 0, ease)
        let nextAnimaition = new Animation(nextElement.style, "transform", v => `translateX(${v}px)`, 500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease)

        timeline.add(lastAnimation)
        timeline.add(currentAnimation)
        timeline.add(nextAnimaition)

        position = (position - direction + this.data.length) % this.data.length

        nextPicStopHandler = setTimeout(nextPic, 3000)
      }
      let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true}></img>
      element.style.transform = "translateX(0px)"
      element.addEventListener("dragstart", event => event.preventDefault())
      return element
    })

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length

      let current = children[position]
      let next = children[nextPosition]

      let currentAnimation = new Animation(current.style, "transform", v => `translateX(${5 * v}px)`, -100 * position, -100 - 100 * position, 500, 0, ease)
      let nextAnimaition = new Animation(next.style, "transform", v => `translateX(${5 * v}px)`, 100 - 100 * nextPosition, -100 * nextPosition, 500, 0 ,ease)

      timeline.add(currentAnimation)
      timeline.add(nextAnimaition)

      position = nextPosition
      nextPicStopHandler = setTimeout(nextPic, 3000)
    }
    nextPicStopHandler = setTimeout(nextPic, 3000)

    return <div class="carousel">
      {children}
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
