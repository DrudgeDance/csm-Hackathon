


document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");    // selects BODY tag
  console.log(body)
  const board = document.querySelector("#board"); // # selects ID
  console.log(board)

  new Apple(board);
  const head = new Head(board);  /// <=== invokes move


  createGrid(14)
  
  body.addEventListener("keydown", (e) => {


    // if( !(head.currentDirection === "right" && e.code === "ArrowLeft" )
    if ( !(head.currentDirection === "right") && e.code === "ArrowLeft"
      /*e.code === "ArrowLeft"*/ ) {
      //console.log("pressed left");
      head.currentDirection = "left";
    }
    if ( !(head.currentDirection === "left") && e.code === "ArrowRight") {
      //console.log("pressed right");
      head.currentDirection = "right";
    }
    if ( !(head.currentDirection === "down") && e.code === "ArrowUp") {
      //console.log("pressed up");
      head.currentDirection = "up";
    }
    if ( !(head.currentDirection === "up") && e.code === "ArrowDown") {
      //console.log("pressed down");
      head.currentDirection = "down";
    }
  });



});




function createGrid(maxGrid){

  for (let row = 0; row < maxGrid; row++) {
    const gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');

    for (let col = 0; col < maxGrid; col++) {
      const square = document.createElement('div');

      if (row % 2 === 0) {
        square.className = (col % 2 === 0) ? 'even' : 'odd';
      } else {
        square.className = (col % 2 !== 0) ? 'even' : 'odd';
      }

      gridRow.appendChild(square);
    }

    board.appendChild(gridRow);
  }
}