//alert('JS Working')

const $img = $('img')
const $submit = $('input')
const URL = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = '?api_key=hvGei9QgKHO2wGpIseEMtFaRyyd0dPN2'
let resultsCounter = 0
let searchInput = 'cheese'
//object for interating with the gif setup
const gif = {
    search: `&q=${searchInput}`,
    imageSource: ''
}

let promise = $.ajax(`${URL}${API_KEY}${gif.search}`)



promise.then(function(response) {
    //console.log(response.data[0].url)
    $img.attr('src',`${gif.imageSource}`)
    submit(response)
    //console.log(imageValue)
    //console.log(response)
    //$img.attr('src',`${imageValue}`)
}, function(error) {
    console.log(error)
})

function submit(response) {
    $submit.on("click", function(evt) {
        //prevent default behavior
        evt.preventDefault()
        //set the image source equal to the response
        gif.imageSource = response.data[resultsCounter].images.original.url
        //update the counter to move to the next gif in the array
        resultsCounter++
        //update the image with the next gif in the array
        $img.attr('src',`${gif.imageSource}`)

    })

}