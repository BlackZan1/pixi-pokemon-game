import { AnimatedSprite } from "pixi.js"
import { heroes } from "../utils/heroes"
import { HEIGHT } from "../main"

export class Hero {
    constructor(name, resources, type, x) {
        this.data = heroes[name]
        this.textures = this.data.getSprites(resources[name])

        console.log(this.data)

        this.object = new AnimatedSprite(this.textures[type])
        this.object.loop = true
        this.object.animationSpeed = this.data.animationSpeed
        this.object.anchor.set(0.5)
        this.object.play()
        this.object.x = x
        this.object.y = HEIGHT - this.data.yDiff
        this.minY = this.object.y
        this.object.zIndex = 9

        this.type = type
        this.ismoving = null
        this.heroName = name
        this.score = 0

        // gravitation
        this.dy = 0
        this.dd = 2
        this.fall = false
        this.jump = false
        this.engageTime = 0
    }

    get idle() {
        return this.textures.idle
    }

    get moving() {
        return this.textures.moving
    }

    change(value) {
        if(this[value]) {
            this.object.textures = this[value]
            this.type = value

            this.object.play()
        }
    }

    init(app) {
        app.addChild(this.object)

        console.log("RRRR")

        this.object.y -= 100
    }

    checkType() {
        if(this.ismoving && this.type != 'moving') this.change('moving')
        else if(this.ismoving == false && this.type != 'idle') {
            this.change('idle')
        }
    }

    toggleMoving(value) {
        this.ismoving = value
    }

    changePos(x = 0, y = 0, action = '+') {
        if(action == '+') {
            this.object.x += x
            this.object.y += y
        }
        else if(action == '-') {
            this.object.x -= x
            this.object.y -= y
        }
    }

    startJump() {
        if(!this.jump) {
            this.jump = true
            this.velocity = 25
            this.engageTime = 0.4
        }
    }

    grav() {
        if(this.jump && !this.fall) {
            this.dy = 0

            if(this.engageTime > 0 && (Math.abs(this.dy) <= 70)) {
                this.dy += this.velocity

                this.engageTime -= 0.05
            }
            else {
                this.jump = false
                this.fall = true
                this.dy = 0
                this.engageTime = 0
            }

            this.object.y -= this.dy
        }
        else {
            if(Math.abs(this.dy) <= 12) {
                this.dy += this.dd
            }
            else {
                this.dy += 0
                this.fall = true
            }

            if(Math.abs(this.dy) < this.dd * 3 && this.object.y >= this.minY) {
                this.fall = false
                this.dy = 0
            }

            if(this.object.y >= this.minY) {
                this.jump = false
                this.dy = 0
                this.object.y = this.minY
            }
            else this.fall = true

            if(!this.fall) this.dy = 0

            this.object.y += this.dy
        }
    }
}