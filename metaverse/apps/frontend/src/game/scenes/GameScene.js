import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.ws = null;
    this.spaceId = null;
    this.player = null;
    this.users = new Map();
    this.cursors = null;
  }

  preload() {
    this.load.tilemapTiledJSON('map_json', '/src/assets/MetaSpace_map1.json');
    this.load.image('Metaspace-tileset', '/src/assets/Metaspace-tileset.png');
    this.load.image('Metaspace-Interirors', '/src/assets/Metaspace-Interirors.png');
    this.load.image('Collision-tileset', '/src/assets/Collision-tileset.png');
    this.load.spritesheet('avatar', '/src/assets/Adam_idle_16x16.png', {
      frameWidth: 16,
      frameHeight: 32
    });
  }

  create() {
    this.spaceId = this.game.registry.get('spaceId');
    this.physics.world.setBounds(0, 0, 3200, 3200);

    this.ws = new WebSocket('ws://localhost:3001');

    const map = this.make.tilemap({ key: 'map_json' });
    const metaspaceTileset = map.addTilesetImage('Metaspace-tileset', 'Metaspace-tileset');
    const interiorsTileset = map.addTilesetImage('Metaspace-Interirors', 'Metaspace-Interirors');
    const collisionTileset = map.addTilesetImage('Collision-tileset', 'Collision-tileset');

    if (!metaspaceTileset || !interiorsTileset || !collisionTileset) {
      console.error('Failed to load tilesets');
      return;
    }

    const tileset = [metaspaceTileset, interiorsTileset, collisionTileset];
    const floorLayer      = map.createLayer('Floor',      tileset, 0, 0);
    const floorPlanLayer  = map.createLayer('Floor Plan', tileset, 0, 0);
    const furnitureLayer1 = map.createLayer('Furniture 1', tileset, 0, 0);
    const furnitureLayer2 = map.createLayer('Furniture 2', tileset, 0, 0);
    const furnitureLayer3 = map.createLayer('Furniture 3', tileset, 0, 0);
    const collisionLayer  = map.createLayer('Collision',   tileset, 0, 0);
    const foregroundLayer = map.createLayer('Foreground',  tileset, 0, 0);

    [floorLayer, floorPlanLayer, furnitureLayer1, furnitureLayer2, furnitureLayer3, collisionLayer, foregroundLayer]
      .forEach(layer => layer && layer.setScale(4));

    if (collisionLayer) {
      collisionLayer.setCollisionByExclusion([-1]);
      collisionLayer.setVisible(false);
    }

    this.player = this.physics.add.sprite(100, 100, 'avatar', 3);
    this.player.setScale(4);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setSize(14, 16);
    this.player.body.setOffset(1, 16);

    if (collisionLayer) {
      this.physics.add.collider(this.player, collisionLayer, undefined, undefined, this);
    }

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels * 4, map.heightInPixels * 4);

    this.cursors = this.input.keyboard.createCursorKeys();

    if (foregroundLayer) {
      foregroundLayer.setDepth(1);
    }

    this.setupWebSocket();
    window.addEventListener('beforeunload', () => this.cleanup());
  }

  setupWebSocket() {
    this.ws.onopen = () => {
      console.log('Connected to WebSocket');
      this.ws.send(JSON.stringify({
        type: 'join',
        payload: { spaceId: this.spaceId }
      }));
    };
    this.ws.onmessage = event => this.handleServerMessages(event);
  }

  getDirectionFrame(currentPos, lastPos) {
    const dx = currentPos.x - lastPos.x;
    const dy = currentPos.y - lastPos.y;
    const threshold = 1;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      return -1;
    } else if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 0 : 2;
    } else {
      return dy > 0 ? 3 : 1;
    }
  }

  cleanup() {
    this.users.forEach((_, userId) => this.removeUser(userId));
    this.users.clear();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'leave',
        payload: { spaceId: this.spaceId }
      }));
      this.ws.close();
    }
  }

  handleServerMessages(event) {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'space-joined': {
        console.log('space-joined');
        const { spawn, users: usersList } = message.payload;
        this.player.setPosition(spawn.x * 16, spawn.y * 16);
        usersList.forEach(user => {
          if (user.id) this.addUser(user.id, user.x, user.y);
        });
        break;
      }
      case 'user-joined': {
        const { userId, x, y } = message.payload;
        this.addUser(userId, x, y);
        console.log(`New User ${userId} joined the space`);
        break;
      }
      case 'move': {
        const { userId: movingUserID, x: newX, y: newY } = message.payload;
        const userData = this.users.get(movingUserID);
        if (userData) {
          const newPos = { x: newX * 16, y: newY * 16 };
          const frame = this.getDirectionFrame(newPos, userData.lastPosition);
          userData.sprite.setPosition(newPos.x, newPos.y);
          userData.sprite.setFrame(frame);
          userData.lastPosition = newPos;
        }
        break;
      }
      case 'user-left': {
        const { userId: leavingUserID } = message.payload;
        this.removeUser(leavingUserID);
        console.log(`User ${leavingUserID} left.`);
        break;
      }
      case 'proximity-group-update': {
        const { groupId, token, members, action } = message.payload;
        console.log(`Proximity group update: ${action}, token: ${token}, groupId: ${groupId}, members: ${members}`);
        localStorage.setItem('proximityToken', token);
        window.dispatchEvent(new CustomEvent('proximity-group-update', {
          detail: { token, groupId, members, action }
        }));
        break;
      }
    }
  }

  addUser(userId, x, y) {
    if (this.users.has(userId)) return;
    console.log(`Adding Sprite for User ${userId} at ${x}, ${y}`);
    const userSprite = this.physics.add.sprite(x * 16, y * 16, 'avatar', 3);
    userSprite.setScale(4);
    userSprite.setCollideWorldBounds(true);
    userSprite.setBounce(0);
    userSprite.setSize(14, 16);
    userSprite.setOffset(1, 16);
    this.users.set(userId, {
      sprite: userSprite,
      lastPosition: { x: x * 16, y: y * 16 }
    });
  }

  removeUser(userId) {
    const userData = this.users.get(userId);
    if (userData) {
      userData.sprite.destroy();
      this.users.delete(userId);
      console.log(`User ${userId} left the space`);
    }
  }

  update() {
    if (!this.cursors || !this.player) return;
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX = -speed;
      this.player.setFrame(2);
    } else if (this.cursors.right.isDown) {
      velocityX = speed;
      this.player.setFrame(0);
    }

    if (this.cursors.up.isDown) {
      velocityY = -speed;
      this.player.setFrame(1);
    } else if (this.cursors.down.isDown) {
      velocityY = speed;
      this.player.setFrame(3);
    }

    this.player.setVelocity(velocityX, velocityY);

    if (velocityX !== 0 || velocityY !== 0) {
      this.ws.send(JSON.stringify({
        type: 'move',
        payload: {
          x: this.player.x / 16,
          y: this.player.y / 16
        }
      }));
    }
  }
}