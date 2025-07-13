controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 1
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
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    MoveMode = 3
})
let speed = 0
let MoveMode = 0
let RocketSprite: Sprite = null
RocketSprite = sprites.create(assets.image`Rocket-up`, SpriteKind.Player)
MoveMode = 0
speed = 50
scroller.setLayerImage(scroller.BackgroundLayer.Layer0, assets.image`spaceLAYER1`)
scroller.setBackgroundScrollOffset(0, 0)
forever(function () {
    RocketSprite.sayText(MoveMode)
    if (MoveMode == 1) {
        SetMove(0, 1)
        if (RocketSprite.y <= 0) {
            MoveMode = 2
        }
    }
    if (MoveMode == 2) {
        SetMove(0, -1)
        if (RocketSprite.y >= scene.screenHeight()) {
            MoveMode = 1
        }
    }
    if (MoveMode == 3) {
        SetMove(1, 0)
        if (RocketSprite.x <= 0) {
            MoveMode = 4
        }
    }
    if (MoveMode == 4) {
        SetMove(-1, 0)
        if (RocketSprite.x >= scene.screenWidth()) {
            MoveMode = 3
        }
    }
})
