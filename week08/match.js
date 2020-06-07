/**匹配选择器 */
function match(element, selector) {
  if (!selector || !element.attribute) {
    return false
  }

  if (selector.charAt(0) === "#") {
    let attr = element.attribute.filter(attr => attr.name === "id")[0]
    if (attr && attr.value === selector.replace("#", '')) {
      return true
    }
  } else if (selector.charAt(0) === ".") {
    let attr = element.attribute.filter(attr => attr.name === "class")[0]
    if (attr && attr.value === selector.replace(".", "")) {
      return true
    }
  } else {
    if (element.tagName === selector) {
      return true
    }
  }
  return false
}