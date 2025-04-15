/**
 * @typedef {Object} PlayerState
 * @property {string} id
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} GameState
 * @property {Map<string, PlayerState>} players
 */

/**
 * @typedef {Object} GameConfig
 * @property {string} spaceId
 * @property {string} userId
 */

/**
 * @typedef {'join'|'move'|'user-joined'|'user-left'|'space-joined'|'proximity-group-update'} WSMessageType
 */

/**
 * @typedef {Object} WSMessage
 * @property {WSMessageType} type
 * @property {*} payload
 */