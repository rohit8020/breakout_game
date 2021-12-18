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
    new Block(5,275),new Block(110,275),new Block(215,275),new Block(320,275),new Block(425,275),new Block(530,275),
    new Block(5,250),new Block(110,250),new Block(215,250),new Block(320,250),new Block(425,250),new Block(530,250),
    new Block(5,225),new Block(110,225),new Block(215,225),new Block(320,225),new Block(425,225),new Block(530,225)
]

// console.log(blocks)

//draw the block
const drawBlocks=()=>{
    
    for(let i=0;i<blocks.length;i++){
        const block=document.createElement('div')
        block.classList.add('block')
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
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

timerId=setInterval(moveBall,20)

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



//check the collision logic
const checkForCollisions=()=>{

    //check for block collision
    for(let i=0; i<blocks.length;i++){
        if(
            (ballCurrentPosition[0]>blocks[i].bottomLeft[0]) &&
            (ballCurrentPosition[0]<
            blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1]+ballDiameter)>
            blocks[i].bottomLeft[1]) &&
            (ballCurrentPosition[1]<blocks[i].topLeft[1])
        ){
            const allBlocks=Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()

            //check if the user wins
            if(blocks.length===0){
                const cnfrm=confirm("YOU WIN ! WANT TO PLAY AGAIN !")
                if(cnfrm){
                    location.reload()
                }
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUserBlock)
            }
        }
    }

    //check for the user block collisions
    if(
        ((ballCurrentPosition[0]>currentPosition[0]) && 
        (ballCurrentPosition[0]<currentPosition[0]+blockWidth)
        ) &&
        ((ballCurrentPosition[1]>currentPosition[1])&&
        (ballCurrentPosition[1]<
        currentPosition[1]+blockHeight)
        )
    ){
        changeDirection()
    }

    //check for wall collision
    if((ballCurrentPosition[0]>=(boardWidth-ballDiameter))||(ballCurrentPosition[1]>=(boardHeight-ballDiameter))||
    (ballCurrentPosition[0]<=0)){
        changeDirection()
    }

    //checkfor game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUserBlock)
        const cnfrm=confirm("YOU LOSE ! WANT TO PLAY AGAIN !")
        if(cnfrm){
            location.reload()
        }
    }
}

//create a ball
const ball=document.createElement('div')
ball.classList.add('ball')
ball.style.left=ballCurrentPosition[0]+'px'
ball.style.bottom=ballCurrentPosition[1]+'px'
grid.appendChild(ball)

document.addEventListener('keydown',(event)=>{
    moveUserBlock(event)
})