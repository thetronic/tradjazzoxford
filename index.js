var testJSON = {
  range: 'Sheet1!A1:Z1000',
  majorDimension: 'ROWS',
  values: [
    ['date', 'time', 'name', 'description', 'performer'],
    [
      '30/05/2023',
      '07:30',
      'Live Traditional Jazz',
      'Dixieland and New Orleans jazz in Oxford performed by Eastside Rhythm Kings at the Gladiator Club every last Tuesday of the month.',
      'Eastside Rhythm Kings',
    ],
    [
      '27/06/2023',
      '07:30',
      'Live Traditional Jazz',
      'Dixieland and New Orleans jazz in Oxford performed by Eastside Rhythm Kings at the Gladiator Club every last Tuesday of the month.',
      'Eastside Rhythm Kings',
    ],
  ],
}

var spreadsheetID = '1ejkbveN8ByG3Bk7lKAmiQ4rTMQ922QjbzhJ8g0cWhfY'
var tabName = 'Sheet1'
var apiKey = 'AIzaSyBny4imxdqvCz-D4RwDy_Ruk2ENPUK_2CQ' //FIX THIS TO BE SAFE!!!
var url =
  'https://sheets.googleapis.com/v4/spreadsheets/' +
  spreadsheetID +
  '/values/' +
  tabName +
  '?alt=json&key=' +
  apiKey

// const request = new XMLHttpRequest()
// request.open('GET', url, true)
// request.send()
let requestCounter = 10

request.onload = function () {
  // REINSTATE FOR FINAL PROJECT
  // if (this.readyState === 4 && this.status === 200) {
  //   var googleSheetsJSON = JSON.parse(this.responseText)
  //   handleLoad(googleSheetsJSON)
  // } else {
  //   requestCounter = requestCounter - 1
  //   console.log('Failed To Connect: ' + requestCounter)
  //   if (requestCounter >= 0) {
  //     request.open('GET', url, true)
  //     request.send()
  //   } else {
  //     console.log('Connection Failed')
  //   }
  // }

  // FOR TESTING
  handleLoad(testJSON)
}

function handleLoad(json) {
  json.values.shift()
  console.log(json)
  updatePage(json.values)
}

function updatePage(jsonEvents) {
  const allEvents = []
  // const latestItems = document.getElementById('latest')
  // latestItems.textContent = ''

  jsonEvents.forEach((event) => {
    const EventObject = convertToEventObject(event)
    allEvents.push(EventObject)
  })

  console.log('Event Object: ', EventObject)

  // FILL INDEX.HTML WITH LATEST ARRAY IN DOM
  // const highlightedShows = allEvents.filter((show) => {
  //   return show['highlight'] !== ''
  // })
  // const highlightedShowsLimited = highlightedShows.slice(0, 3)

  // highlightedShowsLimited.forEach((show) => {
  //   const showCard = createShowCard(show)
  //   latestItems.appendChild(showCard)
  // })
}

function convertToEventObject(event) {
  const EventObject = {}
  EventObject['date'] = event[0]
  EventObject['time'] = event[1]
  EventObject['name'] = event[2]
  EventObject['description'] = event[3]
  EventObject['performer'] = event[4]
  return EventObject
}

// function createShowCard(show){

//   const showCard = document.createElement('div')
//   const showImage = document.createElement('div')
//   const showOverlay = document.createElement('div')
//   const showTitle = document.createElement('div')
//   const showChannel = document.createElement('div')
//   const showJob = document.createElement('div')
//   const showStarring = document.createElement('div')
//   const showProducers = document.createElement('div')
//   const showAwards = document.createElement('div')

//   showCard.className = 'showCard'
//   showImage.className = 'showImage'
//   showOverlay.className = 'showOverlay'
//   showTitle.className = 'showTitle'
//   showChannel.className = 'showChannel'
//   showJob.className = 'showJob'
//   showStarring.className = 'showStarring'
//   showProducers.className = 'showProducers'
//   showAwards.className = 'showAwards'

//   showImage.style.backgroundImage = 'url(\'' + show['imageurl'].replace("http:", "https:") + '\')'
//   if (show['show'] !== ''){
//     showTitle.innerHTML = show['show'].toUpperCase()
//     showOverlay.appendChild(showTitle)
//   }
//   if (show['channel'] !== ''){
//     showChannel.innerHTML = show['channel']
//     showOverlay.appendChild(showChannel)
//   }
//   if (show['job'] !== ''){
//     showJob.innerHTML = show['job']
//     showOverlay.appendChild(showJob)
//   }
//   if (show['starring'] !== ''){
//     showStarring.innerHTML = show['starring']
//     showOverlay.appendChild(showStarring)
//   }

//   if (show['producers'][0] !== ''){
//     const producers = show['producers'].filter((a) => a).join('<br>')
//     showProducers.innerHTML = producers
//     showOverlay.appendChild(showProducers)
//   }
//   if (show['awards'][0] !== ''){
//     const awards = show['awards'].filter((a) => a)
//     awards.forEach( award => {
//       const singleAward = document.createElement('div')
//       singleAward.className = 'showAwards'
//       singleAward.innerHTML = '&#127942; ' + award
//       showAwards.appendChild(singleAward)
//     })
//     showOverlay.appendChild(showAwards)
//   }
//   showCard.appendChild(showImage)
//   showCard.appendChild(showOverlay)
//   return showCard
// }
