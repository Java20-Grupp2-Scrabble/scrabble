import Player from "./Player.js";
import SAOLchecker from "./SAOLchecker.js";
export default class Startpage {

  constructor() {
    this.count = 0;
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

    $('.helpBtn').on('click', function(){
      $('.info-popup').toggle();
    });

    $(closePopupBtn).on('click', function(){
      $('.info-popup').toggle();
    });

    this.render();
  }

  startPage() {
    let that = this;
    let ammountOfPlayers = 0;
    let playerNames = [];
    let startDiv = $('<div class="startpage"></div>');
    let startTitle = $('<div class="pagetitle"></div>');
    let popmess = $('<div class="popmessage">[Requires minimum of 1 player to start.]</div>');

    startDiv.append(`
    <div class="pagetitle">.</div> 
    <button class="start-button"><h3>Start Game</h3></button>
    <div class="popmessage"></div>
    <div class="rules">
    <h2 class="rules-headline"></h2>
    <p class="text-rules"></p>
    </div>
    <div class="players-menu">
    <input type="text" class="player1" placeholder="player1">
    <input type="text" class="player2" placeholder="player2">
    <input type="text" class="player3" placeholder="player3">
    <input type="text" class="player4" placeholder="player4">
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
        $('body > background-image:').hide();




      }
    });
  }

  createBoard() {
    // note: the real board has a lot of special squares
    // and is symmetrical - maybe we could generate it from a file
    // with data about the squares?

    // but for now just make an two-dimensional array
    // with the same object values for each item
    this.board = [...new Array(15)].map(x => new Array(15).fill({
      specialValue: '2w', // might be 3w or 2l or 3l or center as well
      // (2w = 2x word points, 2l = 2 x letters etc)
      // you need different values for diffrent squares
      // - not implemented yet ;)
      tile: undefined     // replace with a tile object when it is
      // is dragged to the square
      // - not implemented yet ;)
    }));
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
    let index = 0;
    let indexRed = [0, 7, 14, 105, 217, 119, 210, 224];
    let indexLightBlue = [3, 11, 36, 38, 52, 45, 59, 92, 102, 108, 116, 122, 132,
      126, 128, 98, 96, 165, 179, 172, 186, 188, 213, 221];
    let indexOrange = [16, 32, 48, 64, 160, 176, 192, 208, 28, 42, 56, 70, 154, 168, 182, 196];
    let indexBlue = [20, 24, 76, 80, 84, 88, 140, 144, 148, 200, 204, 136];
    $('.board, .players').remove();
    let $board = $('<div class="board"/>').appendTo('body');
    let $players = $('<div class="players"/>').appendTo('body');
    // Render the board
    // (will be more code when we know how to represent 
    //  the special squares)
    this.board.flat().forEach(x =>
      $board.append(`<div class="squares" data-index="${index++}"></div>`));

    this.board.flat().forEach(function (x, i) {
      if (indexRed.includes(i)) {
        $(`div[data-index = ${i}]`).append('3x W');
      }
      if (indexLightBlue.includes(i)) {
        $(`div[data-index = ${i}]`).append('2x L');
      }
      if (indexOrange.includes(i)) {
        $(`div[data-index = ${i}]`).append('2x W');
      }
      if (indexBlue.includes(i)) {
        $(`div[data-index = ${i}]`).append('3x L');
      }
    });

    // Render the players
    let that = this;
    $('.players').append(`<div class="players-point">points:, ${this.players[this.count].points}</div>`);
    $players.append(this.players[this.count].render());
    $('body').append('<button class="next">Play move</button>');
    $('.next').click(function () {
      $('.players').empty();
      that.count++;
      if (that.count === that.players.length) {
        that.count = 0;
      }
      $('.players').append(`<div class="players-point">points:, ${that.players[that.count].points}</div>`);
      $players.append(that.players[that.count].render());
      that.addDragEvents();
    });
    this.addDragEvents();
  }

  addDragEvents() {
    let that = this;
    // let tile in the stands be draggable
    $('.stand .tile').not('.none').draggabilly({ containment: 'body' })
      .on('dragStart', function () {
        // set a high z-index so that the tile being drag
        // is on top of everything  
        $(this).css({ zIndex: 100 });
      })
      .on('dragMove', function (e, pointer) {
        let { pageX, pageY } = pointer;



        for (let i = 0; i <= 224; i++) {
          if (Math.floor($(this).offset().left) <= Math.floor($(`.squares[data-index = ${i}]`).offset().left) &&
            Math.floor($(this).offset().left) >= Math.floor($(`.squares[data-index = ${i}]`).offset().left) &&
            Math.floor($(this).offset().top) >= Math.floor($(`.squares[data-index = ${i}]`).offset().top) &&
            Math.floor($(this).offset().top) <= Math.floor($(`.squares[data-index = ${i}]`).offset().top)) {
            $(`.squares[data-index = ${i}]`).css("background-color", "seagreen");
          }
        }

        // we will need code that reacts
        // if you have moved a tile to a square on the board
        // (light it up so the player knows where the tile will drop)
        // but that code is not written yet ;)

      })
      .on('dragEnd', function (e, pointer) {
        let { pageX, pageY } = pointer;
        let me = $(this);

        // reset the z-index
        me.css({ zIndex: '' });

        let player = that.players[+me.attr('data-player')];
        let tileIndex = +me.attr('data-tile');
        let tile = player.tiles[tileIndex];

        // we will need code that reacts
        // if you have moved a tile to a square on the board
        // (add the square to the board, remove it from the stand)
        // but that code is not written yet ;)
        // but we do have the code that let you
        // drag the tiles in a different order in the stands
        let $stand = me.parent('.stand');
        let { top, left } = $stand.offset();
        let bottom = top + $stand.height();
        let right = left + $stand.width();
        // if dragged within the limit of the stand
        if (pageX > left && pageX < right
          && pageY > top && pageY < bottom) {
          let newIndex = Math.floor(8 * (pageX - left) / $stand.width());
          let pt = player.tiles;
          // move around
          pt.splice(tileIndex, 1, ' ');
          pt.splice(newIndex, 0, tile);
          //preserve the space where the tile used to be
          while (pt.length > 8) { pt.splice(pt[tileIndex > newIndex ? 'indexOf' : 'lastIndexOf'](' '), 1); }
        }
        that.render();


      });
  }

}