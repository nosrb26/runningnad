'use client'

import { useEffect, useRef, useState } from 'react'

export default function GamePage() {
  const gameRef = useRef<HTMLDivElement>(null)
  const [showReplay, setShowReplay] = useState(false)
  const [replayKey, setReplayKey] = useState(0)

  // --- Adjustable parameters ---
  const GAME_WIDTH = 800         // canvas width
  const GAME_HEIGHT = 400        // canvas height
  const GRAVITY_Y = 1000         // gravity force on Y axis
  const JUMP_VELOCITY = -450     // player jump strength
  const INITIAL_SPAWN_INTERVAL = 1250 // initial time between obstacles (ms)
  const MIN_SPAWN_INTERVAL = 500      // minimum time between obstacles (ms)
  const SPAWN_RANDOM_VARIANCE = 250    // additional random delay (ms)
  const SPEED_BASE = 300          // base obstacle speed (px/s)
  const SPEED_SCALE = 5           // speed increase per score point (px/s per point)
  const SPEED_MAX = 1500          // maximum absolute speed (px/s)
  const BIRD_Y_MIN = 280         // min height for bird obstacle (px)
  const BIRD_Y_MAX = 360         // max height for bird obstacle (px)
  const CACTUS_Y = 360           // Y position for ground obstacle (px)
  const SCORE_INTERVAL = 1000    // time interval for score increment (ms)
  const TEXT_POS = { x: 16, y: 16 }
  const OBSTACLE_SIZE = { width: 30, height: 30 }

  useEffect(() => {
    if (!gameRef.current) return

    import('phaser').then((Phaser) => {
      let gameOver = false
      let score = 0
      let scoreText: Phaser.GameObjects.Text
      let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
      let obstacles: Phaser.Physics.Arcade.Group

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: '#000000',
        parent: gameRef.current!,
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: GRAVITY_Y }, debug: false },
        },
        scene: { preload, create, update },
      }

      new Phaser.Game(config)

      function preload(this: Phaser.Scene) {
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png')
        this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png')
        this.load.image('cactus', 'https://labs.phaser.io/assets/sprites/asteroid.png')
        this.load.image('bird', 'https://labs.phaser.io/assets/sprites/asteroid.png')
      }

      function create(this: Phaser.Scene) {
        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'sky')
        const ground = this.add.rectangle(
          GAME_WIDTH / 2,
          GAME_HEIGHT - 10,
          GAME_WIDTH,
          20,
          0x444444
        )
        this.physics.add.existing(ground, true)

        player = this.physics.add.sprite(100, 300, 'player')






        player.setCollideWorldBounds(true)
        player.setBounce(0)
        player.setSize(30, 50).setOffset(5, 5)
        this.physics.add.collider(player, ground)

        // Player jump control
        this.input.keyboard!.on('keydown-SPACE', () => {
          if (player.body.touching.down && !gameOver) {
            player.setVelocityY(JUMP_VELOCITY)
          }
        })

        // Obstacles group
        obstacles = this.physics.add.group({ allowGravity: false, immovable: true })
        this.physics.add.collider(player, obstacles, hitObstacle, undefined, this)

        // Score display
        score = 0
        scoreText = this.add.text(TEXT_POS.x, TEXT_POS.y, 'Score: 0', {
          fontSize: '24px',
          color: '#ffffff',
        })
        this.time.addEvent({ delay: SCORE_INTERVAL, loop: true, callback: () => {
          if (!gameOver) {
            score++
            scoreText.setText(`Score: ${score}`)
          }
        } })

        // Obstacle spawner
        const spawnObstacle = () => {
          if (gameOver) return

          // calculate dynamic interval and speed
          const dynamicInterval = Math.max(
            MIN_SPAWN_INTERVAL,
            INITIAL_SPAWN_INTERVAL - score * (INITIAL_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL) / 1000
          )
          const interval = dynamicInterval + Phaser.Math.Between(0, SPAWN_RANDOM_VARIANCE)
          const speed = -Math.min(SPEED_MAX, SPEED_BASE + score * SPEED_SCALE)

          // choose cactus or bird
          const isBird = Phaser.Math.Between(0, 1) === 1
          const x = GAME_WIDTH + 50
          const y = isBird
            ? Phaser.Math.Between(BIRD_Y_MIN, BIRD_Y_MAX)
            : CACTUS_Y
          const key = isBird ? 'bird' : 'cactus'

          const obs = obstacles.create(x, y, key)
          obs.setSize(OBSTACLE_SIZE.width, OBSTACLE_SIZE.height)
          obs.setVelocityX(speed)

          this.time.delayedCall(interval, spawnObstacle, [], this)
        }
        spawnObstacle()
      }

      function update(this: Phaser.Scene) {
        if (gameOver) return
        obstacles.getChildren().forEach((child) => {
          const spr = child as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
          if (spr.x < -50) obstacles.remove(spr, true, true)
        })
      }

      function hitObstacle(this: Phaser.Scene) {
        gameOver = true
        player.setTint(0xff0000)
        scoreText.setText(`💀 Game Over — Score: ${score}`)
        this.scene.pause()
        setTimeout(() => setShowReplay(true), 500)
      }
    })

    return () => {
      if (gameRef.current) {
        gameRef.current.innerHTML = ''
      }
    }
  }, [replayKey])

  const handleReplay = () => {
    setShowReplay(false)
    setReplayKey((prev) => prev + 1)
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={gameRef} className="w-full h-screen" />
      {showReplay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleReplay}
            className="px-6 py-3 bg-white text-black text-xl rounded-2xl shadow-lg"
          >🔁 Rejouer</button>
        </div>
      )}
    </div>
  )
}
