const NUMBER_OG_WORDS =6;
const NUMBER_OG_CHARS =5;
let words = document.getElementById("container");

for(let i = 0;i <NUMBER_OG_WORDS;i++)
{
    let singleWord = document.createElement("div");
    singleWord.className = "word";
    for(let j = 0;j < NUMBER_OG_CHARS;j++)
    {
        let singleChar = document.createElement("div");
        singleChar.className = "char";
        singleWord.appendChild(singleChar);
    }
    words.appendChild(singleWord);
    
}
let currentword = 0;
let currentchar = 0;

document.addEventListener("keydown", async function (event)
{
    if(event.key ==="Backspace")
    {
        if(currentchar > 0)
        {
        let wordDIV = words.children[currentword];
        let charToDelete = wordDIV.children[currentchar - 1];
        animateCSS(charToDelete, "rubberBand");
        charToDelete.innerHTML = "";
        currentchar--;
        }
    }
    if(event.key ==="left")
    {
        if(currentchar > 0)
        {
            for(currentchar = i; i < 7;)
            {
        let wordDIV = words.children[currentword];
        let charToDelete = wordDIV.children[currentchar = -1];
        animateCSS(charToDelete, "rubberBand");
        charToDelete.innerHTML = "";
        currentchar--;
          }
        }
    }
    else if(event.key === "Enter" )
    {
        if(currentchar === 5)
        {
            let wordDIV = words.children[currentword];
            animateCSS(wordDIV,"shakeX")
            const word = getWord();
            console.log("We are here");
            const results = await(await fetch("/wordle/"+word)).json();
            for(let i = 0; i <results.length; i++)
            {
                wordDIV.children[i].style.backgroundColor = results[i];
            }
            currentword++;
            currentchar=0;
        }
   
   }  
   else if( currentchar <5 && isLetter(event.key))
    {
    let wordDIV = words.children[currentword];
    let charDIV = wordDIV.children[currentchar];
    charDIV.innerHTML = event.key.toUpperCase();
     currentchar++;
    }
    if(event.key ==="Shift")
    {
        if(currentchar === 5)
        {
            let wordDIV = words.children[currentword];
            let charToDelete = wordDIV.children[currentchar - 1];
            
           
        }

       else {
        let wordDIV = words.children[currentword];
        let charToDelete = wordDIV.children[currentchar - 1];
        charToDelete.innerHTML = "";
        currentchar--;
       }
        
    }
});



function isLetter(str)
{
    return str.length === 1 && str.match(/[a-z]/i);
}

function getWord() {
    let word = "";
    let myGuess = words.children[currentword];
    for (let i = 0; i < myGuess.children.length; i++) {
      word = word + myGuess.children[i].innerHTML;
    }
    return word;
  }

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
