import Player from "./Player.js";
import SAOLchecker from "./SAOLchecker.js";
export default class Startpage {

  getCurrentPlayerTiles() {
    return $('.stand').children('.tile');
  }

  constructor() {
    this.count = 0;
    this.check = true;
    this.first = 0;
    this.wordVert = '';
    this.wordHoriz = '';
    this.placedTiles = [];
    this.indexholder = [];
    this.wordHolder = [];
    this.scoreHolder = [];
  }

  async start(ammountOfPlayers, playernames) {
    this.createBoard();
    await this.tilesFromFile();
    // console.table is a nice way
    // to log arrays and objects
    console.log(this.board);
    console.table(this.tiles);
    // create players
    this.players = [];
    for (let i = 1; i <= ammountOfPlayers; i++) {
      this.players.push(new Player(this, `${playernames[i - 1]}`));
    }
    console.table(this.players);
    // render the board + players

    let helpBtn = $('<button class="helpBtn">?</button>');
    $('body').append(helpBtn);

    let infoDiv = $('<div class="info-popup"></div>');
    let closePopupBtn = $('<button class="close-info-popup">X</button>');
    let info = $('<p class="paragraph-info">"I spelets första drag måste spelare nummer 1 lägga sitt ord, lodrätt eller vågrätt, så att den mittersta rutan (se bild) på spelplanen täcks. Poängen för ordet räknas samman och förs in i protokollet. När detta är gjort, tar man lika många brickor ur påsen som man lagt ut på spelplanen. Det ska alltid ﬁnnas sex, sju eller åtta brickor på brickstället, beroende på hur ni bestämt från början. Nästa spelare ska lägga ett ord som binds samman med det första, antingen lodrätt eller vågrätt. (Se exempel på sid 4.) De nya bok- stavsbrickorna måste bilda ett komplett ord tillsammans med det som redan ﬁnns på spelplanen. Poängen för ordet räknas samman och förs in i protokollet. "</p>');
    infoDiv.append(closePopupBtn, info);
    $('body').append(infoDiv);

    $('.helpBtn').on('click', function () {
      $('.info-popup').toggle();
    });

    $(closePopupBtn).on('click', function () {
      $('.info-popup').toggle();
    });

    //----------------
    //This part contains logic for "Skapad av" button
    let madeBy = $('<button class = "madeBy">Skapad av</button>');
    $('body').append(madeBy);

    let madeByDiv = $('<div class="madeBy-popup"></div>');
    let whoMadeIt = $('<p class="whoMadeItInfo">"Det här spelet är gjort av Java 2020 grupp2. Medlemmar: Ali, Ermin, Hanan, Jonathan , Lukas och Oscar "</p>');
    madeByDiv.append(whoMadeIt);
    $('body').append(madeByDiv);

    $('.madeBy').on('click', function () {
      $('.madeBy-popup').toggle();
    });

    //------------------


    this.render();
  }

  startPage() {
    let that = this;
    let ammountOfPlayers = 0;
    let playerNames = [];
    let startDiv = $('<div class="startpage"></div>');
    let startTitle = $('<div class="pagetitle"></div>');
    let popmess = $('<div class="popmessage">[Kräver minst 1 spelare för att starta.]</div>');

    startDiv.append(`
    <div class="pagetitle">.</div> 
    <button class="start-button"><h3>Starta Spelet</h3></button>
    <div class="popmessage"></div>
    <div class="rules">
    <h2 class="rules-headline"></h2>
    <p class="text-rules"></p>
    </div>
    <div class="players-menu">
    <input type="text" class="player1" placeholder="spelare 1">
    <input type="text" class="player2" placeholder="spelare 2">
    <input type="text" class="player3" placeholder="spelare 3">
    <input type="text" class="player4" placeholder="spelare 4">
    </div>
    `);


    $('body').append(startTitle);
    $('body').append(startDiv);
    $('.start-button').click(function () {
      for (let i = 0; i < 4; i++) {
        if ($(`.player${i + 1}`).val() === '') {
          $('.popmessage').append(popmess);
        } else {
          playerNames.push($(`.player${i + 1}`).val());
          ammountOfPlayers++;
        }
      }
      if (ammountOfPlayers !== 0) {
        that.start(ammountOfPlayers, playerNames);

        $('.pagetitle').hide();
        $('.startpage').hide();




      }
    });
  }

  createBoard() {

    let middle = [[7, 7]];
    let indexRed = [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]];
    let indexLightBlue = [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [7, 3], [7, 11], [8, 2], [8, 6],
    [8, 8], [8, 12], [6, 8], [6, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]];
    let indexOrange = [[1, 1], [1, 13], [2, 2], [3, 3], [4, 4], [11, 3], [11, 11], [12, 2], [13, 1], [2, 12], [3, 11], [4, 10], [10, 10], [12, 12], [13, 13], [10, 4]];
    let indexBlue = [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [13, 5], [13, 9], [9, 13]];

    this.board = [...new Array(15)].map(x => [...new Array(15)].map(x => ({})));

    middle.forEach(([x, y]) => this.board[x][y].special = 'middle');
    indexRed.forEach(([x, y]) => this.board[x][y].special = 'red');
    indexLightBlue.forEach(([x, y]) => this.board[x][y].special = 'lightblue');
    indexOrange.forEach(([x, y]) => this.board[x][y].special = 'orange');
    indexBlue.forEach(([x, y]) => this.board[x][y].special = 'blue');

  }

  async tilesFromFile() {
    this.tiles = [];
    // Read the tile info from file
    (await $.get('tiles.txt'))
      .split('\r').join('') // Windows safe :)
      .split('\n').forEach(x => {
        // For each line split content by ' '
        // x[0] = char, x[1] = points, x[2] = occurences
        x = x.split(' ');
        x[0] = x[0] === '_' ? ' ' : x[0];
        // add tiles to this.tiles
        while (x[2]--) {
          this.tiles.push({ char: x[0], points: +x[1] })
        }
      });
    // Shuffle in random order
    this.tiles.sort(() => Math.random() - 0.5);
  }

  getTiles(howMany = 7) {
    // Return a number of tiles (and remove from this.tiles)
    return this.tiles.splice(0, howMany);
  }

  render() {
    $('.board, .players, .next, .swap').remove();
    let $board = $('<div class="board"/>').appendTo('body');
    let $players = $('<div class="players"/>').appendTo('body');
    // Render the board
    // (will be more code when we know how to represent 
    //  the special squares)
    $board.html(this.board.flat().map(x => `
    <div class="${x.special ? 'special-' + x.special : ''}">
    ${x.tile ? `<div class="tile">${x.tile.char}</div>` : ''}
    </div>
    `).join(''));


    // Render the players
    let that = this;
    $('.players').append(`<div class="players-point"> ★ poäng: ${this.players[this.count].points}</div>`);
    $players.append(this.players[this.count].render());
    $('body').append('<button class="pass">Passa</button>');
    $('.pass').click(function () {
      if (that.players[that.count].tiles.length === 7) {
        $('.players').empty();
        that.count++;
        if (that.count === that.players.length) { that.count = 0 }
        $('.players').append(`<div class="players-point"> ★ poäng: ${that.players[that.count].points}</div>`);
        $players.append(that.players[that.count].render());
        that.addEvents();
      } else {
        that.players[that.count].tiles.push(...that.placedTiles);
        that.placedTiles = [];

        that.indexholder.forEach(([a, b]) => that.board[a][b].tile = '');
        that.render();
      }
    });


    $('body').append('<button class="next">Spela drag</button>');
    $('.next').click(async function () {
      that.collectWordVert();
      that.collectWord();
      that.makeCollectedWordsToArray(that.wordHoriz, that.wordVert);
      let valid = await SAOLchecker.scrabbleOk(that.wordHolder[that.wordHolder.length - 1]);
      Promise.resolve(valid);
      if (that.board[7][7].tile !== undefined && that.check === true && valid) {
        let points = 0;
        that.scoreHolder.forEach(x => points += (x + 0));
        that.players[that.count].points += points;
        that.players[that.count].pushTiles(that.placedTiles.length);
        $('.players').empty();
        that.placedTiles = [];
        that.indexholder = [];
        that.scoreHolder = [];
        that.wordHoriz = '';
        that.wordVert = '';
        that.count++;
        if (that.count === that.players.length) {
          that.count = 0;
        }
        $('.players').append(`<div class="players-point">poäng: ${that.players[that.count].points}</div>`);
        $players.append(that.players[that.count].render());
        that.addEvents();
      }
    });


    $('body').append('<button class="swap">Byt ut</button>');
    $('.swap').click(function () {
      // Fuction for swap tiles that you placed on board. They will be removed and you will get new ones. 
    });

    /* let currentPlayerTiles = $('.stand').children('.tile').text();
    console.log(currentPlayerTiles); */

    $('body').append('<button class="undo-btn">Ångra</div>');

    $('.undo-btn').click(function () {
      if (that.placedTiles.length !== 0) {
        that.players[that.count].tiles.push(...that.placedTiles);
        that.placedTiles = [];
        that.scoreHolder = [];
        that.indexholder.forEach(([a, b]) => that.board[a][b].tile = '');
        //that.board[that.indexholder[0][0]][that.indexholder[0][1]].tile = '';
        that.render();
      }
    });

    this.addEvents();
  }

  checkIfDraggedWithinStand($draggedTile) {
    // Find the stand that is a parent element of the dragged tile
    let $stand = $draggedTile.parents('.stand');
    // Get the top and left corner of the dragged tile - remember as y and x
    let { left: x, top: y } = $draggedTile.offset();
    // Get the top, left, bottom, right positions of the stand
    let { top: standTop, left: standLeft } = $stand.offset();
    let standBottom = standTop + $stand.outerHeight();
    let standRight = standLeft + $stand.outerWidth();
    // Checked if the dragged tile is within the stands coordinates
    let posWithinStand = y >= standTop && y <= standBottom && x >= standLeft && x <= standRight; // true/false
    // If not do nothing more
    if (!posWithinStand) { return; }
    // Get all tiles in the stand (divs in the DOM)
    let $tiles = $stand.find('.tile');
    // Get the real tile array with objects from the player
    let tileArr = this.players[this.count].tiles;
    // The tile divs in the DOM and the tileArr have the same corresponding order
    // now loop through every tile div and add the property left to the real objects in tileArr
    $tiles.each(function (i) {
      tileArr[i].left = $(this).offset().left;
    });
    // Sort the tileArr according to the left property
    tileArr.sort((a, b) => a.left > b.left ? 1 : - 1);
    // Remove the left property from the objects in tileArr
    // we only needed it for sorting...
    tileArr.forEach(x => delete x.left);
  }



  addEvents() {
    let currentPlayerTiles = this.getCurrentPlayerTiles();
    //console.log(currentPlayerTiles);
    /* let currentPlayerTiles = $('.stand').children('.tile');
    console.log(this.players[this.count].name + currentPlayerTiles); */
    let that = this;
    // Set a css-class hover on the square the mouse is above
    // if we are dragging and there is no tile in the square
    $('.board > div').mouseenter(e => {
      let me = $(e.currentTarget);
      if ($('.is-dragging').length && !me.find('.tile').length) {
        me.addClass('hover')
      }
    });
    $('.board > div').mouseleave(e =>
      $(e.currentTarget).removeClass('hover')
    );

    // Drag-events: We only check if a tile is in place on dragEnd
    $('.stand > .tile').draggabilly().on('dragEnd', e => {

      // check if drag within stand
      this.checkIfDraggedWithinStand($(e.currentTarget));

      // get the dropZone square - if none render and return
      let $dropZone = $('.hover');
      if (!$dropZone.length) { this.render(); return; }

      // the index of the square we are hovering over
      let squareIndex = $('.board > div').index($dropZone);

      // convert to y and x coords in this.board
      let y = Math.floor(squareIndex / 15);
      let x = squareIndex % 15;

      // the index of the chosen tile
      let $tile = $(e.currentTarget);
      let tileIndex = $('.stand > div').index($tile);

      // put the tile on the board and re-render
      if ($tile.parent('.stand').length) {
        let holder = this.players[that.count].tiles.splice(tileIndex, 1)[0];
        this.board[y][x].tile = holder;
        this.placedTiles.push(holder);
        this.scoreHolder.push(holder.points);
        this.indexholder.push([y, x]);

        that.check = true;
        for (let i = 0; i < that.board.length; i++) {
          for (let j = 0; j < that.board.length; j++) {
            if (i === 0 || i === 14 || j === 0 || j === 14) { continue; }
            if (that.board[i][j].tile !== undefined) {
              if (that.board[i + 1][j].tile === undefined && that.board[i][j + 1].tile === undefined &&
                that.board[i][j - 1].tile === undefined && that.board[i - 1][j].tile === undefined && that.first !== 0) {
                that.check = false;
              }
            }
          }
        }

      }
      this.render();
      that.first++;
    });
  }

  collectWord() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j].tile !== undefined) {
          if (this.board[i][j + 1].tile === undefined) {
            if (this.board[i][j - 1].tile === undefined) { }
            else {
              this.wordHoriz += this.board[i][j].tile.char + ',';
            }
          } else { this.wordHoriz += this.board[i][j].tile.char; }
        }
      }
    }
  }

  collectWordVert() {
    for (let j = 0; j < this.board.length; j++) {
      for (let i = 0; i < this.board.length; i++) {
        if (this.board[i][j].tile !== undefined) {
          if (this.board[i + 1][j].tile === undefined) {
            if (this.board[i - 1][j].tile === undefined) { }
            else {
              this.wordVert += this.board[i][j].tile.char + ',';
            }
          } else {
            this.wordVert += this.board[i][j].tile.char;
          }
        }
      }
    }
  }

  makeCollectedWordsToArray(x, y) {

    if (x.length !== 0) {
      let a = x.split(',');
      this.wordHolder.push(...a);
    }
    if (y.length !== 0) {
      let b = y.split(',');
      this.wordHolder.push(...b);
    }
    for (let i = 0; i < this.wordHolder.length; i++) {
      if (this.wordHolder[i].length === 0) {
        this.wordHolder.splice(i, 1);
      }
    }

  }

}