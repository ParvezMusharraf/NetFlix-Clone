//CONST
const apikey="14d45a9a548ec9a12754f4549ed7a341";
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths={
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id)=>`${apiEndpoint}/discover/movie?api_key=${apikey}&with-genres=${id}`
}

// BOOT UP THE CODE
function init(){
    // fetch(apiPaths.fetchAllCategories)
    // .then(res=>res.json())
    // .then(res=> console.log(res.genres))
    // .catch(err=>console.error(err))
    fetchAndBuildAllSections();
}

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())
    .then(res=>{
        const categories =res.genres;
        if(Array.isArray(categories)&& categories.length){
            categories.forEach(category=>{
                    fetchAndbuildMovieSection(
                        apiPaths.fetchMoviesList(category.id),
                        category.name
                        );
            });
        }
            // console.table(movies)
        }) 
    .catch(err=>console.error(err))
}

function fetchAndbuildMovieSection(fetchUrl,categoryName){
    console.log(fetchUrl,categoryName);
    return fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        // console.table(res,results);
        const movies= res.results;
        if(Array.isArray(movies)&& movies.length){
            buildMoviesSection(movies.slice(0,6),categoryName)
        }
        return movies;        
    })
    .catch(err=>console.error(err))
}

function buildMoviesSection(List, categoryName){
    console.log(List,categoryName);

    const moviesCont = document.getElementById("movies-cont");

    const moviesListHTML=List.map(item=>{
        return`
        <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
        `;
    }).join('');


    const moviesSectionHTML=`
    <h2 class="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></span></h2>
    <div class="movies-row">
                ${moviesListHTML}
            </div>
    `
    const div = document.createElement('div')
    div.className= "movies-section"
    div.innerHTML=moviesSectionHTML;

    // APPEND HTML INTO MOVIES CONTAINER
    moviesCont.append(div);
}

window.addEventListener('load',function(){
    init();
})