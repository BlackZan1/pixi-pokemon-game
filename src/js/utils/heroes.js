import { HEIGHT } from "../main"
import { Texture, Rectangle, BaseTexture } from "pixi.js"

export const heroes = {
    pikachu: {
        yDiff: 160,
        animationSpeed: 0.15,
        getSprites: function(spritesheet) {
            let baseTexture = new BaseTexture.from(spritesheet.url)

            return {
                idle: [
                    new Texture(baseTexture, new Rectangle(0 * 80, 0, 80, 80)),
                    new Texture(baseTexture, new Rectangle(1 * 80, 0, 80, 80)),
                    new Texture(baseTexture, new Rectangle(2 * 80, 0, 80, 80)),
                    new Texture(baseTexture, new Rectangle(3 * 80, 0, 80, 80)),
                    new Texture(baseTexture, new Rectangle(4 * 80, 0, 80, 80)),
                    new Texture(baseTexture, new Rectangle(5 * 80, 0, 80, 80)),
                    new Texture(baseTexture, new Rectangle(6 * 80, 0, 80, 80))
                ],
                moving: [
                    new Texture(baseTexture, new Rectangle(0 * 92, 80 + 2, 92, 74)),
                    new Texture(baseTexture, new Rectangle(1 * 92, 80 + 2, 92, 74)),
                    new Texture(baseTexture, new Rectangle(2 * 92, 80 + 2, 92, 74)),
                    new Texture(baseTexture, new Rectangle(3 * 92, 80 + 2, 92, 74))
                ]
            }
        }
    },
    gard: {
        yDiff: 128 + 67,
        animationSpeed: 0.1,
        getSprites: function(spritesheet) {
            let baseTexture = new BaseTexture.from(spritesheet.url)

            return {
                idle: [
                    new Texture(baseTexture, new Rectangle(0 * 120, 0, 120, 134)),
                    new Texture(baseTexture, new Rectangle(1 * 120, 0, 120, 134)),
                    new Texture(baseTexture, new Rectangle(2 * 120, 0, 120, 134)),
                    // new Texture(baseTexture, new Rectangle(3 * 120, 0, 120, 134))
                ],
                moving: [
                    new Texture(baseTexture, new Rectangle(0 * 160, 134 + 2, 160, 136)),
                    new Texture(baseTexture, new Rectangle(1 * 160, 134 + 2, 160, 136)),
                    new Texture(baseTexture, new Rectangle(2 * 160, 134 + 2, 160, 136)),
                    new Texture(baseTexture, new Rectangle(3 * 160, 134 + 2, 160, 136)),
                    new Texture(baseTexture, new Rectangle(4 * 160, 134 + 2, 160, 136)),
                    new Texture(baseTexture, new Rectangle(0 * 160, 270 + 4, 160, 136)),
                    new Texture(baseTexture, new Rectangle(1 * 160, 270 + 4, 160, 136)),
                    new Texture(baseTexture, new Rectangle(2 * 160, 270 + 4, 160, 136)),
                    new Texture(baseTexture, new Rectangle(3 * 160, 270 + 4, 160, 136))
                ]
            }
        }
    }
}