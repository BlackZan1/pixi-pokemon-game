import { Container, BaseTexture, Texture, Rectangle, TextStyle, Text, Sprite, TilingSprite } from 'pixi.js'

// components
import { Hero } from './Hero'
import { Fruit } from './Fruit'

// assets
// import BombSprites from '../../assets/bomb.png'

// utils
import { rectIntersect } from '../utils/checkCollision'
import { HEIGHT, WIDTH } from '../main'

export default class Stage extends Container {
    createHeroes(resources) {
        this.pikachu = new Hero('pikachu', resources, 'idle', 200)
        this.gard = new Hero('gard', resources, 'idle', 600)

        this.pikachu.init(this)
        this.gard.init(this)

        this.objects = [
            this.pikachu, this.gard
        ]

        const style = new TextStyle({
            fontFamily: "Arial Black",
            fontVariant: "small-caps",
            fontWeight: "bold"
        })
        
        this.text = new Text('Hello World', style)

        this.addChild(this.text)
    }

    createOcean(resource) {
        const texture = new Texture.from(resource.url)
        this.bg = new TilingSprite(texture, WIDTH, HEIGHT)
        this.bg.x = 0
        this.bg.y = 0
        this.bg.zIndex = 0
        this.bg.alpha = 0.65

        this.addChild(this.bg)
    }

    createBiom(resource) {
        this.collides = []

        const spritesheet = new BaseTexture.from(resource.url)
        const ground = new Texture(spritesheet, new Rectangle(192, 0, 128, 128))

        const tree = new Texture(spritesheet, new Rectangle(640, 384, 256, 256))
        const bigTree = new Texture(spritesheet, new Rectangle(1152, 512, 384, 384))

        for(let i = 0; i <= 32; i++) {
            let sprite = new Sprite.from(ground)
            sprite.x = i * 128
            sprite.y = HEIGHT - 128 / 2
            sprite.zIndex = 1
            sprite.anchor.set(0.5)

            if(i == 1 || i == 7 || i == 9 || i == 12) {
                let sprite_tree = new Sprite.from(tree)
                sprite_tree.zIndex = 3
                // sprite_tree.width = 245
                // sprite_tree.height = 245
                sprite_tree.x = i * 128
                sprite_tree.alpha = 0.9
                sprite_tree.y = HEIGHT - tree.height - 128

                this.addChild(sprite_tree)
            }
            
            if(i == 5 || i == 9 || i == 2) {
                let sprite_tree = new Sprite.from(bigTree)
                sprite_tree.zIndex = 2
                // sprite_tree.width = 245
                // sprite_tree.height = 245
                sprite_tree.x = i * 128
                sprite_tree.alpha = 0.85
                sprite_tree.y = HEIGHT - bigTree.height - 128

                this.addChild(sprite_tree)
            }

            this.addChild(sprite)
            this.collides.push(sprite)
        }

        // let sprite = new Sprite.from(ground)
        // sprite.x = 1000 / 2
        // sprite.y = HEIGHT - 350
        // sprite.zIndex = 10

        // this.addChild(sprite)
        // this.collides.push(sprite)

        console.log(this.collides)
    }

    createFood(resource) {
        this.food = []

        const spritesheet = new BaseTexture.from(resource.url)
        const textures = [
            new Texture(spritesheet, new Rectangle(0, 0, 64, 64)),
            new Texture(spritesheet, new Rectangle(0, 64, 64, 64)),
            new Texture(spritesheet, new Rectangle(64, 64, 64, 64)),
            new Texture(spritesheet, new Rectangle(64, 0, 64, 64)),
            new Texture(spritesheet, new Rectangle(128, 128, 64, 64)),
            new Texture(spritesheet, new Rectangle(64, 128, 64, 64))
        ]

        let randomNum = Math.floor(Math.random() * 55) + 20

        for(let i = 0; i < randomNum; i++) {
            let randomType = Math.floor(Math.random() * 5)
            let randomY = Math.floor(Math.random() * 35) + 1

            let pos = {
                x: Math.floor(Math.random() * WIDTH - 200) + 200,
                y: -64 * randomY
            }

            const newFood = new Fruit(i, [ textures[randomType] ], pos)

            this.food.push(newFood)
            
            newFood.init(this)
        }

        console.log(this.food)
    }

    updateFood() {
        this.food.forEach((_f) => {
            _f.update()

            if(rectIntersect(this.pikachu.object, _f.object) && _f.scored != false) {
                _f.scored = true

                this.pikachu.score += 100

                return
            }
            else if(rectIntersect(this.gard.object, _f.object)  && _f.scored != false) {
                _f.scored = true

                this.gard.score += 100

                return
            }
        })
    }

    init(app, width, height) {
        let { resources } = app.loader

        this.app = app
        this.keys = {}
        this.sortableChildren = true
        this.width = width
        this.height = height
        this.basket = []

        // create methods
        this.createOcean(resources['ocean'])
        this.createHeroes(resources)
        this.createBiom(resources['tilesets'])
        this.createFood(resources['food'])

        // keyboard listener
        window.addEventListener('keydown', (ev) => {
            this.keys[ev.keyCode] = true
        })

        window.addEventListener('keyup', (ev) => {
            let keyName = ev.keyCode

            this.keys[keyName] = false

            if(keyName == 65 || keyName == 68) {
                this.pikachu.toggleMoving(false)
            }
            else if(keyName == 74 || keyName == 76) {
                this.gard.toggleMoving(false)
            }
        })
    }

    update(delta) {
        // console.log(delta)
        this.updateFood(delta)

        if(this.keys['68']) {
            if(this.pikachu.object.x + 6 <= WIDTH) {
                // if(!rectIntersect(this.pikachu.object, this.collides[0])) {
                    this.pikachu.object.scale.set(-1, 1)
                    this.pikachu.changePos(6, 0, '+')

                    this.pikachu.toggleMoving(true)
                // }
            }
        }
        else if(this.keys['65']) {
            if(this.pikachu.object.x - 6 >= 0) {
                // if(!rectIntersect(this.pikachu.object, this.collides[0])) {
                    this.pikachu.object.scale.set(1, 1)
                    this.pikachu.changePos(6, 0, '-')

                    this.pikachu.toggleMoving(true)
                // }
            }
        }
        
        if(this.keys["87"]) {
            this.pikachu.startJump()
        }

        if(rectIntersect(this.pikachu.object, this.collides[0]) && this.pikachu.jump) {
            this.pikachu.fall = true
            this.pikachu.dy = 0
            this.pikachu.engageTime = 0
        }

        if(this.keys['76']) {
            if(this.gard.object.x + 6 <= WIDTH) {
                this.gard.object.scale.set(-1, 1)
                this.gard.changePos(6, 0, '+')

                this.gard.toggleMoving(true)
            }
        }
        else if(this.keys['74']) {
            if(this.gard.object.x - 6 >= 0) {
                this.gard.object.scale.set(1, 1)
                this.gard.changePos(6, 0, '-')

                this.gard.toggleMoving(true)
            }
        }
        
        if(this.keys["73"]) {
            this.gard.startJump()
        }

        this.objects.forEach(i => {
            i.checkType()
            i.grav()
        })

        this.bg.tilePosition.x += 1

        this.text.text = `Pikachu: ${this.pikachu.score}, Gard: ${this.gard.score}`    

        // let isOk = this.collides.some((i) => rectIntersect(this.pikachu.object, i))

        // if(isOk) this.pikachu.fall = false

        this.collides.forEach((_i) => {
            if(rectIntersect(this.pikachu.object, _i)) {
                console.log("COLLIDES!") 

                // this.pikachu.object.x -= _i.width / 2
            }
        })
    }
}