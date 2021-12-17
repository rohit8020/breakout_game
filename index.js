const grid=document.querySelector('.grid')

const boardWidth=640
const boardHeight=300
const ballDiameter=20
const blockWidth=100
const blockHeight=20

const userStart=[285,5]
let currentPosition=userStart

const ballStart=[325,40]
let ballCurrentPosition=ballStart

let timerId
let xDirection=2
let yDirection=2

//create block 
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft=[xAxis, yAxis]
        this.bottomRight=[xAxis+blockWidth, yAxis]
        this.topLeft=[xAxis, yAxis+blockHeight];
        this.topRight=[xAxis+blockWidth, yAxis+blockHeight]
    }
}

//all blocks
const blocks=[
    new Block(5,5),new Block(110,5),new Block(215,5),new Block(320,5),new Block(425,5),new Block(530,5),
    new Block(5,30),new Block(110,30),new Block(215,30),new Block(320,30),new Block(425,30),new Block(530,30),
    new Block(5,55),new Block(110,55),new Block(215,55),new Block(320,55),new Block(425,55),new Block(530,55)
    // ,new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270),new Block(10,270)
]

// console.log(blocks)

//draw the block
const drawBlocks=()=>{
    
    for(let i=0;i<blocks.length;i++){
        const block=document.createElement('div')
        block.classList.add('block')
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.top=blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block)
    }
}

drawBlocks()

//user Block
const userBlock=document.createElement('div')
userBlock.classList.add('userBlock')
userBlock.style.left=currentPosition[0]+'px'
userBlock.style.bottom=currentPosition[1]+'px'
grid.appendChild(userBlock)

//draw current user block
const drawUserBlock=()=>{
    userBlock.style.left=currentPosition[0]+'px'
    userBlock.style.bottom=currentPosition[1]+'px'
}

const drawBall=()=>{
    ball.style.left=ballCurrentPosition[0]+'px'
    ball.style.bottom=ballCurrentPosition[1]+'px'
}


//move user block
const moveUserBlock=(event)=>{
    switch (event.code) {
        case 'ArrowLeft':
            if(currentPosition[0]>5){
                currentPosition[0]-=10
                drawUserBlock()
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0]<530){
                currentPosition[0]+=10
                drawUserBlock()
            }
            break;
        default:
            break;
    }
}

const moveBall=()=>{
    ballCurrentPosition[0]+=xDirection
    ballCurrentPosition[1]+=yDirection
    drawBall()
    checkForCollisions()
}

timerId=setInterval(moveBall,15)

//change direction of the ball
const changeDirection=()=>{
    if(xDirection===2&&yDirection===2){
        yDirection=-2
        return
    }
    if(xDirection===2 && yDirection ===-2){
        xDirection=-2
        return
    }
    if(xDirection===-2&&yDirection===-2){
        yDirection=2
        return
    }
    if(xDirection===-2 && yDirection===2){
        xDirection=2
        return
    }
}

document.addEventListener('keydown',(event)=>{
    console.log(event)
    moveUserBlock(event)
})

//check the collision logic
const checkForCollisions=()=>{
    if((ballCurrentPosition[0]>=(boardWidth-ballDiameter))||(ballCurrentPosition[1]>=(boardHeight-ballDiameter))||
    (ballCurrentPosition[1]<=0)){
        changeDirection()
    }

    //checkfor game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUserBlock)
    }
}

//create a ball
const ball=document.createElement('div')
ball.classList.add('ball')
ball.style.left=ballCurrentPosition[0]+'px'
ball.style.bottom=ballCurrentPosition[1]+'px'
grid.appendChild(ball)