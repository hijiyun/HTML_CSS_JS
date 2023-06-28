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

//할일 추가된 task내용들을 ui로 보여주기 
function render(){
    let resultHTML = '';
    for(i = 0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
                                <div class="constent task-done">${taskList[i].taskContent}</div>
                                <div class="button-box">
                                    <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left" style="color: #28529a;"></i></button>
                                    <button class="delete-btn" onclick="deleteTask()"><i class="fa-solid fa-trash" style="color: #e12d2d;"></i></button>
                                </div>
                        </div>`
        }else{
                resultHTML += `<div class="task">
                                    <div class="content">${taskList[i].taskContent}</div>
                                    <div class="button-box">
                                        <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check" style="color: #247a26;"></i></button>
                                        <button class="delete-btn" onclick="deleteTask()"><i class="fa-solid fa-trash" style="color: #e12d2d;"></i></button>
                                    </div>
                                </div>`
            }
        }
    document.getElementById("task-board").innerHTML = resultHTML;
}

//Complete가 false 에서 True로 바꾸기
function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            //!라는 뜻은 not이라는 뜻임 
            //따라서 false일 때는 true값이 되고 true일 때는 false가 된다.(스위치 같은 느낌)
            break;
        }
    }
    render()
    console.log(taskList)
}

//random한 id 만들기 함수
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(){
    console.log("삭제")
}
