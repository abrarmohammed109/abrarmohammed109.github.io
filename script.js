/* PSUEDO CODE: 

1. Create classes: 
    -Player 1
    -Palyer 2
    -Each will have their own score variable and array of quesitons allocated 
    -Each will have a method of increasing and decreasing score 


2. Have a begin game functino that will do the following: 
    -fetch API data 
    -display the question and answers [do i want to go back and forth or do my set first and after i finish let it be opponent's turn?]
    -go to the opponent function (either when i finihsh my set of questions OR per question)

3. DOM Manipulation
    -after a question, -> removechild to replace with next question ?

4. For now, 2 questions per player (2 functions per player)
    -1 function to include the score, question, and answers to DOM
    -1 function to check if the answer is correct 

5. 1 function to declare winner 
    inside this function > reset game to play again 

6. can later scale the number of questions to include (BUT will be a lot of lines of code)

7. Have opponent display beneath player 1s instead of replacing it

8. function to go to next round (would be a copy/paste of previous code > 3 rounds max)
*/






const API_ENDPOINT = 'https://opentdb.com/api.php?amount=10&type=multiple'
const body = document.getElementById('body')
const mainGame = document.getElementById('main-game')
const button = document.getElementById('button')
let roundCounter = 0


class Me {
    constructor(name){
        this.name = name 
        this.score = 0
        this.Q_A = {
            questions: [],
            answers: []
        }
    }

    increaseScore(){
        return this.score+=50 
    }

    decreaseScore(){
        return this.score-=50
    }

}

class Opponent {
    constructor(name){
        this.name = name
        this.score = 0
        this.Q_A = {
            questions: [],
            answers: []
        }
    }

    increaseScore(){
        return this.score+=50 
    }

    decreaseScore(){
        return this.score-=50
    }
}

const me = new Me ('Player 1') 
const opponent = new Opponent ('Player 2')



const beginGame = async () => {
    roundCounter++
    console.log(`Round: ${roundCounter}`)
    // window.location.href = 'index2.html'

    try{
        const response = await fetch(API_ENDPOINT)
        const data = await response.json()
        console.log(data)

        playerQuestionOne(data)
       
    } catch (err){
        console.error(err)
    }
}

const playerQuestionOne = (data) => {

    for(i=0;i<data.results.length;i++){             //storing questions for my class via for loop, since I grabbed 10 questions from API
        me.Q_A.questions.push(data.results[i].question)           //^^ ALTERNATIVE: created an object so i can store BOTH questions and answers in the same location and access them from one point >>> this one is pushing all the qustions form the API to the object
        me.Q_A.answers.push(data.results[i].incorrect_answers,data.results[i].correct_answer)             // ^^This is storing all the answers per respective question to the same object the question is located
    }
    // console.log(me.Q_A.questions)
    console.log(me.Q_A.answers)

    me.Q_A.answers[0].push(me.Q_A.answers[1])
    console.log(me.Q_A.answers[0])

    // const iterator = me.Q_A.answers[0].values()          //individually extracts the values and displays them to the console
    // for (const value of iterator ){
    //     console.log(value)
    // }

    const gameHTML = `<h1 id='score'> ${me.name}'s turn. SCORE: ${me.score}</h1>
     <h2 id='question'>${me.Q_A.questions[0]}</h2>
     <div id='section1'>
     <input id='option1' type="radio" name="choice" value="">
     <label id="choice1" for="choice1">${me.Q_A.answers[0][0]}</label><br>
     </div>
     <div id='section2'>
     <input id='option2' class ='next-question' type="radio" name="choice" value="">
     <label id="choice2" for="choice1">${me.Q_A.answers[0][1]}</label><br>
     </div>
     <div id='section3'>
     <input id='option3' class ='next-question' type="radio" name="choice" value="">
     <label id="choice3" for="choice1">${me.Q_A.answers[0][2]}</label><br>
     </div>
     <div id='section4'>
     <input id='option4' class ='next-question' type="radio" name="choice" value="">
     <label id="choice4" for="choice1">${me.Q_A.answers[0][3]}</label><br>
     </div>
     <button id='submit' type='button'> LESGOOOO </button>
    `

    mainGame.innerHTML = gameHTML

    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click', checkAnswer)
  
   

}

const checkAnswer = () => {
    if(document.getElementById('option1').checked){
       
        document.getElementById('section1').style.border = '3px solid red'
        me.decreaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)

        // playerQuestionTwo()

        setTimeout(()=> {
            playerQuestionTwo();
         }, 1000);

    } else if (document.getElementById('option2').checked){

        document.getElementById('section2').style.border = '3px solid red'
        me.decreaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)

        // playerQuestionTwo()

        setTimeout(()=> {
            playerQuestionTwo();
         }, 1000);

    } else if (document.getElementById('option3').checked){

        document.getElementById('section3').style.border = '3px solid red'
        me.decreaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)

        // playerQuestionTwo()

        setTimeout(()=> {
            playerQuestionTwo();
         }, 1000);

    } else if (document.getElementById('option4').checked){
        
        document.getElementById('section4').style.border = '3px solid green'
        me.increaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)
        console.log(me.score)

        // playerQuestionTwo()

        setTimeout(()=> {
            playerQuestionTwo();
         }, 1000);
    }
}

/* ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆ END OF QUESTION ONE FOR PLAYER 1⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆/

/* ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ QUESTION 2 FOR PLAYER 1 ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇*/

const playerQuestionTwo = () => {
    console.log(me.score)

    
    // const question2 = document.getElementById('question2')
    // const updateQuestion = document.createElement('h2')
    // updateQuestion.innerHTML = me.Q_A.questions[1]
    // question2.appendChild(updateQuestion)

    const questionreplace = document.getElementById('question') //!replacing previous question with next question 
    const updateQuestion = document.createElement('h2')
    updateQuestion.setAttribute('id','question')
    updateQuestion.innerHTML = me.Q_A.questions[1]   //!replace the index here with the next number (max 9 or 19)
    questionreplace.parentNode.replaceChild(updateQuestion,questionreplace)

    

    const answerChoiceReplace1 = document.getElementById('choice1')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice1 = document.createElement('label')
    updatedAnswerChoice1.setAttribute('id','choice1')
    updatedAnswerChoice1.innerHTML = me.Q_A.answers[2][0]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace1.appendChild(updatedAnswerChoice1)
    answerChoiceReplace1.parentNode.replaceChild(updatedAnswerChoice1,answerChoiceReplace1)
    
    const answerChoiceReplace2 = document.getElementById('choice2')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice2 = document.createElement('label')
    updatedAnswerChoice2.setAttribute('id','choice2')
    updatedAnswerChoice2.innerHTML = me.Q_A.answers[2][1]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace2.parentNode.replaceChild(updatedAnswerChoice2,answerChoiceReplace2)

    const answerChoiceReplace3 = document.getElementById('choice3')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice3 = document.createElement('label')
    updatedAnswerChoice3.setAttribute('id','choice3')
    updatedAnswerChoice3.innerHTML = me.Q_A.answers[2][2]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace3.parentNode.replaceChild(updatedAnswerChoice3,answerChoiceReplace3)
    
    const answerChoiceReplace4 = document.getElementById('choice4')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice4 = document.createElement('label')
    updatedAnswerChoice4.setAttribute('id','choice4')
    updatedAnswerChoice4.innerHTML = me.Q_A.answers[3]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace4.parentNode.replaceChild(updatedAnswerChoice4,answerChoiceReplace4)
    
    
    
    const previousSubmit = document.getElementById('submit')
    const section = document.getElementById('main-game')
    previousSubmit.parentNode.removeChild(previousSubmit)
    const newButton = document.createElement('button')
    newButton.setAttribute('id','new-Submit')
    // newButton.setAttribute('onClick','checkAnswerTwo()')
    newButton.innerHTML = `SUBMIT`
    section.appendChild(newButton)

    document.getElementById('new-Submit').addEventListener('click',checkAnswerTwo)

   
    
    
    
    
    console.log(me.Q_A.answers[2])
   

}

const checkAnswerTwo = () => {

    if(document.getElementById('option1').checked){
       
        document.getElementById('section1').style.border = '3px solid red'
        me.decreaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)

        // opponentQuestionOne()

        setTimeout(()=> {
            opponentQuestionOne();
         }, 1000);

       

    } else if (document.getElementById('option2').checked){

        document.getElementById('section2').style.border = '3px solid red'
        me.decreaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)

        // opponentQuestionOne()

        setTimeout(()=> {
            opponentQuestionOne();
         }, 1000);

    } else if (document.getElementById('option3').checked){

        document.getElementById('section3').style.border = '3px solid red'
        me.decreaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)

        // opponentQuestionOne()
        setTimeout(()=> {
            opponentQuestionOne();
         }, 1000);

    } else if (document.getElementById('option4').checked){
        
        document.getElementById('section4').style.border = '3px solid green'
        me.increaseScore()

        const score = document.getElementById('score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','score')
        updateScore.innerHTML = `${me.name}'s turn. SCORE: ${me.score}`
        score.parentNode.replaceChild(updateScore,score)
        console.log(me.score)

        // opponentQuestionOne()
        setTimeout(()=> {
            opponentQuestionOne();
         }, 1000);
    }
    
}

/* ⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆ END OF QUESTION 2 FOR PLAYER 1⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆/

/* ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ QUESTION 1 FOR OPPONENT ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇*/

const opponentQuestionOne = () => {
    console.log('NEXT ROUND')

    const opponentSection = document.createElement('section')
    opponentSection.setAttribute('id','opponent-section')
    body.appendChild(opponentSection)


    const divHTML = `
    <h1 id='opponent-score'>${opponent.name}'s turn. SCORE: ${opponent.score}</h1>
    <h2 id='opponent-question'>${me.Q_A.questions[2]}</h2>
    <div id='opponent-choice1'>
    <input id='opponent-option1' type="radio" name="choice" value="">
    <label id="opponent-label1" for="opponent-label1">${me.Q_A.answers[4][0]}</label><br>
    </div>
    <div id='opponent-choice2'>
    <input id='opponent-option2' type="radio" name="choice" value="">
    <label id="opponent-label2" for="opponent-label2">${me.Q_A.answers[4][1]}</label><br>
    </div>
    <div id='opponent-choice3'>
    <input id='opponent-option3' type="radio" name="choice" value="">
    <label id="opponent-label3" for="opponent-label3">${me.Q_A.answers[4][2]}</label><br>
    </div>
    <div id='opponent-choice4'>
    <input id='opponent-option4' type="radio" name="choice" value="">
    <label id="opponent-label4" for="opponent-label4">${me.Q_A.answers[5]}</label><br>
    </div>
    <button id='opponent-submit'>OPPONENT SUBMIT</button>`

    opponentSection.innerHTML = divHTML

    const submitButton = document.getElementById('opponent-submit')
    submitButton.addEventListener('click', checkOpponentAnswerOne)

}

const checkOpponentAnswerOne = () => {
    

    if(document.getElementById('opponent-option1').checked){
       
        document.getElementById('opponent-choice1').style.border = '3px solid red'
        opponent.decreaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)



        setTimeout(()=> {
            opponentQuestionTwo();
         }, 1000);

    } else if (document.getElementById('opponent-option2').checked){

        document.getElementById('opponent-choice2').style.border = '3px solid red'
        opponent.decreaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)



        setTimeout(()=> {
            opponentQuestionTwo();
         }, 1000);

    } else if (document.getElementById('opponent-option3').checked){

        document.getElementById('opponent-choice3').style.border = '3px solid red'
        opponent.decreaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)


        setTimeout(()=> {
            opponentQuestionTwo();
         }, 1000);

    } else if (document.getElementById('opponent-option4').checked){
        
        document.getElementById('opponent-choice4').style.border = '3px solid green'
        opponent.increaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)


        setTimeout(()=> {
            opponentQuestionTwo();
         }, 1000);
    }


}

const opponentQuestionTwo = () => {

    console.log('CHECKED OPPONENT ANSWERS')

    //BELOW: UPDATE INDICES AND ID NAMES ACCORDING TO THAT OF THE OPPONENT'S 

    const questionreplace = document.getElementById('opponent-question') //!replacing previous question with next question 
    const updateQuestion = document.createElement('h2')
    updateQuestion.setAttribute('id','opponent-question')
    updateQuestion.innerHTML = me.Q_A.questions[3]   //!replace the index here with the next number (max 9 or 19)
    questionreplace.parentNode.replaceChild(updateQuestion,questionreplace)

    

    const answerChoiceReplace1 = document.getElementById('opponent-label1')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice1 = document.createElement('label')
    updatedAnswerChoice1.setAttribute('id','opponent-label1')
    updatedAnswerChoice1.innerHTML = me.Q_A.answers[6][0]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace1.appendChild(updatedAnswerChoice1)
    answerChoiceReplace1.parentNode.replaceChild(updatedAnswerChoice1,answerChoiceReplace1)
    
    const answerChoiceReplace2 = document.getElementById('opponent-label2')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice2 = document.createElement('label')
    updatedAnswerChoice2.setAttribute('id','opponent-label2')
    updatedAnswerChoice2.innerHTML = me.Q_A.answers[6][1]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace2.parentNode.replaceChild(updatedAnswerChoice2,answerChoiceReplace2)

    const answerChoiceReplace3 = document.getElementById('opponent-label3')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice3 = document.createElement('label')
    updatedAnswerChoice3.setAttribute('id','opponent-label3')
    updatedAnswerChoice3.innerHTML = me.Q_A.answers[6][2]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace3.parentNode.replaceChild(updatedAnswerChoice3,answerChoiceReplace3)
    
    const answerChoiceReplace4 = document.getElementById('opponent-label4')  //!replacing previous answers with next answers respective of the above replacing question
    const updatedAnswerChoice4 = document.createElement('label')
    updatedAnswerChoice4.setAttribute('id','opponent-label4')
    updatedAnswerChoice4.innerHTML = me.Q_A.answers[7]  //!replace second index with next number; on the 4th choice replace first index with next number and no second index
    answerChoiceReplace4.parentNode.replaceChild(updatedAnswerChoice4,answerChoiceReplace4)
    
    //! is below code necessary or can i keep submit button? :
    const previousSubmit = document.getElementById('opponent-submit')
    const section = document.getElementById('opponent-section')
    previousSubmit.parentNode.removeChild(previousSubmit)
    const newButton = document.createElement('button')
    newButton.setAttribute('id','opponent-submit')
    // newButton.setAttribute('onClick','checkAnswerTwo()')
    newButton.innerHTML = `OPPONENT LAST QUESTION`
    section.appendChild(newButton)

    document.getElementById('opponent-submit').addEventListener('click',checkOpponentAnswerTwo)

}


const checkOpponentAnswerTwo = () => {

    console.log('validating the opponents answer choice...')

    if(document.getElementById('opponent-option1').checked){
       
        document.getElementById('opponent-choice1').style.border = '3px solid red'
        opponent.decreaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)



        setTimeout(()=> {
            finalResults();
         }, 1000);

    } else if (document.getElementById('opponent-option2').checked){

        document.getElementById('opponent-choice2').style.border = '3px solid red'
        opponent.decreaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)



        setTimeout(()=> {
            finalResults();
         }, 1000);

    } else if (document.getElementById('opponent-option3').checked){

        document.getElementById('opponent-choice3').style.border = '3px solid red'
        opponent.decreaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)


        setTimeout(()=> {
            finalResults();
         }, 1000);

    } else if (document.getElementById('opponent-option4').checked){
        
        document.getElementById('opponent-choice4').style.border = '3px solid green'
        opponent.increaseScore()

        const score = document.getElementById('opponent-score')
        const updateScore = document.createElement('h1')
        updateScore.setAttribute('id','opponent-score')
        updateScore.innerHTML = `${opponent.name}'s turn. SCORE: ${opponent.score}`
        score.parentNode.replaceChild(updateScore,score)


        setTimeout(()=> {
            finalResults();
         }, 1000);
    }


} 

const finalResults = () => {

    console.log(`${me.name}'s score is: ${me.score}
    ${opponent.name}'s score is: ${opponent.score}`)

    const finalResults = document.createElement('section')
    finalResults.setAttribute('id','final-results')
    body.appendChild(finalResults)

    if (me.score > opponent.score) {
    const finalHTML = `
    <h1>${me.name} had ${me.score} points. ${opponent.name} had ${opponent.score} points. ${me.name} wins!</h1>
    <button id='round2'>NEXT ROUND</button>
    <button id='play-again'>PLAY AGAIN</button>`

    finalResults.innerHTML = finalHTML
} else if (opponent.score > me.score) {
    const finalHTML = `
    <h1>${me.name} had ${me.score} points. ${opponent.name} had ${opponent.score} points. ${opponent.name} wins!</h1>
    <button id='round2'>NEXT ROUND</button>
    <button id='play-again'>PLAY AGAIN</button>`

    finalResults.innerHTML = finalHTML
} else if (opponent.score === me.score) {
    const finalHTML = `
    <h1>${me.name} had ${me.score} points. ${opponent.name} had ${opponent.score} points. It's a tie!</h1>
    <button id='round2'>NEXT ROUND</button>
    <button id='play-again'>PLAY AGAIN</button>`

    finalResults.innerHTML = finalHTML
} 

    const round2Button = document.getElementById('round2')
    round2Button.addEventListener('click', round2)

    const playAgain = document.getElementById('play-again')
    playAgain.addEventListener('click',replay)

    
}

const round2 = () => {
    // console.log('round 2... fight!')

    // const gameClear = document.getElementById('main-game')
    // gameClear.parentNode.removeChild(gameClear)

    if(roundCounter === 3 ){

        if(me.score > opponent.score) {
        const displayVictor = document.createElement('section')
        displayVictor.setAttribute('id','victor')
        body.appendChild(displayVictor)

        const finalHTML = `
        <h1>ALL 3 ROUNDS HAVE BEEN PLAYED. ${me.name} had ${me.score} points. ${opponent.name} had ${opponent.score} points. ${me.name} wins!</h1>
        <button id='play-again'>PLAY AGAIN</button>`

        displayVictor.innerHTML = finalHTML

        const playAgain = document.getElementById('play-again')
        playAgain.addEventListener('click',replay)
        } else if(opponent.score > me.score) {

                const displayVictor = document.createElement('section')
                displayVictor.setAttribute('id','victor')
                body.appendChild(displayVictor)
        
                const finalHTML = `
                <h1>ALL 3 ROUNDS HAVE BEEN PLAYED. ${me.name} had ${me.score} points. ${opponent.name} had ${opponent.score} points. ${opponent.name} wins!</h1>
                <button id='play-again'>PLAY AGAIN</button>`
        
                displayVictor.innerHTML = finalHTML

                const playAgain = document.getElementById('play-again')
                playAgain.addEventListener('click',replay)
        } else if (me.score === opponent.score) {
            
                const displayVictor = document.createElement('section')
                displayVictor.setAttribute('id','victor')
                body.appendChild(displayVictor)
        
                const finalHTML = `
                <h1>ALL 3 ROUNDS HAVE BEEN PLAYED. ${me.name} had ${me.score} points. ${opponent.name} had ${opponent.score} points. IT IS A TIE!</h1>
                <button id='play-again'>PLAY AGAIN</button>`
        
                displayVictor.innerHTML = finalHTML

                const playAgain = document.getElementById('play-again')
                playAgain.addEventListener('click',replay)
        }  

        

    }
    
    const opponentClear = document.getElementById('opponent-section')
    opponentClear.parentNode.removeChild(opponentClear)

    const resultClear = document.getElementById('final-results')
    resultClear.parentNode.removeChild(resultClear)

    beginGame()
}

const replay = () => {
    // console.log('reaplying the game again')

    // me.score = 0
    // opponent.score = 0
    
    // const opponentClear = document.getElementById('opponent-section')
    // opponentClear.parentNode.removeChild(opponentClear)

    // const resultClear = document.getElementById('final-results')
    // resultClear.parentNode.removeChild(resultClear)

    // beginGame()

    window.location.reload()



}







button.addEventListener('click',beginGame)
// const buttonSubmit = document.getElementById('submit')
// buttonSubmit.addEventListener('click',checkAnswer)
