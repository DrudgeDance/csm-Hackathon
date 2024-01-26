class Apple {
  constructor(el) {
    this.node = document.createElement("img");
    this.node.setAttribute("id", "apple");
    this.node.setAttribute("src", "src/assets/apple.jpg");

    el.appendChild(this.node);


    //this.headSnake = document.querySelector("#board");

    // Math.random() generates a random nubmer between 0 and <1 (.999999)
    // .9999 * 13 = 12.99987
    // 13 * 50 = 650

    // max height is 700


    let leftPosition = Math.round(Math.random() * 13) * 50;
    let topPosition = Math.round(Math.random() * 13) * 50;

    this.node.style.left = `${leftPosition}px`;
    this.node.style.top = `${topPosition}px`;
  }

  // identifyHead(){
  //   console.log('headSnake', headSnake)    
  // }
  // checkCollision() {
  //   const head = new Head();
  //   let headTopPosition = Number(head.style.top.replace("px", ""));
  //   let headLeftPosition = Number(head.style.left.replace("px", ""));
  //   if (
  //     headTopPosition === this.topPosition &&
  //     headLeftPosition === this.leftPosition
  //   ) {
  //     this.node.style.display = "none";
  //   }
  // }
  // checkCollision(){
  //   //const head = new Head();
  //   let headTopPosition = Number(head.style.top.replace("px", ""));
  //   let headLeftPosition = Number(head.style.left.replace("px", ""));
  //   let appleTop = Number(apple.style.top.replace("px",""));
  //   let appleLeft = Number(apple.style.left.replace("px",""));
  //  // console.log(headTopPosition, headLeftPosition, appleTop, appleLeft)
  // //   if (
  // //     headTopPosition === appleTop && headLeftPosition === appleLeft
  // //   ) {
  // //  //   apple.style.display = "none";
  // //   }
  // }
}
