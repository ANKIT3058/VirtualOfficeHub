import Phaser from 'phaser'

// import { debugDraw } from '../utils/debug'
// import { createCharacterAnims } from '../anims/CharacterAnims'

// import Item from '../items/Item'
// import Chair from '../items/Chair'
// import Computer from '../items/Computer'
// import Whiteboard from '../items/Whiteboard'
// import VendingMachine from '../items/VendingMachine'
// import '../characters/MyPlayer'
// import MyPlayer from '../characters/MyPlayer'
// import PlayerSelector from '../characters/PlayerSelector'
// import { PlayerBehavior } from '../../../types/PlayerBehavior'
// import { ItemType } from '../../../types/Items'

// import store from '../stores'
// import { setFocused, setShowChat } from '../stores/ChatStore'
import { NavKeys, Keyboard } from '../../../types/KeyboardState'

export default class Game extends Phaser.Scene {
  private cursors!: NavKeys
  private keyE!: Phaser.Input.Keyboard.Key
  private keyR!: Phaser.Input.Keyboard.Key
  private map!: Phaser.Tilemaps.Tilemap
  // myPlayer: MyPlayer | null = null
  // private playerSelector!: Phaser.GameObjects.Zone
  // computerMap = new Map<string, Computer>()
  // private whiteboardMap = new Map<string, Whiteboard>()

  private enablePlayer = false // Set this to false to disable player rendering

  constructor() {
    super('game')
  }

  // registerKeys() {
  //   this.cursors = {
  //     ...this.input.keyboard.createCursorKeys(),
  //     ...(this.input.keyboard.addKeys('W,S,A,D') as Keyboard),
  //   }

  //   this.keyE = this.input.keyboard.addKey('E')
  //   this.keyR = this.input.keyboard.addKey('R')

  //   this.input.keyboard.disableGlobalCapture()
  //   this.input.keyboard.on('keydown-ENTER', () => {
  //     // store.dispatch(setShowChat(false))
  //   })
  //   this.input.keyboard.on('keydown-ESC', () => {
  //     // store.dispatch(setShowChat(false))
  //   })
  // }

  // disableKeys() {
  //   this.input.keyboard.enabled = false
  // }

  // enableKeys() {
  //   this.input.keyboard.enabled = true
  // }

  create() {
    // createCharacterAnims(this.anims)

    this.map = this.make.tilemap({ key: 'tilemap' })
    const FloorAndGround = this.map.addTilesetImage('FloorAndGround', 'tiles_wall')
    const groundLayer = this.map.createLayer('Ground', FloorAndGround)
    // groundLayer.setCollisionByProperty({ collides: true })

    // if (this.enablePlayer) {
    //   this.myPlayer = this.add.myPlayer(705, 500, 'adam', 'player1')
    //   this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16)
    //   this.cameras.main.startFollow(this.myPlayer, true)
    // }

    // Chairs
    // const chairs = this.physics.add.staticGroup({ classType: Chair })
    // const chairLayer = this.map.getObjectLayer('Chair')
    // chairLayer.objects.forEach((obj) => {
    //   const item = this.addObjectFromTiled(chairs, obj, 'chairs', 'chair') as Chair
    //   item.itemDirection = obj.properties[0].value
    // })

    // Computers
    // const computers = this.physics.add.staticGroup({ classType: Computer })
    // const computerLayer = this.map.getObjectLayer('Computer')
    // computerLayer.objects.forEach((obj, i) => {
    //   const item = this.addObjectFromTiled(computers, obj, 'computers', 'computer') as Computer
    //   item.setDepth(item.y + item.height * 0.27)
    //   const id = `${i}`
    //   item.id = id
    //   this.computerMap.set(id, item)
    // })

    // Whiteboards
    // const whiteboards = this.physics.add.staticGroup({ classType: Whiteboard })
    // const whiteboardLayer = this.map.getObjectLayer('Whiteboard')
    // whiteboardLayer.objects.forEach((obj, i) => {
    //   const item = this.addObjectFromTiled(whiteboards, obj, 'whiteboards', 'whiteboard') as Whiteboard
    //   const id = `${i}`
    //   item.id = id
    //   this.whiteboardMap.set(id, item)
    // })

    // Vending machines
    // const vendingMachines = this.physics.add.staticGroup({ classType: VendingMachine })
    // const vendingMachineLayer = this.map.getObjectLayer('VendingMachine')
    // vendingMachineLayer.objects.forEach((obj) => {
    //   this.addObjectFromTiled(vendingMachines, obj, 'vendingmachines', 'vendingmachine')
    // })

    // Other objects
    this.addGroupFromTiled('Wall', 'tiles_wall', 'FloorAndGround', false)
    this.addGroupFromTiled('Objects', 'office', 'Modern_Office_Black_Shadow', false)
    this.addGroupFromTiled('ObjectsOnCollide', 'office', 'Modern_Office_Black_Shadow', true)
    this.addGroupFromTiled('GenericObjects', 'generic', 'Generic', false)
    this.addGroupFromTiled('GenericObjectsOnCollide', 'generic', 'Generic', true)
    this.addGroupFromTiled('Basement', 'basement', 'Basement', true)

    this.cameras.main.zoom = 1.5

    // if (this.myPlayer) {
    //   this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], groundLayer)
    //   this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], vendingMachines)

    //   this.physics.add.overlap(
    //     this.playerSelector,
    //     [chairs, computers, whiteboards, vendingMachines],
    //     this.handleItemSelectorOverlap,
    //     undefined,
    //     this
    //   )
    // }

    // this.registerKeys()
  }

  private handleItemSelectorOverlap(playerSelector, selectionItem) {
    const currentItem = playerSelector.selectedItem as Item
    if (currentItem) {
      if (currentItem === selectionItem || currentItem.depth >= selectionItem.depth) return
      if (this.myPlayer?.playerBehavior !== PlayerBehavior.SITTING) currentItem.clearDialogBox()
    }
    playerSelector.selectedItem = selectionItem
    selectionItem.onOverlapDialog()
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    const actualX = object.x! + object.width! * 0.5
    const actualY = object.y! - object.height! * 0.5
    const obj = group
      .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
      .setDepth(actualY)
    return obj
  }

  // private addGroupFromTiled(
  //   objectLayerName: string,
  //   key: string,
  //   tilesetName: string,
  //   collidable: boolean
  // ) {
  //   const group = this.physics.add.staticGroup()
  //   const objectLayer = this.map.getObjectLayer(objectLayerName)
  //   objectLayer.objects.forEach((object) => {
  //     const actualX = object.x! + object.width! * 0.5
  //     const actualY = object.y! - object.height! * 0.5
  //     group
  //       .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
  //       .setDepth(actualY)
  //   })
  //   if (this.myPlayer && collidable)
  //     this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], group)
  // }

  // useComputer(computerId: string) {
  //   const computer = this.computerMap.get(computerId)
  //   if (computer) {
  //     computer.addCurrentUser('player1')
  //   }
  // }

  // useWhiteboard(whiteboardId: string) {
  //   const whiteboard = this.whiteboardMap.get(whiteboardId)
  //   if (whiteboard) {
  //     whiteboard.addCurrentUser('player1')
  //   }
  // }

  // update(t: number, dt: number) {
  //   if (this.myPlayer) {
  //     this.playerSelector.update(this.myPlayer, this.cursors)
  //     this.myPlayer.update(this.playerSelector, this.cursors, this.keyE, this.keyR)
  //   }
  // }
}
