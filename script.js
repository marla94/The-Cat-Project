document.addEventListener("DOMContentLoaded", () => {
    getCatData()
})

// Funcion fetch general
function getJSONData(url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

let hideSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "none";
}

// Funcion para llamar a la API CAT
function getCatData() {
    const API_KEY = 'live_Dgd3UTWASOB8hA1wFeMvdAPOM7ljYGBtDNAd7c4KQOGtrlygFMXf0gTWXSnkIwgO';
    const URL = `https://api.thecatapi.com/v1/images/search?limit=50&api_key=${API_KEY}`;

    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCatCarousel(resultObj.data)
        }
    });
}

// Funcion para mostrar las imágenes de los gatitos en forma de carrusel
function showCatCarousel(catImagesArray) {
    let imagesContainer = document.getElementById('carousel-images-container');
    let imagesHTML = '';

    let active = true;
    for (image of catImagesArray) {
        if (active) {
            imagesHTML += `<div class="carousel-item active fix-size-image">`
            active = false
        } else {
            imagesHTML += `<div class="carousel-item fix-size-image">`
        }

        imagesHTML += `
                <img src="${image.url}" class="d-block" alt="Imagen de gatitos">
            </div>
        `
    }

    imagesContainer.innerHTML = imagesHTML;
}