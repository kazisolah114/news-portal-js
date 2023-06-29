const loadTitles = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayTitles(data));
}
const displayTitles = datas => {
    datas.data.news_category.forEach(singleItems => {
        const newsContainer = document.getElementById('news-container');
        const containerDiv = document.createElement('div');
        containerDiv.innerHTML = `
            <a href="#" class="text-decoration-none" onclick="showDetails('${singleItems.category_id}', '${singleItems.category_name}')">${singleItems.category_name}</a>
        `
        newsContainer.appendChild(containerDiv);
    })
    
}
const showDetails = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(category_id => showAlert(category_id, category_name));
}
const showAlert = (data, category_name) => {
    const newsCount = document.getElementById('news-count');
    const newsCategory = document.getElementById('news-category');
    newsCount.innerText = `${data.data.length}`;
    newsCategory.innerText = `${category_name}`;

    // Main Newses
    const mainNews = document.getElementById('main-news-sect');
    mainNews.innerHTML = '';
    data.data.forEach(newses => {
        const mainNewsContainer = document.createElement('div');
        mainNewsContainer.classList.add('card', 'mb-3')
        mainNewsContainer.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${newses.image_url}" class="img-fluid rounded-start" alt="...">
                    
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${newses.title}</h5>
                        <p class="card-text">${newses.details.slice(0, 300)}...</p>
                    </div>
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div><img src="${newses.author.img} class="img-fluid" width="40"></div>
                            <div>
                                <h6>${newses.author.name}</h6>
                                <p class="mb-0">${newses.author.published_date}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-eye"></i>
                            <span>${newses.total_view}</span>
                        </div>
                        <div><i class="fa-sharp fa-solid fa-arrow-right" onclick="loadModal('${newses._id}')" data-bs-toggle="modal" data-bs-target="#phoneModal"></i></div>
                    </div>
                </div>
            </div>
        `
        mainNews.appendChild(mainNewsContainer);
    })
}
const loadModal = news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showModal(data));
}
const showModal = details => {
    console.log(details.data[0]);
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
        <div class="row g-0">
                <div class="col-md-12">
                    <img src="${details.data[0].image_url}" class="img-fluid rounded-start" alt="...">
                    
                </div>
                <div class="col-md-12">
                    <div class="card-body">
                        <h5 class="card-title">${details.data[0].title}</h5>
                        <p class="card-text">${details.data[0].details.slice(0, 300)}...</p>
                    </div>
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div><img src="${details.data[0].author.img} class="img-fluid" width="40"></div>
                            <div>
                                <h6>${details.data[0].author.name}</h6>
                                <p class="mb-0">${details.data[0].author.published_date}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-eye"></i>
                            <span>${details.data[0].total_view}</span>
                        </div>
                    </div>
                </div>
            </div>
        `

}
loadTitles();