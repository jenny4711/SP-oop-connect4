

class Game {
constructor(height=6,width=7,board=[],player=1,timer=0){
  
this.height =height
this.width=width
this.board = board
this.player =player
this.handleClickBtn =this.handleClick.bind(this)
this.timer =timer
this.timerSet = setInterval(
  this.times.bind(this),1000)


}

makeBoard(){
for(let y = 0;y < this.height ; y++){
  this.board.push(Array.from({length:this.width}));
 
}
}

makeHtmlBoard(){
const board = document.getElementById('board');

// -------top button---------
const top =document.createElement('tr');
top.setAttribute('id','column-top')
  top.addEventListener('click',this.handleClickBtn);

for(let x = 0; x<this.width; x++){
const headCell = document.createElement('td');

headCell.setAttribute('id',x);
top.append(headCell)

}


board.append(top);
// -----------top button-----
// --------cells row &col-------------------
for(let y = 0; y <this.height; y ++){
const row =document.createElement('tr');

for(let x =0; x < this.width;x++){
const cell =document. createElement('td');

cell.setAttribute('id',`${y}-${x}`);
row.append(cell);
}
board.append(row)
// -----------cells row &col----------------------
}
}
// --------------backward the list of col- bottom to up and return col------------
findSpotForCol(x){
  for (let y = this.height - 1; y >= 0; y--) {
    
    if (!this.board[y][x]) {
      return y;
    }
  }
  return null;
}
// --------------backward the list of col- bottom to up and return col------------
// ------------------after click - put div(create class class 'piece') for show -----
placeInTable(y,x){
  const piece =document.createElement('div');
  piece.classList.add('piece')
  piece.classList.add(`p${this.player}`);
  piece.style.top =50 *(y+2);

  const spot = document.getElementById(`${y}-${x}`);
 
  console.log(spot)
  spot.append(piece);
  
}
// ------------------after click - put div(create class class 'piece') for show -----
// -----------after finish the Game ----------------------------
endGame(msg){
  const text = document.querySelector('span')
  
  
  text.innerText = msg.toUpperCase()
 
  alert(msg);

}
// -----------after finish the Game ----------------------------

handleClick(evt){
  const x = +evt.target.id;
  console.log(x)
  
  const y =this.findSpotForCol(x)
  if(y ===null){
    return;
  }
  this.board[y][x] =this.player;
  this.placeInTable(y,x);

  // -------show msg who's winner--------------------
  if(this.checkForWin()){
    clearInterval(this.timerSet)
    return this.endGame(`Player ${this.player} won!`);
  }
  // -------show msg who's winner--------------------
  // if(this.board.every(row =>row.every(cell=>cell))){
  //   return this.endGame('Tie!')
  // }
// ---------make playar1 and player2 ------------------
  if(this.player === 1){
    return this.player =2
  }else{
    return this.player=1
  }
  // ---------make playar1 and player2 ------------------
  

}
checkForWin(){
  const _win = cells =>
  cells.every(
    ([y,x])=>
    y>=0 &&
    y<this.height &&
    x>= 0 &&
    x< this.width &&
    this.board[y][x] === this.player
  )
  
  for(let y =0;y<this.height; y++){
    for(let x =0;x<this.width;x++){
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
    }
  }

}


}
times(){
  this.timer+=1
  const timerT = document.querySelector('.timer')
  timerT.innerText=this.timer
  if(this.timer === 61){
    clearInterval(this.timerSet)
    alert('Time Over!!')
    const text = document.querySelector('span')
    text.innerText = 'TIME OVER!!!!!'
   
  }

}
start(){
  const startBtn = document.querySelector('button')
  startBtn.innerHTML ='RESTART'
startBtn.addEventListener('click',(e)=>{

 
  window.location.reload();

})

this.board.push(startBtn)
}


}



const myGame = new Game(6,7)



myGame.start()
myGame.makeBoard()
myGame.makeHtmlBoard()
myGame.findSpotForCol()
myGame.placeInTable()
myGame.endGame()
myGame.handleClick(evt)
myGame.checkForWin()
myGame.timer()



