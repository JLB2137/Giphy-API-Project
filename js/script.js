//alert('JS Working')

const $img = $('img')
const $shuffle = $('input[value="Shuffle"]')
const $userInput = $('input[type="text"]')
const $submit = $('input[value="Submit"]')
const $select = $('select');
const URL = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = '?api_key=hvGei9QgKHO2wGpIseEMtFaRyyd0dPN2'
let searchInput = 'cheese'
let gifRating = 'g'
let promise = ''
let responseGlobal
//object for interating with the gif setup
const gif = {
    search: `&q=${searchInput}`,
    rating: `&rating=${gifRating}`,
    imageSource: '',
    resultsCounter: 0,
    response: 'response'
}



function giphyAPI() {
    
    console.log(`${URL}${API_KEY}${gif.search}${gif.rating}`)

    promise = $.ajax(`${URL}${API_KEY}${gif.search}${gif.rating}`)

    promise.then(function(response) {
        //set the image source equal to the response
        gif.imageSource = response.data[gif.resultsCounter].images.original.url
        //set the image on the index file equal to the source of the first gif in the response
        $img.attr('src',`${gif.imageSource}`)
        //set the response to be used globally by other buttons/functions
        gif.response = response
        console.log('length',gif.response.data.length)
        console.log(gif.response)
        

    }, function(error) {
        console.log(error)
    })
}

//updates the search inputs so that the API string can be adjusted correctly
function updateSearch(input) {
    //update the searchInput variable to what is the input
    searchInput = input
    //update the total gif search string to include the new search
    gif.search = `&q=${searchInput}`
}

//setting up the shuffle event
$shuffle.on("click", function(evt) {
    //prevent default behavior
    evt.preventDefault()
    //update the counter to move to the next gif in the array only if we have more gifs in the stack left
    if (gif.resultsCounter < gif.response.data.length - 1) {
        gif.resultsCounter++
        console.log('gifCounter',gif.resultsCounter)
    //otherwise reset the counter to the first gif
    } else {
        gif.resultsCounter = 0
        console.log('gifCounter',gif.resultsCounter)
    }
    //set the image source equal to the response
    gif.imageSource = gif.response.data[gif.resultsCounter].images.original.url
    //update the image with the next gif in the array
    $img.attr('src',`${gif.imageSource}`)
})


$submit.on("click", function() {
    updateSearch($userInput.val())
    //reset the results counter
    gif.resultsCounter = 0
    //rerun the giphyAPI to update the image in the index
    giphyAPI()
})


$select.on("change", function(evt) {
    //set the gif rating to what has been selected
    gifRating = $(evt.target).val()
    //updated the gif rating string for promise setup
    gif.rating = `&rating=${gifRating}`
})



