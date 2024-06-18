"use strict"

function onInit() {
  console.log("onInit")
  console.log("load video")
}

function onLoad(ev) {
  ev.preventDefault()
  const searchVal = ev.target.elements.search.value

  getVideo(searchVal)
    .then((videos) => {
      rendervideo(videos.items) // Pass the items array to rendervideo
    })
    .catch((err) => {
      console.log("err:", err)
    })
}

function rendervideo(videos) {
  const elVideoPlayer = document.querySelector(".video-player")
  const elVidsContainer = document.querySelector(".vids-container")

  // if (!videos || videos.length === 0) {
  //   elVideoPlayer.innerHTML = "<p>No video available</p>";
  //   return;
  // }

  const video = videos[0]
  const videoId = video.id.videoId
  const videoTitle = video.snippet.title

  const strHTMLs = videos
    .map((video) => {
      const videoId = video.id.videoId
      const videoTitle = video.snippet.title
      return `<article class='video-item'>
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${videoTitle}</p>
              </article>`
    })
    .join("")

  elVideoPlayer.innerHTML = `<iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`
  elVidsContainer.innerHTML = strHTMLs
}
//   const videoDescription = video.snippet.description
//   const videoThumbnail = video.snippet.thumbnails.medium.url

//   const iframeHTML = `
//     <iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
//   `

//   elVideoPlayer.innerHTML = `
//     <div class="video-details">
//       <h2>${videoTitle}</h2>
//       <p>${videoDescription}</p>
//       <img src="${videoThumbnail}" alt="${videoTitle}" class="video-thumbnail">
//     </div>
//     ${iframeHTML}
//   `

// function onLoadvideo() {
//   console.log("load video")
//   // getList()
//   //   .then(renderLists)
//   //   .catch((err) => {
//   //     console.log("Error loading list:", err)
//   //     // showErrMessage(err)
//   //   })
//   getVideo()
//   .then(video) =>{
//     console.log('video' , video)
//   }
//   .catch(err=>{
//     console.log('err:', err)
//     // showErrMessage(err)
// })
// }
