class NavigationNode {
  context: Object;

  parentNode: NavigationNode;

  instruction: HullInstruction

  data: null | IncomingData;

  constructor(context: Object, parentNode: NavigationNode, instruction: HullInstruction, data: null | IncomingData) {
    this.context = context;
    this.parentNode = parentNode;
    this.instruction = instruction;
    this.data = data;
  }
}

module.exports = {
  NavigationNode;
}
