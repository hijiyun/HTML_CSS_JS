let news = []
let menus = document.querySelectorAll(".menus button")
console.log(menus)
menus.forEach((menu) => menu.addEventListener("click",(event)=>getNewByTopic(event)))


const getLatestNews = async() => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    let headers = new Headers({'x-api-key':'36REx7vvPskOrjv8186Bt5_HlYAu8Eq5C3IFycIIN58'})

    let response = await fetch(url, {headers:headers})
    let data = await response.json() //json이 그냥 객체마냥 페이지에서 아까 reponse를 콘솔로 찍었을 때 보이는 그 객체들의 값들을 뜻함.
    console.log("response: ",response)
    console.log("data: ",data)

    news = data.articles
    console.log(news)

    render();
};

const getNewByTopic =async(event)=>{
    console.log("클릭", event.target.textContent)

    let topic = event.target.textContent.toLowerCase()
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
    let headers = new Headers({'x-api-key':'36REx7vvPskOrjv8186Bt5_HlYAu8Eq5C3IFycIIN58'})
    let response = await fetch(url, {headers:headers})
    let data = await response.json()
    news = data.articles
    
    render();
}

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
}

getLatestNews()