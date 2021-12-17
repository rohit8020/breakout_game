const grid=document.querySelector('.grid')

const blockWidth=100
const blockHeight=20

const userStart=[285,5]
let currentPosition=userStart

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

document.addEventListener('keydown',(event)=>{
    console.log(event)
    moveUserBlock(event)
})


//create a ball
const ball=document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)