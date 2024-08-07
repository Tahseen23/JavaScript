const API_KEY="7848a21958e3409ea438f99863413f44"
const url="https://newsapi.org/v2/everything?q="

window.addEventListener("load",()=>fetchNews("India"))

async function fetchNews(query) {
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data= await res.json()
    // console.log(data)
    bindData(data.articles)
    
}

function bindData(articles){
    const cardsContainer=document.getElementById("cards-container")
    const newsCardTemplate=document.getElementById("template-news-card")
    cardsContainer.innerHTML="";
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true)
        fillData(cardClone,article)
        cardsContainer.appendChild(cardClone)
        
    });
}


function fillData(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img")
    const newsTitle=cardClone.querySelector("#news-title")
    const newsSource=cardClone.querySelector("#news-source")
    const newsDesc=cardClone.querySelector("#news-desc")

    newsImg.src=article.urlToImage
    newsTitle.innerHTML=article.description
    newsDesc.innerHTML=article.description

    const date=new Date(article.publishedAt).toLocaleDateString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    newsSource.innerHTML=`${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
}

let currentSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem=document.getElementById(id)
    currentSelectedNav?.classList.remove("active")
    currentSelectedNav=navItem
    currentSelectedNav.classList.add("active")

}

const button=document.getElementById("search-button")
const searchText=document.getElementById("search-text")

function displayValue(value){
    const query=value;
    if(!query) return;
    fetchNews(query)
    currentSelectedNav?.classList.remove("active")
    currentSelectedNav=null

}

searchText.addEventListener('keypress',(event)=>{
    if(event.key=="Enter"){
        displayValue(searchText.value)
    }
})

button.addEventListener('click',()=>{
    displayValue(searchText.value)
})


