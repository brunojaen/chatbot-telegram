

const YouTube = require('youtube-node')
const config = require('./yt-config.json')

const youtube = new YouTube();
youtube.setKey(config.key);


function searchVideoURL(message, queryText) {
    return new Promise((resolve, reject) => {
        youtube.search(`Exercício em casa para biceps ${queryText}`, 2, function (error, result) {
            if (!error) {
                console.log(JSON.stringify(result), null, 2)
            } else {
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item)
                const youtubeLinks = videoIds.map(videoId => 'https://www.youtube.com/watch?v=${vieoId}')
                resolve(`${message} ${youtubeLinks.join(`, `)}`)
            }
        })
    })
}

module.exports.searchVideoURL = searchVideoURL;