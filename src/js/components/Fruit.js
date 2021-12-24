import { AnimatedSprite, BaseTexture, Rectangle, Texture } from "pixi.js"
import { HEIGHT } from "../main"

import OrbsSprites from '../../assets/orbs.png'

let bombBase = new BaseTexture.from(OrbsSprites)
let bombTextures = [
    new Texture(bombBase, new Rectangle(32 * 3, 0, 32, 32)),
    new Texture(bombBase, new Rectangle(32 * 4, 0, 32, 32)),
    new Texture(bombBase, new Rectangle(32 * 5, 0, 32, 32)),
    new Texture(bombBase, new Rectangle(32 * 0, 0, 32, 32)),
    new Texture(bombBase, new Rectangle(32 * 1, 0, 32, 32)),
    new Texture(bombBase, new Rectangle(32 * 3, 0, 32, 32))
]

export class Fruit {
    constructor(name, textures, pos) {
        this.fruitName = name
        this.object = new AnimatedSprite(textures)
        this.object.x = pos.x
        this.object.y = pos.y
        this.object.zIndex = 12
        this.object.alpha = 0.95
        this.object.anchor.set(0.5, 0.95)
        this.object.play()

        this.scored = null

        this.fall = true
        this.dy = 0
        this.max = 4
        this.dd = 0.05
    }

    init(app) {
        app.addChild(this.object)
    }

    update() {
        this.grav()
    }

    grav() {
        if(this.scored) {
            this.object.textures = bombTextures
            this.object.width = 78
            this.object.height = 78
            this.object.animationSpeed = 0.3
            this.object.anchor.set(0.5, 0.75)
            this.object.pivot.set(8)
            this.object.play()
            this.scored = false

            let rand = Math.round(Math.random() * 3) + 1

            let timer = setInterval(() => {
                this.object.rotation += (rand === 2) ? 0.5 : -0.5
                this.object.alpha -= 0.08
                this.object.scale._x += 0.4
                this.object.scale._y += 0.4
            }, 100)

            setTimeout(() => {
                this.object.y = HEIGHT

                clearInterval(timer)
            }, 400)
        }
        else if(this.scored == false) return

        this.dy += this.dy <= this.max ? this.dd : 0

        // if(rectIntersect(this.pikachu.object, this.object) && this.scored != false) {
        //     this.scored = true

        //     this.pikachu.score += 100

        //     return
        // }
        // else if(rectIntersect(this.gard.object, this.object)  && this.scored != false) {
        //     this.scored = true

        //     this.gard.score += 100

        //     return
        // }

        if(!this.fall) return

        if(Math.abs(this.dy) < this.dd * 3 && this.object.y >= HEIGHT - 128) {
            this.fall = false
            this.dy = 0
        }
        
        if(this.object.y >= HEIGHT - 128) {
            // this.speed -= delta / 1000
            // this.object.y -= delta / 1000
            this.dy /= 2
            this.dy *= -1
        }

        this.object.y += this.dy
    }
}