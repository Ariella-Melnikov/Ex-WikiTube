'use strict'

function onInit() {
  console.log("onInit")
  const savedVideos = loadFromStorage(STORAGE_KEY_VIDEO)
const savedData = loadFromStorage(STORAGE_KEY_WIKI)

  if (savedVideos) {
    renderAll(savedVideos, savedData)
  } else {
    loadDefaultData() // If no saved videos, load default
  }
}

function onLoad(ev) {
  ev.preventDefault()
  const searchVal = ev.target.elements.search.value

  Promise.all([getVideo(searchVal), getData(searchVal)])
    .then(([videoResponse, wikiResponse]) => {
      renderAll(videoResponse.items, wikiResponse.query.search)
    })
    .catch((err) => {
      console.error("Error fetching data:", err)
    })
}

function renderAll(videos, wikiResults) {
  const elVideoPlayer = document.querySelector(".video-player")
  const elVideosContainer = document.querySelector(".videos-container")
  const searchResultsContainer = document.querySelector(".wiki-res")

  if (!videos || videos.length === 0) {
    elVideoPlayer.innerHTML = "<p>No video available</p>"
    searchResultsContainer.innerHTML = "<p>No data found</p>"
    return
  }

  const firstVideo = videos[0]
  renderVideoPlayer(firstVideo.id.videoId, firstVideo.snippet.title)
  renderVideoCards(videos.slice(0, 5))
  renderSearchResults(wikiResults)

  saveToStorage(STORAGE_KEY_VIDEO, videos)
}

function renderVideoPlayer(videoId, videoTitle) {
  const elVideoPlayer = document.querySelector(".video-player")
  elVideoPlayer.innerHTML = `
        <article class='video-item'>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
          <p>${videoTitle}</p>
        </article>`
}

function renderVideoCards(videos) {
  const elVideosContainer = document.querySelector(".videos-container")

  const videoCardsHTML = videos
    .map((video) => {
      const videoId = video.id.videoId
      const videoTitle = video.snippet.title
      const videoThumbnail = video.snippet.thumbnails.default.url

      return `
          <article class='video-card' data-video-id="${videoId}" data-video-title="${videoTitle}">
            <img src="${videoThumbnail}" alt="${videoTitle}">
            <p>${videoTitle}</p>
          </article>`
    })
    .join("")

  elVideosContainer.innerHTML = videoCardsHTML

  const videoItems = elVideosContainer.querySelectorAll(".video-card")
  videoItems.forEach((item) => {
    item.addEventListener("click", () => {
      const videoId = item.getAttribute("data-video-id")
      const videoTitle = item.getAttribute("data-video-title")
      renderVideoPlayer(videoId, videoTitle)
    })
  })
}

function renderSearchResults(results) {
    // Example function to render search results in your UI
    const searchResultsContainer = document.querySelector(".wiki-res");
  
    if (results && results.length > 0) {
      const html = results
        .slice(0, 2) // Limit to the first two results
        .map((result) => {
          // console.log('Snippet:', result.snippet);
          return `<div class="wiki-result">
                      <h3>${result.title}</h3>
                      <p>${result.snippet}</p>
                    </div>`;
        })
        .join("");
  
      searchResultsContainer.innerHTML = html;
    } else {
      searchResultsContainer.innerHTML = "<p>No results found</p>";
    }
  }
