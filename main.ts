controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 200)
    music.play(music.createSoundEffect(WaveShape.Noise, 1462, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1067, 715, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprite.startEffect(effects.disintegrate, 200)
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 2
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 4
})
function SetMove (X: number, Y: number) {
    RocketSprite.setVelocity(X * -1 * speed, Y * -1 * speed)
    scroller.scrollBackgroundWithSpeed(X * (speed * 0.1), Y * (speed * 0.1), scroller.BackgroundLayer.Layer0)
}
info.onLifeZero(function () {
    game.setGameOverMessage(false, "GAME OVER!")
    game.setGameOverEffect(false, effects.blizzard)
    game.gameOver(false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 3
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    if (started == 0) {
        started = 1
        MoveMode = randint(1, 4)
        info.setLife(3)
    }
})
let SpaceTrash: Sprite = null
let speed = 0
let MoveMode = 0
let RocketSprite: Sprite = null
let started = 0
started = 0
RocketSprite = sprites.create(assets.image`Rocket-up`, SpriteKind.Player)
MoveMode = 0
speed = 50
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`spaceLAYER1`)
scroller.setBackgroundScrollOffset(0, 0)
game.splash("Save The Rocket!", "- the first space -")
game.setDialogFrame(img`
    . 1 1 1 1 1 1 1 1 1 7 2 1 1 . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 1 f f f f f f f f f f f 1 1 
    1 1 1 f f f f f f f f f 1 1 1 
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    `)
game.setDialogCursor(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . . 7 . . . . . . . . . . 7 . . 
    . . 7 . . . . 7 7 . . . . 7 . . 
    . . 7 . . . 7 . . 7 . . . 7 . . 
    . . 7 . . . 7 . . 7 . . . 7 . . 
    . . 7 . . 7 . . . . 7 . . 7 . . 
    . . 7 . . 7 . . . . 7 . . 7 . . 
    . . 7 . . 7 7 7 7 7 7 . . 7 . . 
    . . 7 . 7 . . . . . . 7 . 7 . . 
    . . 7 . 7 . . . . . . 7 . 7 . . 
    . . 7 . . . . . . . . . . 7 . . 
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
game.setDialogTextColor(7)
game.showLongText("Welcome to the first space!", DialogLayout.Bottom)
game.showLongText("Just keep your rocket safe! okay?", DialogLayout.Bottom)
game.showLongText("Press the arrow keys to move the rocket.", DialogLayout.Bottom)
game.showLongText("And run away from the enemies.", DialogLayout.Bottom)
game.showLongText("Be careful, they will get faster as you go!", DialogLayout.Bottom)
game.showLongText("Good luck. Keep an eye on the rocket as much as you can!", DialogLayout.Bottom)
game.onUpdateInterval(1000, function () {
    music.play(music.createSoundEffect(WaveShape.Noise, 715, 1945, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    SpaceTrash = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . c c c c c c c . . . . . 
        . . . c c c c c c c c c . . . . 
        . . c c c c c c c c c c c . . . 
        . c c c c c c f f f f f c c . . 
        . c f c c c f 2 2 2 2 f c c . . 
        . f 2 f c c f 2 f f 2 f f c . . 
        . c f c c c f 2 f f f 2 f c . . 
        . c f f c c f 2 2 2 2 2 f c . . 
        . f 2 2 f c f f f 2 f f f c . . 
        . f 2 2 2 f f f 2 2 f c c c . . 
        . . f 2 2 2 2 2 2 2 f c c . . . 
        . . . f 2 2 2 2 2 2 f c . . . . 
        . . . . f f 2 2 f f c . . . . . 
        . . . . . . f f . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    SpaceTrash.x = scene.screenWidth()
    SpaceTrash.y = randint(0, scene.screenHeight())
    SpaceTrash.setVelocity(-50 - game.runtime() / 1000, 0)
})
forever(function () {
    if (MoveMode == 1) {
        RocketSprite.setImage(assets.image`Rocket-up`)
        SetMove(0, 1)
        if (RocketSprite.y <= 0) {
            MoveMode = 2
        }
    }
    if (MoveMode == 2) {
        RocketSprite.setImage(assets.image`Rocket-down`)
        SetMove(0, -1)
        if (RocketSprite.y >= scene.screenHeight()) {
            MoveMode = 1
        }
    }
    if (MoveMode == 3) {
        RocketSprite.setImage(assets.image`Rocket-left`)
        SetMove(1, 0)
        if (RocketSprite.x <= 0) {
            MoveMode = 4
        }
    }
    if (MoveMode == 4) {
        RocketSprite.setImage(assets.image`Rocket-right`)
        SetMove(-1, 0)
        if (RocketSprite.x >= scene.screenWidth()) {
            MoveMode = 3
        }
    }
})
