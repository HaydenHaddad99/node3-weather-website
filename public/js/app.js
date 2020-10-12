

const URL = 'http://localhost:3000/weather?address='


const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const location = search.value

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    if (!location) {
        return messageOne.textContent='Please enter location value'
    }
    fetch(URL + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {

                return messageOne.textContent = data.error
            }
            messageOne.textContent =data.location
            messageTwo.textContent=data.forecast
        })
    })
})