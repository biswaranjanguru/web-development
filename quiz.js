//getting all required elements
const start_btn = document.querySelector(".start button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".quiz_box .timer .timer_sec");
const timeLine = quiz_box.querySelector(".quiz_box .time_line");
const timeOff = quiz_box.querySelector(".quiz_box .timer_text");

const option_list = document.querySelector(".option_list");

//If Start Quiz Button is clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

//If Exit Button is clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

//If Continue Button is clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0)
    queCounter(1);
    startTimer(30);
}

let que_count = 0;
let que_num = 1;
let counter;
let time;
let timeValue = 30;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

restart_quiz.onclick = ()=>{
    window.location.reload();
}

quit_quiz.onclick = ()=>{
    window.open("thankyou.html","_self");
}

// If Next Button is clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        // clearInterval(counterLine);
        // startTimerLine(widthValue);
        next_btn.style.display = "none";
    }
    else{
        console.log("Questions Completed.");
        showResultBox();
    }
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].num +'. ' + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                     + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                     + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                     + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


let tickIcon = '<div class="icon tick"><i class="fa-regular fa-circle-check fa-lg" style="color: rgb(29, 226, 29);"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-regular fa-circle-xmark fa-lg" style="color: red;"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    // clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct!!!");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is Wrong!");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "0";
            timeOff.textContent = "Timer Off"

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

// function startTimerLine(time){
//     counterLine = setInterval(timer, 30);
//     function timer(){
//         time += 1;
//         timeLine.style.width = time + "px";
//         if(time > 549){
//             clearInterval(counterLine);
//         }
//     }
// }

function queCounter(){
    const bottom_question_counter = quiz_box.querySelector('.total_que');
    let totalQuesCountTag = '<span><p>'+ (que_count+1) +'</p>Of<p>' + questions.length +'</p>Questions</span>';
    bottom_question_counter.innerHTML = totalQuesCountTag;
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector('.score_text');
    if(userScore > 2){
        let scoreTag = '<span>Good Job! You got <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p>.</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Sorry! You got <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p>.</span>';
        scoreText.innerHTML = scoreTag;
    }
}