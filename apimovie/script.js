const searchForm= document.querySelector('form');
const moviecontainer= document.querySelector('.movie-container');
const inputBox= document.querySelector('.inputBox');

//function to fetch movie detail using OMDB API
const getMovieInfo = async (movie) =>{
    try{
    const myAPIKey = "fdfc68ac";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;
    const response = await fetch(url);


    if(!response.ok){
        throw new Error("Unable to fetch movie data");
    }
    const data =  await response.json();
    
     showMovieData(data);
    // console.log(data);
    }
    catch (error) {
        showErrorMessage("No Movie Found!!!");
    }
}

//function to show movie data on screen
const showMovieData = (data) => {
    moviecontainer.innerHTML = "";
    moviecontainer.classList.remove('noBackground');

    //use destructing assesments to extract properties from data object
    const {Title, imdbRating, Genre, Released, Runtime, Actors,Plot,Poster}= data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML=`<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

     Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);

     });
     
     movieElement.appendChild(movieGenreElement);
     movieElement.innerHTML +=`<p><strong>Released Date:</strong>${Released}</p>
                              <p><strong>Duration :</strong>${Runtime}</p>
                              <p><strong>Cast:</strong>${Actors}</p>
                              <p><strong>Plot:</strong>${Plot}</p>`;

    //Creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`

    moviecontainer.appendChild(moviePosterElement);
    moviecontainer.appendChild(movieElement);                       


}
//function to display error message
const showErrorMessage = (message) =>{
    moviecontainer.innerHTML = `<h2>${message} </h2>`;
    moviecontainer.classList.add('noBackground');
}
//function to handle form submission
const handleFormSubmission =(e) =>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information....");
        getMovieInfo(movieName);
    }
    else{
        // moviecontainer.innerHTML=`<h2> Enter movie name to get movie information</h2>`;
        // moviecontainer.classList.add('noBackground');
        showErrorMessage("Enter movie name to get movie information");
    }
}
//Adding event listener to search form
searchForm.addEventListener('submit',handleFormSubmission);
//     e.preventDefault();
//     // console.log(inputBox.value);
//     const movieName = inputBox.value.trim();
//     if(movieName !== ''){
//         getMovieInfo(movieName);
//     }
//     else{
//         // moviecontainer.innerHTML=`<h2> Enter movie name to get movie information</h2>`;
//         // moviecontainer.classList.add('noBackground');
//         showErrorMessage("Enter movie name to get movie information");
//     }

// });

