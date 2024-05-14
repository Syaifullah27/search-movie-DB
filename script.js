// $('.search-button').on('click' ,function(){

//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=5328d53&s=' + $('.input-keyword').val(),
//         success: result => {
//           const movies = result.Search;
//           let cards = '';
//           movies.forEach(m => {
//             cards += showCard(m)
//         });
//           $('.movie-container').html(cards);
     
//         // ketika tombol detail di-klik 
//         $('.modal-detail-button').on('click', function(){
//            $.ajax({
//             url: 'http://www.omdbapi.com/?apikey=5328d53&i=' + $(this).data('imdbid'),
//             success: m => {
//                 console.log(m)
//                 const movieDetail = showDetail(m)
//                 $('.modal-body').html(movieDetail);
//             },
//             eror: (e) => {
//                 console.log(e.responsetext);
//                }
//         });
//       }); 
        
//        },
//        eror: (e) => {
//         console.log(e.responsetext);
//        }
//     });
// })


// Fetch 
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function() {

//   const inputKeyword = document.querySelector('.input-keyword')
//   fetch('http://www.omdbapi.com/?apikey=5328d53&s=' + inputKeyword.value)
//    .then(response => response.json())
//    .then(response => {
//       const movies = response.Search;
//       let cards = '';
//       movies.forEach(m => cards += showCard(m));
//       const movieContainer = document.querySelector('.movie-container');
//       movieContainer.innerHTML = cards;

//       // ketika tombol detail di-klik
//       const modalDetailButton = document.querySelectorAll('.modal-detail-button')
//       modalDetailButton.forEach(btn => {
//         btn.addEventListener('click', function(){
//           const imdbid = this.dataset.imdbid;
//           console.log(imdbid)
//           fetch('http://www.omdbapi.com/?apikey=5328d53&i=' + imdbid)
//           .then(response => response.json())
//           .then(m => {
//             const movieDetail = showDetail(m)
//             const modalBody = document.querySelector('.modal-body');
//             modalBody.innerHTML = movieDetail;
//           })
//         });
//       });
//    });

// });




// Fetch Refector
const searchButtton = document.querySelector('.search-button')
searchButtton.addEventListener('click', async function(){
  try{
  const inputKeyword = document.querySelector('.input-keyword')
  const movies = await getMovies(inputKeyword.value)
  updateUI(movies)
  }catch(err){
    alert(err);
  }
})


function getMovies(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=5328d53&s=' + keyword)
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json();
  })
  .then(response => {
    if(response.Response === 'False') {
      throw new Error(response.Error);
    }
    return response.Search;
  });

}

function updateUI(movies){
    let cards = '';
    movies.forEach(m => cards += showCard(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;

}


// ketika tombol detail di-klik
// event binding
document.addEventListener('click', async function(e) {
   if( e.target.classList.contains('modal-detail-button')) {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid)
      updateUIDetail(movieDetail);
   }
})


function getMovieDetail(imdbid) {
  return fetch('http://www.omdbapi.com/?apikey=5328d53&i=' + imdbid)
    .then(response => response.json())
    .then(m => m);
    
  }

function updateUIDetail(m){
  const movieDetail = showDetail(m);
  const modalBody = document.querySelector('.modal-body')
  modalBody.innerHTML = movieDetail;
}







function showCard(m) {
  return ` <div class="col-md-4 my-3">
                 <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                     <div class="card-body">
                      <h5 class="card-title">${m.Title}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
                  </div>
                </div>
           </div>`;
}



function showDetail(m) {
 return `<div class="container-fluid">
  <div class="row">
      <div class="col-md-3">
          <img src="${m.Poster}" class="img-fluid">
      </div>
      <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
              <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
              <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
              <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
              <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
            </ul>
      </div>
  </div>
  </div>`;
}