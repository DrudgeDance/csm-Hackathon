class Head {
  constructor(el) {
    this.node = document.createElement("div");
    this.node.setAttribute("id", "headSnake");
    el.appendChild(this.node);

    this.currentDirection = "right";
    this.SPEED = 250;

    this.node.style.top = 0;
    this.node.style.left = 0;
    // Refactor the below line to create a bound version of `this.Move`.
    // We must do this in order to retain the context of `this` in an asynchronous setTimeout call

    this.boundMove = this.move.bind(this);

    /*************************************************/
    /************  Additional Variables  *************/
    /*  Snake segment  */
    this.board = el;              // Making board easier to access
    this.path = [];               // Array to store the path of the head
    this.bodySegments = [];       // Array to store the body segments

    this.gameTurn = undefined;    // Game turn storage to clear it later to stop game

    /* Initialize head and apple position variables  */
    this.headLeft  = undefined;
    this.headTop   = undefined;

    this.appleLeft = undefined;
    this.appleTop  = undefined;
    /*************************************************/
    /*************************************************/

    setTimeout(this.boundMove, this.SPEED);
    


  }

  move() {  // Game main loop
    console.log(`Positions of Snake Head: (${this.headLeft}, ${this.headTop}) and Apple: (${this.appleLeft}, ${this.appleTop})  `);
    console.log(`Current Game turn is: ${this.gameTurn}`);

    if(this.isGameOver) return;     // Stops game if over.
    
    console.log(`Current Path is length ${this.path.length} as taken by snake.`)
    // console.log(`${this.path.forEach((element)=>(console.log(element)))}`)

    this.headRefreshPos();          // Refreshes head position

    this.appleRefreshPos();         // Refreshes apple position

    this.boardCollision();          // Checks for a collision on the board

    this.segmentCollision();        // Checking Segment Collision first on each iteration

    this.readKeyboardInputs();      // Checking for keyboard inputs

    this.onCollisionWithApple();    // Checking for collission with apple

    this.updateSegmentPositions();  // Updating Snake Segment Positions

    this.gameTurn = setTimeout(this.boundMove, this.SPEED);
  }

  boardCollision(){
    if(  this.headLeft < 0 || this.headLeft > 670 || this.headTop > 670 || this.headTop < 0){
      console.log("Collision Detected");
      this.endGame();
    }
  }

  headRefreshPos(){
    //Refresh head position
    this.headLeft  = Number(this.node.style.left.replace("px",""));
    this.headTop   = Number(this.node.style.top.replace("px",""));
  }

  appleRefreshPos(){
    //Refresh apple position
    console.log(`Old Positions: ${this.appleTop}, ${this.appleLeft}`)
    this.appleLeft = Number(apple.style.left.replace("px",""));
    this.appleTop  = Number(apple.style.top.replace("px",""));
    console.log(`New Positions: ${this.appleTop}, ${this.appleLeft}`)
  }

  updateSegmentPositions(){
    // Logic to update all segments to follow snake
    // Store the new position of the head in the path
    this.path.push({ left: this.node.style.left, top: this.node.style.top });

    // Update the position of each body segment
    this.bodySegments.forEach((segment, index) => {
      if (this.path.length > index + 1) {  // Ensures we have a position to assign
        segment.setPosition(this.path[this.path.length - index - 2]);
      }
    });
  }

  segmentCollision(){
    let count = 0;
    for (let segment of this.bodySegments) {
      count++;
      console.log(`Segment ${count} Pos:`, Number(segment.node.style.left.replace("px","")), Number(segment.node.style.top.replace("px","")));

      if (this.headLeft === Number(segment.node.style.left.replace("px","")) && 
          this.headTop === Number(segment.node.style.top.replace("px","")) ) {
            console.log(`SEGMENT COLLISION @ Segment: ${count}`);
            this.endGame(); // Calling a method to handle the end of the game
            
      }
    }
  }

  onCollisionWithApple(){
    
    // Check for apple collision, modify BODY/APPLE
    if ( this.checkAppleCollision() ) {
      console.log("We have a collission");

      // create snakePositions to store HEAD and SEGMENT positions
      const snakePositions = {};
      snakePositions[`${this.headTop}y`]='headTop';
      snakePositions[`${this.headLeft}x`]='headLeft';
      console.log( `Items Outside While 1: ${Object.keys(snakePositions).length-1}`)
      let count = 0;
      for (let segment of this.bodySegments) {
        snakePositions[`${Number(segment.node.style.top.replace("px",""))}y`] = `Segment: ${count}`;
        snakePositions[`${Number(segment.node.style.left.replace("px",""))}x`] = `Segment: ${count++}`;
      }
      console.log( `Items Outside While 2: ${Object.keys(snakePositions).length-1}`)

      // "Recreate apple"
      this.regenerateApple();

      // "Do not generate apple over snake HEAD or SEGMENTS
      while(  snakePositions[`${this.appleTop}y`] && snakePositions[`${this.appleLeft}x`] ){

        console.log( `Items in while: ${Object.keys(snakePositions).length-1}`)
        console.log( `Overlap: ${Boolean(snakePositions[`${this.appleTop}y`] && snakePositions[`${this.appleLeft}x`] )}` )
        console.log(snakePositions);
        // "Apple Accident" -- Apple Generated on a Snake Segment or Head ... Regenerating
        console.log(`Apple Accident: ${snakePositions[`${this.appleLeft}x`],snakePositions[`${this.appleTop}y`]} ... Regenerating ...`);
         // "Recreate apple"
        this.regenerateApple();
      }

      // "Finally, create a snake segment"
      this.appendSnakeSegment();
    }
  }

  regenerateApple(){
    this.board.removeChild(apple);
    new Apple(this.board);
    this.appleRefreshPos();
  }

  appendSnakeSegment(){
    // new segment logic
    const newSegmentPosition = this.path[this.path.length - 1];
    const newSegment = new BodySegment(newSegmentPosition, this.board);
    this.bodySegments.push(newSegment);
  }

  checkAppleCollision() {
    
    // debugging method
    // console.log("head positions", this.headLeft, this.headTop)
    // console.log("apple positions", this.appleLeft, this.appleTop)

    // Return "true" if collision, "false" otherwise
    console.log(this.headLeft === this.appleLeft && this.headTop === this.appleTop);
    return (this.headLeft === this.appleLeft && this.headTop === this.appleTop);
  }

  endGame() {
    // Clear the movement timeout
    clearTimeout( this.gameTurn );
    this.isGameOver = true;
    // Display game over message or take other actions to end the game
    alert("Game Over!"); 
  }

  readKeyboardInputs(){
    const head = this.node;
    const direction = this.currentDirection;
   
    if (direction === "right") {
      head.style.left = `${(this.headLeft += 50)}px`;
      if (this.headLeft > 650) {
        //head.style.left = "650px";
        return;
      }
    }
    if (direction === "up") {
      head.style.top = `${(this.headTop -= 50)}px`;
      if (this.headTop < 0) {
        //head.style.top = "0px";
        return;
      }
    }
    if (direction === "left") {
      head.style.left = `${(this.headLeft -= 50)}px`;
      if (this.headLeft < 0) {
        //head.style.left = "0px";
        return;
      }
    }
    if (direction === "down") {
      head.style.top = `${(this.headTop += 50)}px`;
      if (this.headTop > 650) {
        //head.style.top = "650px";
        return;
      }
    }
  }
}

