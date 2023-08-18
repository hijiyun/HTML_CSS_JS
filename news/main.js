let news = []
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button")
console.log(menus)
menus.forEach((menu) => menu.addEventListener("click",(event)=>getNewByTopic(event)))

let searchButton = document.getElementById("search-button");
let url;

// 1. 각 함수에서 필요한 url을 만든다.
// 2. api호출 함수를 부른다.

const getNews = async() => {
    try{
        let headers = new Headers({
          "x-api-key": "bd8bf55b083f4c3484bcc4003fffff27"});
        url.searchParams.set('page',page) // &page=
        console.log(url)
        let response = await fetch(url, {headers:headers})
        let data = await response.json()
        if(response.status == 200){
            if(data.total_hits == 0){
                throw new Error("검색 된 결과값이 없습니다.")
            }
            news = data.articles
            total_pages = data.total_pages;
            page = data.page;
            render();
            pageNation();
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        console.log("잡힌 에러는: ", error.message)
        errorRender(error.message)
    }
}

const getLatestNews = async() => {
    page = 1; // 새로운거 search 할 때마다 1로 리셋
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`);
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
    <div class="alert alert-secondary text-center" role="alert" style="margin: 10px">
    <i class="fa-solid fa-triangle-exclamation fa-beat" style="color: #1c54b5;"></i>
        ${message}    
    </div>
    `
    document.getElementById("news-board").innerHTML = errorHTML
};

const pageNation = async() => {
    let pageNationHTML = "";
    // total_page o
    // page o 
    // page group
    let pageGroup = Math.ceil(page/5)
    //last
    let last = pageGroup * 5;
    if (last > total_pages){
    //마지막 그룹이 5개 이하면
        last = total_pages
    }
    let first = last - 4 <= 0 ? 1 : last - 4; // 첫그룹이 5이하이면 
    if(first >= 6){
        pageNationHTML=`<li class="page-item" >
                            <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(1)">
                                <span aria-hidden="true">&lt;&lt;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${page-1})">
                                <span aria-hidden="true">&lt;</span>
                            </a>
                        </li>`;
    }

    for (let i = first; i <= last; i++){
        pageNationHTML += `<li class="page-item ${page == i?"active":""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
    }

    if(last < total_pages){
        pageNationHTML+=`<li class="page-item">
                            <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${page+1})">
                                <span aria-hidden="true">&gt;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${total_pages})">
                                <span aria-hidden="true">&gt;&gt;</span>
                            </a>
                        </li>`;
    }

    document.querySelector(".pagination").innerHTML=pageNationHTML
};

const moveToPage=(pageNum)=>{
    page = pageNum
    getNews()
}

getLatestNews()