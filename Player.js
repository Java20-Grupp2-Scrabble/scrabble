export default class Player {

  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.tiles = [...this.game.getTiles()];
    this.points = 0;
  }

  blankTile(ch, tileIndex) {

    let tile = {
      char: ch.toLowerCase(),
      points: '0'
    }

    this.tiles.splice(tileIndex, 1, tile);
  }

  getCurrentTiles() {
    return this.tiles;
  }

  pushTiles(x) {
    this.tiles.push(...this.game.getTiles(x));
    this.render();
  }

  render() {
    let that = this;
    return `<div class="stand">
      ${this.tiles.map((x, i) =>
      `<div 
          class="tile${x.char === ' ' ? 'blank' : ''}"
          class="tile ${x.char ? '' : 'none'}"
          data-player="${this.game.players.indexOf(this)}"
          data-tile="${i}"
          data-points="${that.points}"
        >
        ${x.char.toUpperCase() || ''}
        <span>${x.points || ''}</span>
      </div>`).join('')}
      </div>
      <div class="pname">👤 ${this.name}</div>
      `;
  }
}