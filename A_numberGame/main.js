// 랜덤 번호 지정 o
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름 o
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤 번호가 < 유저번호 Down
// 랜덤 번호가 > 유저번호 Up
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다.


let computerNumber = 0
let playButton = document.getElementById("play-btn");
let userInput = document.getElementById("user-input");
let resultArea = document.querySelector(".result-text");
let resetButton = document.getElementById("reset-btn")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = []

playButton.addEventListener("click",play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function(){userInput.value=""})

function pickRandomNum() {
    computerNumber = Math.floor(Math.random() * 100) + 1;
    //Math.random() => 0~1 까지의 랜덤 수를 반환 ex) 0.234234
    //그래서 100을 곱해줌으로써 소수점 앞자리가 숫자로나오게 만듦
    //소수점 뒤에있는 수들을 날리는 함수 => Math.floor()
    //이 모든걸 해주면 computerNumber는 0~99까지의 랜덤수를 반환
    //때문에 +1을 해줌
    console.log("정답", computerNumber);
}

function play() {
    let userValue = userInput.value;

    //유효성 검사 해주기
    if(userValue<1 || userValue>100){
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요 !!"
        userInput.value = ""
        return
        // return이 없으면 밑에 코드가 실행이 됨
        // chances가 깎이고 숫자 비교하고 지네들끼리 막 그러겠지?
        // 내가 원한건 그게 아니기 때문에 "1과 100사이 숫자를 입력해 주세요 !!"멘트 날리고 userInput.value = "" 한 후에 바로 종료되길 원함
        //그래서 아주 강력한 return을 쓰는거임
    }

    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력된 숫자입니다 ! 다른 숫자를 입력해 주세요 ! "
        return
    }
    //유효성 검사 끝

    chances --;
    chanceArea.textContent = `남은 기회 : ${chances}번`
    console.log("chances:", chances)

    if (userValue < computerNumber) {
        resultArea.textContent = "UP!!!"
    } else if (userValue > computerNumber) {
        resultArea.textContent = "DOWN!!!"
    }else if(gameOver == false && userValue == computerNumber){
        resultArea.textContent = "맞췄습니다 ~!" 
        chanceArea.textContent = "리셋 버튼을 눌러주세요 ~!" 
        playButton.disabled = true
    }else if(userValue == computerNumber){
        chanceArea.textContent = "리셋 버튼을 눌러주세요 ~!"
        gameOver = true
    }


    history.push(userValue)
    console.log(history)

    if(chances < 1){
        gameOver = true
    }
    if (gameOver == true){
        playButton.disabled = true
        resultArea.textContent = "기회가 끝났어요..!"
    }else if(gameOver == true | userValue == computerNumber){
        resultArea.textContent = "맞췄습니다 ~!"
    }
}

function reset() {
    //user input 창이 깨끗하게 정리된
    userInput.value = ""
    //새로운 번호가 생성
    pickRandomNum()
    resultArea.textContent = "결과값"
    gameOver = false
    playButton.disabled = false
    chances = 5
    history = []
    chanceArea.innerHTML = `남은 기회 : ${chances}`
}

pickRandomNum()