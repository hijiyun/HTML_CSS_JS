window.onload = () => {

    // panel-faq-container
    const panelFaqContainer = document.querySelectorAll('.panel-faq-container');
    console.log(panelFaqContainer); //NodeList객체 

    // panel-faq-answer , FAQ 본문 선택
    let panelFaqAnswer = document.querySelectorAll('.panel-faq-answer');
    //console.log(panelFaqAnswer[i]);
    console.log(panelFaqAnswer);

    //btn-all-close
    const btnAllClose = document.getElementsByClassName('btn-all-close');
    console.log(btnAllClose);

    //반복문 순회하면서 해당 FAQ제콕 클릭시 콜백 처리
    for (let i = 0; i < panelFaqContainer.length; i++) {
        panelFaqContainer[i].addEventListener('click', function() {
            //클릭시 처리 할 일
            console.log('나 클릭 ...' + i);

            //FAQ제목 클릭 시 --> 본문 보이게끔 --> active클래스 추가
            //this.classList.add('active');
            panelFaqAnswer[i].classList.add('active');
        });
    }

    btnAllClose[0].addEventListener('click', function() {
        console.log('모두 닫기버튼 클릭..');

        //버튼 클릭 시 처리할 일
        for (let i = 0; i < btnAllClose.length; i++) {
            panelFaqAnswer[i].classList.remove('active');
        }
    });
}