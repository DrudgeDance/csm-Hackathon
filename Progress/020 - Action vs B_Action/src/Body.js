class BodySegment {
    constructor(position, board) {
      this.node = document.createElement("div");
      this.node.style.position = "absolute";
      this.node.style.width = "50px";  // Same as head
      this.node.style.height = "50px"; // Same as head
      this.node.style.backgroundColor = "green"; // Same color as head, can be changed
      this.node.style.left = position.left;
      this.node.style.top = position.top;
      board.appendChild(this.node);  // Adding the body segment to the board
    }
  
    setPosition(position) {
      this.node.style.left = position.left;
      this.node.style.top = position.top;
    }

    
  }