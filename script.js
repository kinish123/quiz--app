const questions=[
    {
        question:"which is the largest animal in world?",
        answers:[
            {text:"shark",correct:false},
            {text:"blue whale",correct:true},
            {text:"elephant",correct:false},
            {text:"giraffe",correct:false},

        ]
    },
    {
        question:"which is the smallest country in the world?",
        answers:[
            {text:"vatican city",correct:true},
            {text:"bhutan",correct:false},
            {text:"nepal",correct:false},
            {text:"sri lanka",correct:false},
        ] 
    },
    {
        question:"which is the largest desert in world?",
        answers:[
            {text:"kalahari",correct:false},
            {text:"gobi",correct:false},
            {text:"sahara",correct:false},
            {text:"antarctica",correct:true},
        ] 
    },
    {
        question:"which is the smallest continent in the world?",
        answers:[
            {text:"asia",correct:false},
            {text:"australia",correct:true},
            {text:"arctic",correct:false},
            {text:"africa",correct:false},
        ] 
    }
];

const questionelement=document.getElementById("question");
const answerbuttons=document.getElementById("answer-button");
const nextbutton=document.getElementById("next-btn");

let currentquestionindex=0;
let score=0;

function startquiz(){
    currentquestionindex=0;
    score=0;
    nextbutton.innerHTML="Next";
    showquestion();
}

function showquestion(){
    resetstate();
    let currentquestion=questions[currentquestionindex];
    let questionno=currentquestionindex+1;
    questionelement.innerHTML=questionno + " . " + currentquestion.question;

    currentquestion.answers.forEach(answer =>{
        const button=document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetstate(){
    nextbutton.style.display="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectanswer(e){
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct==="true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;

    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextbutton.style.display="block";
}
function showscore(){
    resetstate();
    questionelement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML="Play again";
    nextbutton.style.display="block";
}

function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showquestion();
    }
    else{
        showscore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    }
    else{
        startquiz();
    }
})
startquiz();