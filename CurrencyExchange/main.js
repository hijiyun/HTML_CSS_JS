// 1. 박스 만들기
// 2. 드랍다운 리스트 만들기
// 3. 환율 정보 들고오기
// 4. 드랍다운 리스트에서 아이템 선택 하면 아이템이 바뀜
// 5. 금액을 입력하면 환전이 된다
// 6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨
// 7. 숫자를 한국어로 읽는 법
// 8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다

let currencyRatio = {
    USD: {
        KRW: 1234.01,
        USD: 1,
        VND: 23467.5,
        unit: "달러",
    },
    KRW: {
        KRW: 1,
        USD: 0.00081,
        VND: 19.02,
        unit: "원",
    },
    VND: {
        VND: 1,
        KRW: 0.053,
        USD: 0.000043,
        unit: "동"
    },
};
// 1. console.log(currencyRatio.VND.unit);
// 2. console.log(currencyRatio["KRW"]["unit"]);

let fromcurrency = 'USD'
let tocurrency = "USD"


document.querySelectorAll("#from-currency-list a").forEach(menu => menu.addEventListener("click", function () {
  // 1. 버튼을 가져온다
  // document.getElementById("from-button")
  // 2. 버튼의 값을 바꾼다
    document.getElementById("from-button").textContent = this.textContent;
  // 3. 선택된 currency값을 변수에 저장해준다
    fromcurrency = this.textContent;
    // console.log("fromcurrency는", fromcurrency);
}));

document.querySelectorAll("#to-currency-list a").forEach(menu => menu.addEventListener("click", function () {
    document.getElementById("to-button").textContent = this.textContent;
    tocurrency = this.textContent;
    // console.log("tocurrency는", tocurrency);
}));


// 1. 키를 입력하는 순간
// 2. 환전이 되서
// 3. 환전된 값이 된다

function convert() {
    // console.log("key up event")
    // 1. 환전
    // 얼마를 환전? 가지고 있는 돈이 뭔지?
    // 돈 * 환율 = 환전금액
    let amount = document.getElementById("from-input").value;
    console.log("amount", amount);
    let convertedAmount = amount * currencyRatio[fromcurrency][tocurrency];
    console.log("환전결과", convertedAmount);
    document.getElementById("to-input").value = convertedAmount;
}