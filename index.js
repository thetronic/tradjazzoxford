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

const request = new XMLHttpRequest()
request.open('GET', url, true)
request.send()
let requestCounter = 10

request.onload = function () {
  if (this.readyState === 4 && this.status === 200) {
    var googleSheetsJSON = JSON.parse(this.responseText)
    handleLoad(googleSheetsJSON)
  } else {
    requestCounter = requestCounter - 1
    console.log('Failed To Connect: ' + requestCounter)
    if (requestCounter >= 0) {
      request.open('GET', url, true)
      request.send()
    } else {
      console.log('Connection Failed')
    }
  }
}

function handleLoad(json) {
  json.values.shift()
  console.log(json)
  updatePage(json.values)
}

function updatePage(jsonEvents) {
  const allEvents = []
  const latestItems = document.getElementById('latest')
  latestItems.textContent = ''

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
