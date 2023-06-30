let news = []
let menus = document.querySelectorAll(".menus button")
console.log(menus)
menus.forEach((menu) => menu.addEventListener("click",(event)=>getNewByTopic(event)))

let searchButton = document.getElementById("search-button");
let url;

// 1. 각 함수에서 필요한 url을 만든다.
// 2. api호출 함수를 부른다.

const getNews = async() => {
    try{
        let headers = new Headers({'x-api-key':'36REx7vvPskOrjv8186Bt5_HlYAu8Eq5C3IFycIIN5'})
        let response = await fetch(url, {headers:headers})
        let data = await response.json()
        if(response.status == 200){
            news = data.articles
            render();
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        console.log("잡힌 에러는: ", error.message)
        errorRender(error.message)
    }
}

const getLatestNews = async() => {
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    getNews();
};

const getNewByTopic =async(event)=>{
    console.log("클릭", event.target.textContent)

    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`);
    getNews();
}

getNewByKeyword = async () => {
    let keyword = document.getElementById("search-input").value
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=10`)
    getNews();
}

searchButton.addEventListener("click",getNewByKeyword);

const render =() => {
    let newsHTML = "";
    newsHTML = news.map((item)=>{
        return `<div class="row news">
                    <div class="col-lg-4">
                        <img class="news-img-size" src="${item.media}" alt="뉴스 사진">
                    </div>
                    <div class="col-lg-8">
                        <h2>${item.title}</h2>
                        <p>${item.summary}</p>
                        <div>${item.rights} * ${item.published_date}</div>
                    </div>
                </div>`
    }).join('');

    document.getElementById("news-board").innerHTML=newsHTML;
};

const errorRender = (message) => {
    let errorHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
    </svg>

    <div class="alert alert-primary d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>        
        <div>
        ${message}
        </div>
    </div>
    `
    document.getElementById("news-board").innerHTML = errorHTML
}

getLatestNews()