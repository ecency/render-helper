export function removeChildNodes(node: Node): void {
  [...Array(node.childNodes.length).keys()].forEach(x => {
    node.removeChild(node.childNodes[x])
  })
}
