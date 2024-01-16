const questions = [
    {
        question : "Which is the tallest tower in the world?",
        answer:[
            { text : "Milad Tower" , correct : false  },
            { text : "Pizza Tower" , correct : false  },
            { text : "Eiffel Tower" , correct : false  },
            { text : "Khalifa Tower" , correct : true  }
        ]
    },
    {
        question : "Which is the smallest continent in the world?",
        answer:[
            { text : "Asia" , correct : false  },
            { text : "Australia" , correct : true  },
            { text : "Africa" , correct : false  },
            { text : "North America" , correct : false  }
        ]
    },
    {
        question : "Which is the laegest deseret in the world?",
        answer:[
            { text : "Kalahari" , correct : false  },
            { text : "Gobi" , correct : false  },
            { text : "Sahara" , correct : false  },
            { text : "Antarctica" , correct : true  }
        ]
    },
    {
        question : "Which is the smallest country in the world?",
        answer:[
            { text : "Vatican City" , correct : true  },
            { text : "Bhutan" , correct : false  },
            { text : "Nepal" , correct : false  },
            { text : "Sri Lanka" , correct : false  }
        ]
    },
]

const questionElement = document.querySelector("#question")
const answerButtons = document.querySelector("#answer-buttons")
const nextButton = document.querySelector("#next-btn")



let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question

    currentQuestion.answer.forEach( item => {
        const button = document.createElement("button")
        button.innerHTML = item.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(item.correct){
            button.dataset.correct = item.correct
         }
        button.addEventListener("click" , selectAnswer)
    })
}


function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild ){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}



function selectAnswer(e){
    const selectBtn  = e.target
    const isCorrect = selectBtn.dataset.correct === "true"

    if (isCorrect) {
        selectBtn.classList.add("correct")
        score++;
    }else{
        selectBtn.classList.add("incorrect")

    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener("click" , () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()