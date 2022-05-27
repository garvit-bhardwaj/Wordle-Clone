const keys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','<<',]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

const tiledisplay = document.querySelector('.tile-container');
const messagedisplay = document.querySelector('.message-container');
const keyboard = document.querySelector('.key-container');

let wordle  = "AWARD";
let curRow=0,curTile=0;
let isGameOver = 0;

guessRows.forEach((row,index) =>{
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id','row'+ index );
    row.forEach((tile,ind) =>{
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id','row'+ index + 'tile'+ind);
        tileElement.classList.add('tile');
        rowElement.appendChild(tileElement);
    })
    tiledisplay.appendChild(rowElement);
})


keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id',key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.appendChild(buttonElement);
})

const handleClick = (key) => {
    //console.log('clicked ' + key)
    if(key == 'ENTER')
    {
        //console.log('check');
        checkWord();
    }
    else if(key == '<<')
    {
        deleteletter();
    }
    else if(curTile<5) addletter(key);
}

const checkWord = () => {
    const guess = guessRows[curRow].join('');
    console.log(guess,wordle);
    if(curTile>4)
    {
        fliptile();
        if(guess == wordle)
        {
            showmessage('Great');
        }
        else if(curRow>=5)
        {
            isGameOver=1;
            showmessage('Game Over');
        }
        else if(curRow<5)
        {
            curRow++;
            curTile=0;
        }
    }
} 

const showmessage = (message) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messagedisplay.appendChild(messageElement);
        isGameOver=1;
        setTimeout(()=>messagedisplay.removeChild(messageElement),2000);
}

const addletter = key => {
    const tile = document.getElementById('row'+curRow + 'tile' + curTile);
    tile.textContent=key;
    tile.setAttribute('data',key);
    guessRows[curRow][curTile]=key;
    curTile++;
}

const deleteletter = () => {
    if(curTile>0)
    {
        //console.log("hey");
        curTile--;
        const tile = document.getElementById('row'+curRow + 'tile' + curTile);
        tile.textContent = '';
        guessRows[curRow][curTile]='';
        tile.setAttribute('');
        //console.log(guessRows);
    }
}


const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
}

const fliptile = () => {
    const rowTiles = document.querySelector('#row' + curRow).childNodes;
    let checkWordle = wordle;
    const guess = [];
    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'});
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)&&guess.color!='green-overlay') {
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    })
    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip');
            tile.classList.add(guess[index].color);
            console.log(guess[index]);
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index);
    })
}