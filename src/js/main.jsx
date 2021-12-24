import React, { createRef } from 'react'
import { Application } from 'pixi.js'

// components
import Stage from './components/Stage'

// assets
import PikachuSprites from '../assets/pikachu-1.png'
import GardSprites from '../assets/gard-1.png'
import Tilesets from '../assets/tilesets.png'
import FoodSprites from '../assets/food.png'
import OceanSprite from '../assets/ocean.png'
import OrbsSprites from '../assets/orbs.png'

export const collide = (rect1, rect2) => {
    return (
        rect1.x + rect1.width > rect2.x &&
        rect1.x < rect2.x + rect2.width &&
        rect1.y + rect1.height > rect2.y &&
        rect1.y < rect2.y + rect2.height
    )
}

export const WIDTH = window.innerWidth - 80
export const HEIGHT = 700

export default class Main extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            frames: [],
            loading: true,
            app: new Application({ 
                width: WIDTH, 
                height: HEIGHT,
                autoStart: true,
                backgroundColor: 0x00BFFE, 
                resolution: window.devicePixelRatio || 1,
                antialias: true,
                // resizeTo: window - flex resize
            }),
            components: [
                new Stage()
            ]
        }

        this.container = createRef(null)
        this.update = this.update.bind(this)
    }

    componentDidMount() {
        this.container.current.appendChild(this.state.app.view)
        this.state.app.loader
        .add('pikachu', PikachuSprites)
        .add('gard', GardSprites)
        .add('tilesets', Tilesets)
        .add('food', FoodSprites)
        .add('ocean', OceanSprite)

        this.state.app.loader.load(() => {
            this.init()
        })
    }

    update(delta) {
        this.state.components.forEach((i) => i.update(delta))

        requestAnimationFrame(this.update)
    }

    init() {
        const { app, components } = this.state

        components.forEach((_c) => {
            app.stage.addChild(_c)

            _c.init(app, WIDTH, HEIGHT)
        })

        this.update()
    }
 
    render() {
        return (
            <div ref={this.container}>

            </div>
        )
    }
}