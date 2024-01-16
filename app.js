const questions = [
    {
        question : "کدامیک بلند ترین برج دنیا است؟",
        answer:[
            { text : "برج میلاد" , correct : false  },
            { text : "برج پیزا" , correct : false  },
            { text : "برج ایفل" , correct : false  },
            { text : "برج خلیفه" , correct : true  }
        ]
    },
    {
        question : "کدامیک کوچکترین قاره دنیا است؟",
        answer:[
            { text : "آسیا" , correct : false  },
            { text : "استرالیا" , correct : true  },
            { text : "آفریقا" , correct : false  },
            { text : "اروپا" , correct : false  }
        ]
    },
    {
        question : "کدامیک بزرگترین ترین موجود دنیا است؟",
        answer:[
            { text : "فیل" , correct : false  },
            { text : "زرافه" , correct : false  },
            { text : "کوسه سفید" , correct : false  },
            { text : "وال" , correct : true  }
        ]
    },
    {
        question : "کدامیک کوچکتربن ترین کشور دنیا است؟",
        answer:[
            { text : "واتیکان" , correct : true  },
            { text : "بوهوتان" , correct : false  },
            { text : "نپال" , correct : false  },
            { text : "سریلانکا" , correct : false  }
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
    nextButton.innerHTML = "بعدی"
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
    questionElement.innerHTML = `امتیاز شما ${score} از ${questions.length} شده !`
    nextButton.innerHTML = "دوباره"
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