var bigBlock = document.querySelector('#bigBlock')
var smallBlock = document.querySelector('#smallBlock')
var container = document.querySelector('#container')
var colision = document.querySelector('#colision')
var colisionNr = 0 
var push = document.querySelector('#push')



var rectContainer = container.getBoundingClientRect();
  xContainer = rectContainer.left;
  xContainer = xContainer - 58;
        
var rectSmall = smallBlock.getBoundingClientRect();
  xSmall = rectSmall.left;
  xSmall = xSmall - 58;
var widthS = 20

var rectBig = bigBlock.getBoundingClientRect();
  xBig = rectBig.left;
  xBig = xBig - 58;
var widthB = Math.sqrt(widthS * widthS * 10)


push.addEventListener('contextmenu', () => {
    event.preventDefault()
    massB = Number(document.querySelector('#bigBlockDetail').value)
    massS = Number(document.querySelector('#smallBlockDetail').value)
    smallBlock.style.width = widthS + 'px'
    smallBlock.style.height = widthS + 'px'
    bigBlock.style.width = widthB + 'px'
    bigBlock.style.height = widthB + 'px'  
})

var speedBigBlock = 20
var speedSmallBlock = 0
var directionBigBlock = -1
var directionSmallBlock = 0



push.addEventListener('click', () => {
  var moveBigBlock = setInterval(() => {
    xBig = xBig + directionBigBlock
    bigBlock.style.left = xBig + "px"
    if(xContainer + widthS === xBig){
      speedBigBlock = 10000  
      directionBigBlock = 0
      clearInterval(moveBigBlock)
    } 
    if (xSmall + widthS === xBig ) {
      speedSmallBlock = speedSmallBlock - directionBigBlock * speedBigBlock * massB / massS
      speedBigBlock = speedBigBlock + directionSmallBlock * speedSmallBlock * massS / massB
      directionSmallBlock = -1
      colisionNr++
    }
    if (speedBigBlock < 0) {
      directionBigBlock = +1
    }
    // console.log(speedBigBlock)
    // console.log(speedSmallBlock)

  } , speedBigBlock) 
 
  var moveSmallBlock = setInterval(() => {
    xSmall = xSmall + directionSmallBlock
    smallBlock.style.left = xSmall + "px"  
    if(directionBigBlock === 0 && xSmall === xContainer){
      directionSmallBlock = 0
      speedSmallBlock = 10000
      clearInterval(moveSmallBlock)
    } 
    if(xSmall === xContainer){
      speedSmallBlock = speedSmallBlock
      directionSmallBlock = +1
      colisionNr++
    }
    if(xSmall + widthS > xBig){
      speedSmallBlock = speedSmallBlock - directionBigBlock * speedBigBlock * massB / massS
      speedBigBlock = speedBigBlock + directionSmallBlock * speedSmallBlock * massS / massB
      xSmall = xBig - widthS
      directionSmallBlock = -1
      colisionNr++   
    } 
    if(xSmall < 0){
      speedSmallBlock = speedSmallBlock
      xSmall = 0
      directionSmallBlock = +1
      colisionNr++ 
    }      
  } , speedSmallBlock)
    
  var colisionCount = setInterval(() => {
    colision.innerText = colisionNr  
  }, 0.1);
})

// momentul de inertie = masa * lungimea la patrat



