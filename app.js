const autoCompleteInput = document.querySelector('.autocompleteInput')

autoCompleteInput.addEventListener('input', onInputChange)

var countryURL = 'https://restcountries.com/v3.1/all'

getCountryData()

let countryNames = []

async function getCountryData(){
    const countryResource = await fetch(countryURL)
    const data = await countryResource.json()

    // console.log(data);

    countryNames = data.map((country) => {
        return country.name.common
    })

    // console.log(countryNames);
}


function onInputChange(){
    removeAutoCompleteDropdown()

    const value = autoCompleteInput.value.toLowerCase()

    if(value.length === 0){
        return
    }

    const filteredNames = []

    countryNames.forEach((countryName)=> {
        if(countryName.substr(0, value.length).toLowerCase() === value)
        filteredNames.push(countryName)
    })

    // console.log(filteredNames);

    createAutoCompleteDropdown(filteredNames)
}

function createAutoCompleteDropdown(list){
    var ul = document.createElement('ul')
    ul.id = "autoCompleteList"

    list.forEach(country => {
        const li = document.createElement('li')
        const countryBtn = document.createElement('button')
        countryBtn.innerHTML = country
        countryBtn.addEventListener('click', onCountryButtonClick)
        li.appendChild(countryBtn)
        ul.appendChild(li)
    })

    document.querySelector('.container').appendChild(ul)
}

function removeAutoCompleteDropdown(){
    const listEl = document.getElementById('autoCompleteList')
    if(listEl) listEl.remove()
}

function onCountryButtonClick(e){
    e.preventDefault()
    const buttonEl = e.target 
    autoCompleteInput.value = buttonEl.innerHTML

    removeAutoCompleteDropdown()
}