let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click",addTask)

//네모박스 안에 있는 value값과 끝났는지 안끝났는지 확인
function addTask(){
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value, 
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)
    render();
}

//할일 추가된 task내용들
function render(){
    let resultHTML = '';
    for(let i = 0; i<taskList.length; i++){
        resultHTML += `<div class="task">
                            <div>${taskList[i].taskContent}</div>
                            <div>
                                <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')">✅</button>
                                <button class="delete-btn">❌</button>
                            </div>
                        </div>`
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

//Complete가 false 에서 True로 바꾸기
function toggleComplete(id){
    console.log("id: ",id)
}

//random한 id 만들기 함수
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
