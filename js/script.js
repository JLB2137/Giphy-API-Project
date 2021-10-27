alert('JS Working')

const $img = $('img')
const URL = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = '?api_key=hvGei9QgKHO2wGpIseEMtFaRyyd0dPN2'
let searchInput = 'cheese'
const search = `&q=${searchInput}`

let promise = $.ajax(`${URL}${API_KEY}${search}`)



promise.then(function(response) {
    console.log(response.data[0].url)
    let imageValue = response.data[1].images.original.url
    $img.attr('src',`${imageValue}`)
    console.log(imageValue)
    console.log(response)
    //$img.attr('src',`${imageValue}`)
}, function(error) {
    console.log(error)
})