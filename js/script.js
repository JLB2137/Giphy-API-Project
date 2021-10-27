//alert('JS Working')

const $img = $('img')
const $shuffle = $('input[value="Shuffle"]')
const $userInput = $('input[type="text"]')
const $submit = $('input[value="Submit"]')
const URL = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = '?api_key=hvGei9QgKHO2wGpIseEMtFaRyyd0dPN2'
let searchInput = 'cheese'
let promise = ''
//object for interating with the gif setup
const gif = {
    search: `&q=${searchInput}`,
    imageSource: '',
    resultsCounter: 0
}



function giphyAPI() {
    
    promise = $.ajax(`${URL}${API_KEY}${gif.search}`)

    promise.then(function(response) {
        //set the image source equal to the response
        gif.imageSource = response.data[gif.resultsCounter].images.original.url
        //console.log(response.data[0].url)
        $img.attr('src',`${gif.imageSource}`)
        //if you hit the shuffle button change the gif to the next in the stack that was returned
        shuffle(response)

    }, function(error) {
        console.log(error)
    })
}


function shuffle(response) {
    $shuffle.on("click", function(evt) {
        //prevent default behavior
        evt.preventDefault()
        //set the image source equal to the response
        gif.imageSource = response.data[gif.resultsCounter].images.original.url
        //update the counter to move to the next gif in the array
        gif.resultsCounter++
        //update the image with the next gif in the array
        $img.attr('src',`${gif.imageSource}`)
    })

}

function updateSearch(input) {
    //update the searchInput variable to what is the input
    searchInput = input
    //update the total gif search string to include the new search
    gif.search = `&q=${searchInput}`
}

$submit.on("click", function(evt) {
    updateSearch($userInput.val())
    //reset the results counter
    gif.resultsCounter = 0
    giphyAPI()
})


//need to get the length of the object array that is returned,
// this way I don't keep interating when there aren't any gifs left


