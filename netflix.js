let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let search_input = document.getElementById('search_input');

left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
});
right_btn.addEventListener('click', () => {
    cards.scrollLeft += 140;
});

let json_url = 'movie.json';

fetch(json_url)
    .then(response => response.json()) 
    .then((data) => {
        if (Array.isArray(data)) { 
            data.forEach((ele, i) => {
                let { name, imdb, date, sposter, bposter, genre, url } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                        </div>
                    </div>
                </div>`;
                cards.appendChild(card);
            });

            if (document.getElementById('title')) {
                document.getElementById('title').innerText = data[0].name;
            }
            if (document.getElementById('gen')) {
                document.getElementById('gen').innerText = data[0].genre;
            }
            if (document.getElementById('date')) {
                document.getElementById('date').innerText = data[0].date;
            }
            if (document.getElementById('rate')) {
                document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i> ${data[0].imdb}`;
            }

            data.forEach(element => {
                let { name, imdb, date, sposter, genre, url } = element;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = `
                <img src="${sposter}" alt="">
                <div class="cont">
                    <h3>${name}</h3>
                    <p>${genre}, ${date}, <span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</p>
                </div>`;
                search.appendChild(card);
            });
        }

        // Fixing the search functionality
        search_input.addEventListener('keyup', () => {
            let filter = search_input.value.toUpperCase(); // Correctly fetch the input value
            let a = search.getElementsByTagName('a');

            for (let index = 0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('cont')[0];
                let textvalue = b.textContent || b.innerText;
                if (textvalue.toUpperCase().indexOf(filter) > -1) { // Use indexOf (capital O)
                    a[index].style.display = "flex";
                    search.style.visibility = "visible";
                    search.style.opacity = 1;
                } else {
                    a[index].style.display = "none";
                }
            }
        });
        let video = document.getElementsByTagName('video')[0];
        let play= document.getElementById('play');
play.addEventListener('click',()=> {
    if (video.paused){
        video.play();
        play.innerHTML =`play <i class="bi bi-pause-fill"></i>`
    }else{
        play.innerHTML =`Watch <i class="bi bi-paly-fill"></i>`
        video.pause();
    }
})    
    let series = document.getElementById('series');
    series.addEventListener('click',()=>{
        cards.innerHTML=``;
        let series_a= data.filter(ele =>{
            return ele.type === "series";
        });
        series_a.forEach((ele, i) => {
            let { name, imdb, date, sposter, bposter, genre, url } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
            <img src="${sposter}" alt="${name}" class="poster">
            <div class="rest_card">
                <img src="${bposter}" alt="">
                <div class="cont">
                    <h4>${name}</h4>
                    <div class="sub">
                        <p>${genre}, ${date}</p>
                        <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                    </div>
                </div>
            </div>`;
            cards.appendChild(card);
        });


    })    
       
    })
    
