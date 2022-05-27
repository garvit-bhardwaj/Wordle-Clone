const keys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','<<',]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

const messagedisplay = document.querySelector('.message-container');
const keyboard = document.querySelector('.key-container');
const tiledisplay = document.querySelector('.tile-container');

let wordle = 'AWARD';

let curRow=0;
let curTile=0;
let isGameOver=0;


keys.forEach(key => {
    const buttonElement=document.createElement('button');
    buttonElement.textContent=key;
    buttonElement.setAttribute('id',key);
    buttonElement.addEventListener('click',() => handleclick(key));
    keyboard.appendChild(buttonElement);
})


guessRows.forEach((row,index) =>{
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id','row'+index);
    row.forEach((tile,ind)=>{
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id','row'+index+'tile'+ind);
        tileElement.classList.add('tile');
        rowElement.appendChild(tileElement);
    })
    tiledisplay.appendChild(rowElement);
})


const handleclick = (key) => {
    if(!isGameOver){
        if(key=='ENTER')
        {
            checkword();
        }
        else if(key=='<<')
        {
            deleteletter();
        }
        else if(curTile<5)
        {
            addletter(key);
        }
    }
}

const addletter = (key) => {
    const tile = document.getElementById('row'+curRow+'tile'+curTile);
    tile.textContent=key;
    guessRows[curRow][curTile]=key;
    tile.setAttribute('data',key);
    curTile++;
}

const deleteletter = () => {
    if(curTile>0)
    {
        curTile--;
        const tile = document.getElementById('row'+curRow+'tile'+curTile);
        tile.textContent='';
        tile.setAttribute('data','');
        guessRows[curRow][curTile]='';
    }
}

const checkword = () => {
    if(curTile>4)
    {
        const guess = guessRows[curRow].join('');
        fliptile();
        if(guess==wordle)
        {
            isGameOver=1;
            showmessage('Great');
        }
        else
        {
            if(curRow>=5)
            {
                showmessage('Game Over');
                isGameOver=1;
            }
            else
            {
                curRow++;
                curTile=0;
            }
        }
    }
    else {
        showmessage('Too short');
    }
}

const fliptile = () => {
    let tiles = document.getElementById('row'+curRow).childNodes;
    let guess = [];
    let check = wordle;

    tiles.forEach(tile => {
        guess.push({data:tile.getAttribute('data'),color:'grey-overlay'});
    })
    
    guess.forEach((letter,index) => {
        if(letter.data==check[index])
        {
            letter.color='green-overlay';
            check=check.replace(letter.data,' ');
        }
    })

    guess.forEach(letter=> {
        if(check.includes(letter.data)&&letter.color!='green-overlay')
        {
            letter.color='yellow-overlay';
            check=check.replace(letter.data,' ');
        }
    })

    guess.forEach((letter,index) => {
        const tile = document.getElementById('row'+curRow+'tile'+index);
        setTimeout(()=>tile.classList.add(letter.color),500*index);
    })
}


const showmessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent=message;
    messagedisplay.appendChild(messageElement);
    setTimeout(()=>messagedisplay.removeChild(messageElement),2000);
}