import Player from 'xgplayer';
import { createDom } from 'xgplayer/src/utils/util'

import GIF from 'gif.js'

let playerVideoToGif = function(player) {

    if (!player.config.playerVideoToGif) {
        return
    }

    const btn = createDom(
        'xg-download',
        `<p class="name"><span>视频截取</span></p>`,
        {},
        'xgplayer-download'
    )

    player.once('ready', () => {
        player.controls.appendChild(btn)
    })

    console.log("playerVideoToGif")

    let gif = new GIF({
        workers: 2,
        quality: 10,
    })


}

Player.install('playerVideoToGif', playerVideoToGif)