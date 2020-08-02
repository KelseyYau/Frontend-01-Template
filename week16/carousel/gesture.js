export function enanbleGesture(element) {
  let contexts = Object.create(null)

  let MOUSE_SYMBOL = Symbol("mouse")
  
  if (document.ontouchstart !== null) {
    element.addEventListener("mousedown", (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null)
      start(event, contexts[MOUSE_SYMBOL])
    
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL])
      }
    
      let mouseup = (event) => {
        end(event, contexts[MOUSE_SYMBOL])
        element.removeEventListener("mousemove", mousemove)
        element.removeEventListener("mouseup", mouseup)
      }
    
      document.addEventListener("mousemove", mousemove)
      document.addEventListener("mouseup", mouseup)
    }) 
  }
  
  
  element.addEventListener("touchstart" , event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start(touch, contexts[touch.identifier])
    }
  })
  
  element.addEventListener("touchmove" , event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  })
  
  element.addEventListener("touchend" , event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })
  
  element.addEventListener("touchcancel" , event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier])
      delete contexts[touch.identifier]
    }
  })
  
  // tap
  // pan
  // flick
  // press
  
  let start = (point, context) => {
    const event = new CustomEvent('start', {
      startX: point.clientX,
      startY: point.clientY,
      clientX: point.clientX,
      clientY: point.clientY
    })
    element.dispatchEvent(event)
    context.startX = point.clientX, context.startY = point.clientY
    context.isTap = true
    context.isPan = false
    context.isPress = false
    context.moves = []
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) {
        return
      }
      context.isTap = false
      context.isPan = false
      context.isPress = true
      const event = new CustomEvent('pressstart', {})
      element.dispatchEvent(event)
    }, 500);
  }
  
  let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY
  
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        const event = new CustomEvent('presscancel', {})
        element.dispatchEvent(event)
      }
      context.isTap = false
      context.isPan = true
      context.isPress = false

      const event = new CustomEvent('panstart')
      Object.assign(event, {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY
      })
      element.dispatchEvent(event)
    }
  
    if (context.isPan) {
      console.log("pan")
      context.moves.push({
        dx,
        dy,
        t: Date.now()
      })
    
      context.moves.filter(record => Date.now() - record.t > 300)
      const event = new CustomEvent('pan')
      Object.assign(event, {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY
      })
      element.dispatchEvent(event)
    }
    // console.log("move", dx, dy)
  }
  
  let end = (point, context) => {
    if (context.isPan) {
      // console.log(context.moves)
      let dx = point.clientX - context.startX, dy = point.clientY - context.startY
      let record = context.moves[0]
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
      let isFlick = speed > 2.5
      if (speed > 2.5) {
        const event = new CustomEvent('flick')
        Object.assign(event, {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed
        })
        element.dispatchEvent(event)
      }

      const event = new CustomEvent('panend')
      Object.assign(event, {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        speed,
        isFlick
      })
      element.dispatchEvent(event)
    }
  
    if (context.isTap) {
      // console.log("tab")
      const event = new CustomEvent('tap', {

      })
      element.dispatchEvent(event)
    }
  
    if (context.isPress) {
      const event = new CustomEvent('pressend', {

      })
      element.dispatchEvent(event)
    }
  
    clearTimeout(context.timeoutHandler)
  }
  
  let cancel = () => {
    const event = new CustomEvent('canceld', {

    })
    element.dispatchEvent(event)
  }  
}
