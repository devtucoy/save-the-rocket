controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 200)
    music.play(music.createSoundEffect(WaveShape.Noise, 1462, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1067, 715, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite, effects.fire, 500)
    sprite.startEffect(effects.disintegrate, 200)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    scene.cameraShake(2, 500)
    music.play(music.createSoundEffect(WaveShape.Square, 1, 5000, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 5000, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.hearts, 200)
    effects.confetti.startScreenEffect(100)
    info.changeLifeBy(1)
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
    game.setGameOverScoringType(game.ScoringType.HighScore)
    game.setGameOverMessage(false, "Game over!")
    game.setGameOverEffect(false, effects.blizzard)
    game.gameOver(false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 3
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    if (CanPlay == 1) {
        if (started == 0) {
            started = 1
            MoveMode = randint(1, 4)
            info.setLife(3)
        }
    }
})
let Heal: Sprite = null
let SpaceTrash: Sprite = null
let speed = 0
let MoveMode = 0
let RocketSprite: Sprite = null
let started = 0
let CanPlay = 0
if (!(blockSettings.exists("asktut"))) {
    blockSettings.writeNumber("asktut", 1)
}
CanPlay = 0
game.splash("Save The Rocket!", "by JJJ")
if (!(blockSettings.exists("tutorial"))) {
    blockSettings.writeNumber("tutorial", 0)
} else {
    if (blockSettings.readNumber("asktut") == 1) {
        story.showPlayerChoices("See tutorial", "Start now", "Don't ask. I will start now.")
        if (story.checkLastAnswer("See tutorial")) {
            blockSettings.writeNumber("tutorial", 0)
        } else {
            if (story.checkLastAnswer("Start now")) {
                blockSettings.writeNumber("tutorial", 1)
            } else {
                blockSettings.writeNumber("tutorial", 1)
                blockSettings.writeNumber("asktut", 0)
            }
        }
    }
}
started = 0
RocketSprite = sprites.create(assets.image`Rocket-up`, SpriteKind.Player)
MoveMode = 0
speed = 50
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`spaceLAYER1`)
scroller.setBackgroundScrollOffset(0, 0)
if (blockSettings.readNumber("tutorial") == 0) {
    game.setDialogFrame(assets.image`tablet`)
    game.setDialogCursor(assets.image`key`)
    game.setDialogTextColor(7)
    game.showLongText("Welcome to the space!", DialogLayout.Bottom)
    game.showLongText("Just keep your rocket safe! okay?", DialogLayout.Bottom)
    game.showLongText("Press the arrow keys to move the rocket.", DialogLayout.Bottom)
    game.showLongText("And run away from the enemies.", DialogLayout.Bottom)
    game.showLongText("Be careful, they will get faster as you go!", DialogLayout.Bottom)
    game.showLongText("Gaining hearts increases your life.", DialogLayout.Bottom)
    game.showLongText("As you go, new enemies will appear. Stay calm and avoid them!", DialogLayout.Bottom)
    game.showLongText("Good luck. Keep an eye on the rocket as much as you can!", DialogLayout.Bottom)
    blockSettings.writeNumber("tutorial", 1)
    blockSettings.writeNumber("asktut", 1)
}
let textSprite = textsprite.create("Press B to start!", 0, 1)
textSprite.setPosition(80, 25)
while (!(controller.B.isPressed())) {
    textSprite.setOutline(1, 5)
    pause(100)
    textSprite.setOutline(1, 7)
    pause(100)
}
sprites.destroy(textSprite)
CanPlay = 1
game.onUpdateInterval(1000, function () {
    music.play(music.createSoundEffect(WaveShape.Noise, 715, 1945, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    SpaceTrash = sprites.create(assets.image`enemy_1`, SpriteKind.Enemy)
    SpaceTrash.x = scene.screenWidth() + 10
    SpaceTrash.y = randint(0, scene.screenHeight())
    SpaceTrash.setVelocity(-25 - game.runtime() / 1000, 0)
    if (info.score() > 2000) {
        music.play(music.createSoundEffect(WaveShape.Noise, 1286, 1945, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        SpaceTrash = sprites.create(assets.image`enemy_2`, SpriteKind.Enemy)
        SpaceTrash.x = -10
        SpaceTrash.y = randint(0, scene.screenHeight())
        SpaceTrash.setVelocity(50, 0)
    }
    if (Math.percentChance(5)) {
        Heal = sprites.create(assets.image`Heal`, SpriteKind.Food)
        Heal.x = scene.screenWidth() + 10
        Heal.y = randint(0, scene.screenHeight())
        Heal.setVelocity(-50 - 0, 0)
    }
    if (Math.percentChance(5)) {
        Heal = sprites.create(assets.image`Heal`, SpriteKind.Food)
        Heal.x = -10
        Heal.y = randint(0, scene.screenHeight())
        Heal.setVelocity(50 - 0, 0)
    }
})
forever(function () {
    speed = 50 + game.runtime() / 5000
    info.changeScoreBy(1)
    if (MoveMode == 1) {
        SetMove(0, 1)
        RocketSprite.setImage(assets.image`Rocket-up`)
        if (RocketSprite.y <= 0) {
            MoveMode = 2
        }
    }
    if (MoveMode == 2) {
        SetMove(0, -1)
        RocketSprite.setImage(assets.image`Rocket-down`)
        if (RocketSprite.y >= scene.screenHeight()) {
            MoveMode = 1
        }
    }
    if (MoveMode == 3) {
        SetMove(1, 0)
        RocketSprite.setImage(assets.image`Rocket-left`)
        if (RocketSprite.x <= 0) {
            MoveMode = 4
        }
    }
    if (MoveMode == 4) {
        SetMove(-1, 0)
        RocketSprite.setImage(assets.image`Rocket-right`)
        if (RocketSprite.x >= scene.screenWidth()) {
            MoveMode = 3
        }
    }
})
