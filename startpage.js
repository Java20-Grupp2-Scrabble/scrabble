import Player from "./Player.js";
import SAOLchecker from "./SAOLchecker.js";
import Multiplayer from './Multiplayer.js';
import Store from 'https://network-lite.nodehill.com/store';

window.game = new Multiplayer();

export default class Startpage {

  getCurrentPlayerTiles() {
    return $('.stand').children('.tile');
  }


  constructor() {
    //localStorage.clear()
    this.firstEnd = true;
    this.check = true;
    this.test = true;
    this.first = 0;
    this.valid = false;
    this.checker = true;
    this.firstRound = true;
    this.join = true;
    this.zeroHolder = [];
    this.validAmount = ['2', '3', '4'];
    this.validLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
      'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'];
  }

  async start(ammountOfPlayers, playernames) {
    this.validTiles = true;
    this.correctIndexHolder = [];
    this.placedTiles = [];
    this.indexholder = [];
    this.wordVert = '';
    this.wordHoriz = '';
    this.wordHolder = [];
    //this.createBoard();
    await this.tilesFromFile();

    this.players = [];
    for (let i = 1; i <= +ammountOfPlayers; i++) {
      this.players.push(new Player(this, `${playernames[i - 1].name}`));
    }
    //this.networkStore.players = this.players;

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
    let whoMadeIt = $('<p class="whoMadeItInfo">"Det här spelet är gjort av Java 2020 grupp2. Medlemmar: Ali, Ermin, Hanan, Jonathan , Lukas, Edvin och Oscar "</p>');
    madeByDiv.append(whoMadeIt);
    $('body').append(madeByDiv);

    $('.madeBy').on('click', function () {
      $('.madeBy-popup').toggle();
    });

    //------------------


    this.render();
  }

  startPage() {
    // Get the localStore (an object that survives between page loads)
    this.localStore = Store.getLocalStore();
    let that = this;
    let ammountOfPlayers = 0;
    let playerNames = [];
    let startDiv = $('<div class="startpage"></div>');
    let startTitle = $('<div class="pagetitle"></div>');
    let popmess = $('<div class="popmessage">[Kräver minst 1 spelare för att starta.]</div>');


    startDiv.append(`
  <ul class="lightrope">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>

    <div class="pagetitle">.</div> 
    <button class="start-button"><p class="textInButton">Starta spelet</p></button>
    <button class="connect-btn">Anslut till spel</button>
    <div class="popmessage"></div>
    <div class="rules"> 
    <h2 class="rules-headline"></h2>
    <p class="text-rules">
    <p class="nrOne">Fyll in namn:</p>
    
    </p>
    <div class="players-menu">
    <input type="text" class="player1" placeholder="Namn">
    </div>
    </div>
    `);



    $('body').append('<footer class="footer"> &copy; 2020 - Made by Grupp 2 (Lunds Teknikhögskola)</footer>');
    $('body').append(startTitle);
    $('body').append(startDiv);

    $('.start-button').click(function () {

      if ($('.player1').val() === '') { return; }
      $('.nrOne').hide();
      $('.text-rules').append('<p class="nrTwo">Fyll in 2-4 spelare:</p>');
      $('.connect-btn').prop('disabled', true);
      $('.start-button').prop('disabled', true);
      $('.players-menu').append(`<input type="text" class="ammountOfPlayers" placeholder="Antal Spelare">`);
      $('.players-menu').append(`<button class="confirm">Bekräfta</button>`);
      $('.confirm').click(async function () {
        $('.nrTwo').hide();
        let playerAmmount = $('.ammountOfPlayers').val();
        if (!that.validAmount.includes(playerAmmount)) {
          $('.text-rules').append('<p class="nrTwo">Fyll in 2-4 spelare:</p>');
          return;
        } else {

          that.localStore.networkKey = await Store.createNetworkKey();
          $('.players-menu').append(`<p class="showKey">Ge följande nyckel:  <span>${that.localStore.networkKey}</span></p>`);
          $('.confirm').prop('disabled', true);
          $('.textInButton').text('Väntar på andra spelare...');
          $('body').append('<div class="progress container"><span>V</span ><span>ä</span><span>n</span><span>t</span><span>a</span><span>r</span> &nbsp; <span>p</span><span>å</span> &nbsp; <span>s</span ><span>p</span><span>e</span><span>l</span><span>a</span><span>r</span><span>e</span> </div >');
          that.connectToGame(playerAmmount);
        }
      });
    });

    $('.connect-btn').click(function () {
      if ($('.player1').val() === '') { return; }
      $('.text-rules').append('<p class="nrThree">Fyll in nyckeln:</p>');
      $('.nrOne').hide();
      $('.start-button').prop('disabled', true);
      $('.connect-btn').prop('disabled', true);
      $('.players-menu').append(`<input type="text" class="keyInput" placeholder="Nyckel"></input>`);
      $('.players-menu').append(`<button class="confirmKey">Bekräfta</button>`);
      $('.confirmKey').click(function () {
        if ($('.keyInput').val() !== '') {
          that.localStore.networkKey = $('.keyInput').val();
          that.connectToGame();
        } else {
          $('.connect-btn').text('Fel nyckel...');
        }
      })

    });

  }

  // DIN  TUR LOADING:  $('body').append('<div><div class="loader"></div>');

  async connectToGame(howManyPlayers) {
    // The network key we have in our localStore
    let key = this.localStore.networkKey;
    // Get the network store 
    // and setup a listener to changes from others
    // (an object shared between all clients in the network)
    this.networkStore = await Store.getNetworkStore(key, () => {
      // listener on changes from others in the network
      if (this.networkStore.players.length + '' === howManyPlayers + '' && this.test) {
        $('.pagetitle').hide();
        $('.startpage').hide();
        $('.key').hide();
        $('.progress').hide();
        this.test = false;
        this.start(howManyPlayers, this.networkStore.players);
      } else if (this.networkStore.players.length + '' === howManyPlayers + '') {
        this.render();
      }
    });

    if (howManyPlayers) {
      this.networkStore.howManyPlayers = howManyPlayers;
      this.createBoard();

    } else {
      howManyPlayers = this.networkStore.howManyPlayers;
    }
    this.count = 0;
    // If there is not a players property in the networkStore then create it
    if (!this.networkStore.players) {
      this.networkStore.players = [];
    }

    // EXEMPEL
    this.name = $('.player1').val();
    this.playerIndex = this.networkStore.players.length;
    this.networkStore.players.push({ name: this.name, points: 0 });
    this.networkStore.passCounter = 0;
    this.networkStore.currentPlayer = 0;
    this.networkStore.oldWords = [];
    this.networkStore.tiles = [];
    this.networkStore.wordHolder = [];
    this.networkStore.newNew = [];
    this.networkStore.wordVert = [];
    this.networkStore.wordHoriz = [];
    this.networkStore.indexholder = [];
    this.networkStore.placedTiles = [];
    this.networkStore.firtstR = 0;
    this.networkStore.correctIndexHolder = [];
    // Something went wrong (propably: the key was incorrect)
    if (this.networkStore.error) {
      console.log('Could not connect!', this.networkStore.error);
      delete this.networkStore;
      delete this.localStore.networkKey;
    }
    // We are connected
    else {
      // If there is not a property messages in the network store
      // add it a let the value be an empty array
      this.networkStore.messages = this.networkStore.messages || [];
    }
    if (this.networkStore.players.length + '' === howManyPlayers + '' && this.test) {
      $('.key').hide();
      $('.pagetitle').hide();
      this.test = false;
      $('.startpage').hide();
      this.start(howManyPlayers, this.networkStore.players);
    }
    // Render the GUI
    // this.render();
    //this.createBoard();
  }
  get correctIndexHolder() {
    return this.networkStore.correctIndexHolder;
  }
  set correctIndexHolder(x) {
    this.networkStore.correctIndexHolder = x;
  }
  get placedTiles() {
    return this.networkStore.placedTiles;
  }
  set placedTiles(x) {
    this.networkStore.placedTiles = x;
  }
  get indexholder() {
    return this.networkStore.indexholder;
  }
  set indexholder(x) {
    this.networkStore.indexholder = x;
  }
  get wordVert() {
    return this.networkStore.wordVert;
  }
  set wordVert(x) {
    this.networkStore.wordVert = x;
  }
  get wordHoriz() {
    return this.networkStore.wordHoriz;
  }
  set wordHoriz(x) {
    this.networkStore.wordHoriz = x;
  }
  get oldWords() {
    return this.networkStore.oldWords;
  }
  set oldWords(x) {
    this.networkStore.oldWords = x;
  }
  get wordHolder() {
    return this.networkStore.wordHolder;
  }
  set wordHolder(x) {
    this.networkStore.wordHolder = x;
  }
  get newNew() {
    return this.networkStore.newNew;
  }
  set newNew(x) {
    this.networkStore.newNew = x;
  }
  get tiles() {
    return this.networkStore.tiles;
  }
  set tiles(x) {
    this.networkStore.tiles = x;
  }
  set board(x) {
    this.networkStore.board = x;
  }
  get board() {
    return this.networkStore.board;
  }
  set count(x) {
    this.networkStore.count = x;
  }
  get count() {
    return this.networkStore.count;
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
    this.endGame();
    if (this.networkStore.passCounter >= (this.networkStore.players.length + 1)) {
      return;
    }

    $('body').append(`<div class="container"> 
  <div class="star"></div>
  <div class="pressie">
    <div class="cover"></div>
    <div class="wrap"> </div>
    <div class="ribbon"></div>
  </div>
  <div class="tree">
    <div class="base"> </div>
    <div class="layer">
      <div class="line"> </div>
      <div class="bauble one"></div></div>
    
    <div class="layer two">
      <div class="line two"> </div>
      <div class="bauble two"></div>
      <div class="socks"> 
        <div class="top"> </div>
        <div class="foot"></div></div>
      </div>
    
    <div class="layer three">
      <div class="line three"> </div>
      <div class="bauble three"></div>
      <div class="socks two"> 
        <div class="top"> </div>
        <div class="foot two"></div></div>
      </div>
       </div>
    
    <div class="layer four">
      <div class="bauble four"></div>
      <div class="star two"></div>
      <div class="line four"> </div> 
       </div>
  </div>
</div>`);
    $('.board, .players, .next, .swap, .playerNamesPoints').remove();
    let $board = $('<div class="board"/>').appendTo('body');
    let $players = $('<div class="players"/>').appendTo('body');
    $('body').append('<footer class="footer"> &copy; 2020 - Made by Grupp 2 (Lunds Teknikhögskola)</footer>');
    $('body').append('<div class="invalid"></div>');
    $('body').append('<div class="playerNamesPoints"></div>')
    $board.html(this.networkStore.board.flat().map(x => `
    <div class="${x.special ? 'special-' + x.special : ''}">
    ${x.tile ? `<div class="tile">${x.tile.char.toUpperCase()}<span class="boardpoints">${x.tile.points}</span></div>` : ''}
    </div>
    `).join(''));
    //this.playerIndex !== this.networkStore.currentPlayer
    $('.playerNamesPoints').append('<p>Poäng tavla:</p>');
    for (let i = 0; i < this.networkStore.players.length; i++) {
      if (i === this.playerIndex) { continue; } else {
        $('.playerNamesPoints').append(`<p>${this.networkStore.players[i].name}: ${this.networkStore.players[i].points} poäng</p>`);
      }
    }
    // Render the players
    let that = this;
    $('.players').append(`<div class="players-point"> ★ poäng: ${this.players[this.playerIndex].points}</div>`);
    $players.append(this.players[this.playerIndex].render());
    $('body').append('<button class="pass">Passa</button>');
    $('.pass').click(function () {
      $('.invalid').hide();
      that.networkStore.firtstR++;
      that.networkStore.currentPlayer++;
      if (that.networkStore.currentPlayer === that.networkStore.players.length) {
        that.networkStore.currentPlayer = 0;
      }
      if (that.players[that.count].tiles.length === 7) {
        $('.players').empty();
        that.networkStore.passCounter++;
        console.log(that.networkStore.passCounter + "This is passcounter")
        that.count++;
        if (that.count === that.players.length) { that.count = 0 }
        $('.players').append(`<div class="players-point"> ★ poäng: ${that.players[that.playerIndex].points}</div>`);
        $players.append(that.players[that.playerIndex].render());
        that.addEvents();
      } else {
        that.players[that.count].tiles.push(...that.placedTiles);
        that.placedTiles = [];


        that.indexholder.forEach(([a, b]) => that.board[a][b].tile = '');
        that.indexholder = [];
        that.wordHolder = [];
        that.wordHoriz = '';
        that.wordVert = '';
        that.render();
      }
      that.endGame();
    });


    $('body').append('<button class="next">Spela</button>');
    $('.next').click(async function () {
      if (that.networkStore.firtstR !== 0) {
        that.checkIfConnected();
      }
      that.checker = true;
      that.wordHolder = [];
      that.collectWord();
      that.collectWordVert();
      that.makeCollectedWordsToArray(that.wordVert, that.wordHoriz);
      that.wordHoriz = '';
      that.wordVert = '';
      if (that.wordHolder.length !== 0) {
        for (let i = 0; i < that.wordHolder.length; i++) {
          if (that.wordHolder[i] === '') { that.wordHolder.splice(i, 1); }
          else {
            that.valid = await SAOLchecker.scrabbleOk(that.wordHolder[i]);
            Promise.resolve(that.valid);
            if (that.valid === false) {
              that.checker = false;
              break;
            }
          }
        }
      }
      if (that.board[7][7].tile !== undefined && that.check === true && that.checker && that.checkIfOnlyOneWord() && that.validTiles) {
        let points = that.countPoints();
        that.networkStore.firtstR++;
        that.networkStore.players[that.playerIndex].points += points;
        that.networkStore.currentPlayer++;
        if (that.networkStore.currentPlayer === that.networkStore.players.length) {
          that.networkStore.currentPlayer = 0;
        }
        that.firstRound = false;
        that.addNewIndex();
        $('.invalid').hide();
        that.checker = true;
        that.players[that.count].points += points;
        that.players[that.count].pushTiles(that.placedTiles.length);
        $('.players').empty();
        that.oldWords = that.wordHolder.slice();
        that.placedTiles = [];
        that.indexholder = [];
        that.wordHolder = [];
        that.wordHoriz = '';
        that.wordVert = '';
        that.count++;
        that.networkStore.passCounter = 0;
        if (that.count === that.players.length) {
          that.count = 0;
        }
        $('.players').append(`<div class="players-point">poäng: ${that.players[that.playerIndex].points}</div>`);
        $players.append(that.players[that.playerIndex].render());
        that.addEvents();
      } else {
        $('.invalid').slideToggle("slow");
      }
    });


    $('body').append('<button class="swap">Byt ut<span class="tooltiptext">Lägg ut brickor du vill byta ut på brädet</span></button>');
    $('.swap').click(function () {
      if (that.placedTiles.length !== 0) {
        that.networkStore.currentPlayer++;
        $('.invalid').hide();
        if (that.networkStore.currentPlayer === that.networkStore.players.length) {
          that.networkStore.currentPlayer = 0;
          $('.invalid').hide();
        }
        that.networkStore.firtstR++;
        that.placedTiles = [];
        that.indexholder.forEach(([a, b]) => that.board[a][b].tile = '');
        that.players[that.count].pushTiles(that.indexholder.length);
        $('.players').empty();
        that.placedTiles = [];
        that.indexholder = [];
        that.wordHolder = [];
        $('.invalid').hide();
        that.render();
        that.count++;
        that.networkStore.passCounter = 0;
        if (that.count === that.players.length) {
          that.count = 0;
        }
        $players.append(that.players[that.playerIndex].render());
        that.addEvents();
        that.render();
      }

    });

    /* let currentPlayerTiles = $('.stand').children('.tile').text();
    console.log(currentPlayerTiles); */

    $('body').append('<button class="undo-btn">Ångra</div>');

    $('.undo-btn').click(function () {
      if (that.placedTiles.length !== 0) {
        that.players[that.count].tiles.push(...that.placedTiles);
        that.placedTiles = [];
        that.indexholder.forEach(([a, b]) => that.board[a][b].tile = '');
        that.indexholder = [];
        that.wordHolder = [];
        $('.invalid').hide();
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

    if (this.playerIndex !== this.networkStore.currentPlayer) {
      $('.notmyturn').remove();
      $('.myturn').remove();
      $('.next').hide();
      $('.swap').hide();
      $('.pass').hide();
      $('.undo-btn').hide();
      let lastChar = this.players[this.networkStore.currentPlayer].name;
      if (lastChar.charAt(lastChar.length - 1) === 's' || lastChar.charAt(lastChar.length - 1) === 'S') {
        $('body').append(`<div class="notmyturn"><p>${this.players[this.networkStore.currentPlayer].name} tur<span class="dotDotDot"></span></p></div>`);
      }
      else {
        $('body').append(`<div class="notmyturn"><p>${this.players[this.networkStore.currentPlayer].name}s tur<span class="dotDotDot"></span></p></div>`);
      }

    } else {
      $('.notmyturn').remove();
      $('.myturn').remove();
      $('.loader').remove();
      $('body').append(`<div class="myturn"><p>Din tur</p></div>`);
    }

    let indexTile = 0;
    if (this.playerIndex === this.networkStore.currentPlayer) {
      $('.tileblank').click(function () {
        $('.next').hide();
        $('.swap').hide();
        $('.pass').hide();
        $('.undo-btn').hide();
        $('.blank').empty();
        indexTile = $(this).attr('data-tile');
        $('body').append(
          `
        <div class ="blank">
        <input placeholder="?" type="text" class="blankinput" pattern="[A-Ö]{1}"></input>
        <button class="blankbutton">Välj</button>
        </div>
      `);
        $('.blankbutton').click(function () {
          let letter = $('.blankinput').val();
          if (!that.validLetter.includes(letter.toUpperCase()) || letter.length > 1) {
            return;
          }
          console.log(letter);
          //this.playerIndex
          that.players[that.count].blankTile(letter.toUpperCase(), indexTile);
          $('.players').empty();
          $('.players').append(that.players[that.playerIndex].render());
          that.render();
          $('.blankbutton').hide();
          $('.blankinput').hide();
          $('.next').show();
          $('.swap').show();
          $('.pass').show();
          $('.undo-btn').show();
        })
      });
    }

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
    if (this.playerIndex !== this.networkStore.currentPlayer) { return; }
    else {
      $('.stand > .tile').draggabilly().on('dragEnd', e => {

        // check if drag within stand
        this.checkIfDraggedWithinStand($(e.currentTarget));

        // get the dropZone square - if none render and return
        let $dropZone = $('.hover');
        if (!$dropZone.length) { this.render(); return; }

        // the index of the square we are hovering over
        let squareIndex = $('.board > div').index($dropZone);

        // convert to y and x coords in this.networkStore.board
        let y = Math.floor(squareIndex / 15);
        let x = squareIndex % 15;

        // the index of the chosen tile
        let $tile = $(e.currentTarget);
        let tileIndex = $('.stand > div').index($tile);

        // put the tile on the board and re-render
        if ($tile.parent('.stand').length) {
          let holder = this.players[that.count].tiles.splice(tileIndex, 1)[0];
          this.networkStore.board[y][x].tile = holder;
          this.placedTiles.push(holder);
          this.indexholder.push([y, x]);

          that.check = true;
          that.checkTileOnBoard();

        }

        this.render();
        that.first++;
      });
    }
  }

  collectWord() {
    this.wordHoriz = '';


    for (let i = 0; i < this.networkStore.board.length; i++) {
      for (let j = 0; j < this.networkStore.board.length; j++) {
        if (this.networkStore.board[i][j].tile === '') { continue; }
        if (this.networkStore.board[i][j].tile !== undefined) {
          if (j === 14) {
            if (this.networkStore.board[i][j - 1].tile === undefined || this.networkStore.board[i][j - 1].tile === '') {
            } else { this.wordHoriz += this.networkStore.board[i][j].tile.char + ','; }
          }
          else if (j === 0) {
            if (this.networkStore.board[i][j + 1].tile === undefined || this.networkStore.board[i][j + 1].tile === '') {
            } else { this.wordHoriz += this.networkStore.board[i][j].tile.char; }
          }
          else {
            if (this.networkStore.board[i][j + 1].tile === undefined || this.networkStore.board[i][j + 1].tile === '') {
              if (this.networkStore.board[i][j - 1].tile === undefined || this.networkStore.board[i][j - 1].tile === '') { }
              else {
                this.wordHoriz += this.networkStore.board[i][j].tile.char + ',';
              }
            } else { this.wordHoriz += this.networkStore.board[i][j].tile.char; }
          }
        }
      }
    }
  }

  collectWordVert() {
    this.wordVert = '';

    for (let j = 0; j < this.networkStore.board.length; j++) {
      for (let i = 0; i < this.networkStore.board.length; i++) {
        if (this.networkStore.board[i][j].tile === '') { continue; }
        if (this.networkStore.board[i][j].tile !== undefined) {
          if (i === 14) {
            if (this.networkStore.board[i - 1][j].tile === undefined || this.networkStore.board[i - 1][j].tile === '') {
            } else { this.wordVert += this.networkStore.board[i][j].tile.char + ','; }
          }
          else if (i === 0) {
            if (this.networkStore.board[i + 1][j].tile === undefined || this.networkStore.board[i + 1][j].tile === '') {
            } else { this.wordVert += this.networkStore.board[i][j].tile.char; }
          }
          else {
            if (this.networkStore.board[i + 1][j].tile === undefined || this.networkStore.board[i + 1][j].tile === '') {
              if (this.networkStore.board[i - 1][j].tile === undefined || this.networkStore.board[i - 1][j].tile === '') { }
              else {
                this.wordVert += this.networkStore.board[i][j].tile.char + ',';
              }
            } else {
              this.wordVert += this.networkStore.board[i][j].tile.char;
            }
          }
        }
      }
    }
    if (this.wordHoriz === '' && this.wordVert.length <= 1 && this.firstRound) {
      this.wordVert += this.networkStore.board[7][7].tile.char + ',';
    }
  }

  checkTileOnBoard() {
    for (let i = 0; i < this.networkStore.board.length; i++) {
      for (let j = 0; j < this.networkStore.board.length; j++) {
        if (this.networkStore.board[i][j].tile === '') { continue; }
        if (i > 0 && i < 14 && j === 0 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i + 1][j].tile === undefined && this.networkStore.board[i][j + 1].tile === undefined &&
            this.networkStore.board[i - 1][j].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else if (i === 0 && j > 0 && j < 14 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i + 1][j].tile === undefined && this.networkStore.board[i][j + 1].tile === undefined &&
            this.networkStore.board[i][j - 1].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else if (i > 0 && i < 14 && j === 14 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i + 1][j].tile === undefined && this.networkStore.board[i - 1][j].tile === undefined &&
            this.networkStore.board[i][j - 1].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else if (j > 0 && j < 14 && i === 14 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i][j + 1].tile === undefined && this.networkStore.board[i][j - 1].tile === undefined &&
            this.networkStore.board[i - 1][j].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else if (i === 0 && j === 0 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i + 1][j].tile === undefined && this.networkStore.board[i][j + 1].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else if (i === 14 && j === 0 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i - 1][j].tile === undefined && this.networkStore.board[i][j + 1].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else if (i === 14 && j === 14 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i - 1][j].tile === undefined && this.networkStore.board[i][j - 1].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else if (i === 0 && j === 14 && this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i + 1][j].tile === undefined && this.networkStore.board[i][j - 1].tile === undefined && this.first !== 0) {
            this.check = false;
          }
        }
        else {
          if (this.networkStore.board[i][j].tile !== undefined) {
            if (this.networkStore.board[i + 1][j].tile === undefined && this.networkStore.board[i][j + 1].tile === undefined &&
              this.networkStore.board[i][j - 1].tile === undefined && this.networkStore.board[i - 1][j].tile === undefined && this.first !== 0) {
              this.check = false;

            }
          }
        }
      }
    }
  }

  makeCollectedWordsToArray(x, y) {


    if (x.length !== 0) {
      let a = x.split(',');
      for (let i = 0; i < a.length; i++) {
        if (a[i] === '' || a[i] === undefined) {
          continue;
        } else {
          if (i === a.length - 2) {
            this.lastWord = a[i];
          }
          this.wordHolder.push(a[i]);
        }
      }
    }
    if (y.length !== 0) {
      let b = y.split(',');
      for (let i = 0; i < b.length; i++) {
        if (b[i] === '' || b[i] === undefined) {
          continue;
        } else {
          if (i === b.length - 2) {
            this.lastWord1 = b[i];
          }
          this.wordHolder.push(b[i]);
        }
      }
    }


    for (let i = 0; i < this.wordHolder.length; i++) {
      if (this.wordHolder[i] === '') {
        this.wordHolder.splice(i, 1);
      }
    }

  }

  checkIfOnlyOneWord() {
    this.indexholder.sort(function (a, b) {
      if (a[0] === b[0]) {
        return 0;
      }
      else {
        return (a[0] < b[0]) ? -1 : 1;
      }
    });

    this.indexholder.sort(function (a, b) {
      if (a[1] === b[1]) {
        return 0;
      }
      else {
        return (a[1] < b[1]) ? -1 : 1;
      }
    });

    let temp = this.indexholder[0][0];
    let temp1 = this.indexholder[0][1];
    let end = this.indexholder[this.indexholder.length - 1][1];
    let end1 = this.indexholder[this.indexholder.length - 1][0];
    let count = 0;
    let count1 = 0;
    let check = false;
    let check1 = false;


    for (let i = 0; i < this.indexholder.length; i++) {
      if (temp === this.indexholder[i][0]) {
        count++;
      }
    }

    for (let i = 0; i < this.indexholder.length; i++) {
      if (temp1 === this.indexholder[i][1]) {
        count1++;
      }

    }
    if (count === this.indexholder.length) {
      for (let i = temp1; i <= end; i++) {
        if (this.networkStore.board[temp][i].tile === undefined) {
          check = false;
          break;
        } else {
          check = true;
        }
      }
    } else {
      check = false;
    }


    if (count1 === this.indexholder.length) {
      for (let i = temp; i <= end1; i++) {
        if (this.networkStore.board[i][temp1].tile === undefined) {
          check1 = false;
          break;
        } else {
          check1 = true;
        }
      }
    } else {
      check1 = false;
    }

    if (check === false && check1 === false) {
      return false;
    } else {
      return true;
    }

  }

  addNewIndex() {
    this.correctIndexHolder = [];

    for (let i = 0; i < this.networkStore.board.length; i++) {
      for (let j = 0; j < this.networkStore.board.length; j++) {
        if (this.networkStore.board[i][j].tile !== undefined) {
          if (this.networkStore.board[i][j].tile === '') { continue; }
          this.correctIndexHolder.push([i, j]);
        }
      }
    }

  }

  checkIfConnected() {

    let rowPlus = [];
    let rowMinus = [];
    let collumPlus = [];
    let collumMinus = [];

    for (let i = 0; i < this.indexholder.length; i++) {
      rowPlus.push([this.indexholder[i][0] + 1, this.indexholder[i][1]]);
    }

    for (let i = 0; i < this.indexholder.length; i++) {
      rowMinus.push([this.indexholder[i][0] - 1, this.indexholder[i][1]]);
    }

    for (let i = 0; i < this.indexholder.length; i++) {
      collumPlus.push([this.indexholder[i][0], this.indexholder[i][1] + 1]);
    }

    for (let i = 0; i < this.indexholder.length; i++) {
      collumMinus.push([this.indexholder[i][0], this.indexholder[i][1] - 1]);
    }


    for (let i = 0; i < this.correctIndexHolder.length; i++) {
      for (let j = 0; j < this.indexholder.length; j++) {
        if (this.correctIndexHolder[i][0] === rowPlus[j][0] && this.correctIndexHolder[i][1] === rowPlus[j][1]) {
          this.validTiles = true;
          return true;
        }
        if (this.correctIndexHolder[i][0] === rowMinus[j][0] && this.correctIndexHolder[i][1] === rowMinus[j][1]) {
          this.validTiles = true;
          return true;
        }
        if (this.correctIndexHolder[i][0] === collumPlus[j][0] && this.correctIndexHolder[i][1] === collumPlus[j][1]) {
          this.validTiles = true;
          return true;
        }
        if (this.correctIndexHolder[i][0] === collumMinus[j][0] && this.correctIndexHolder[i][1] === collumMinus[j][1]) {
          this.validTiles = true;
          return true;
        } else {
          this.validTiles = false;
        }
      }
    }

  }

  countPoints() {
    //Holds the current players point. 
    let points = 0;
    //Slice the original arrays. 
    let oldOld = this.oldWords.slice();
    this.newNew = this.wordHolder.slice();
    let second = [];


    //Arrays for different points, depending on the letters. 
    let onePoints = ['A', 'D', 'E', 'I', 'L', 'N', 'R', 'S', 'T'];
    let twoPoints = ['G', 'H', 'K', 'M', 'O'];
    let threePoints = ['F', 'V', 'Ä'];
    let fourPoints = ['B', 'P', 'U', 'Å', 'Ö'];
    let sevenPoints = ['J', 'Y'];
    let eightPoints = ['C', 'X'];
    let tenPoints = ['Z'];

    //looping through the original array, 
    //and print out the last correct word in a new array.
    while (oldOld.length) {
      this.newNew.splice(this.newNew.indexOf(oldOld.shift()), 1);
    }
    if (!this.newNew.length) {
      for (let i = 0; i < this.wordHolder.length; i++) {
        for (let j = 0; j < this.oldWords.length; j++) {
          if (this.wordHolder[i] === this.oldWords[i]) {

          } else {
            second.push(this.wordHolder[i]);
          }
        }
      }
    }


    //newNew - the array that holds all the new words thi round.
    // Check splits the array an hold every letter. 
    let check = '';
    if (!this.newNew.length) {
      check = second[0].toString().split('');
    } else {
      check = this.newNew.toString().split('');
    }

    for (let i = 0; i < check.length; i++) {
      if (check[i] === ',') {
        if (check[0] === check[i + 1]) {
          check.splice(0, 1);
          break;
        }
        if (check[i - 1] === check[check.length - 1]) {
          check.splice(i - 1, 1);
          break;
        }
        if (check[0] === check[check.length - 1]) {
          check.splice(0, 1);
          break;
        }
      }
    }




    for (let i = 0; i < check.length; i++) {
      if (onePoints.includes(check[i])) {
        points++;
      }
      if (twoPoints.includes(check[i])) {
        points += 2;
      }
      if (threePoints.includes(check[i])) {
        points += 3;
      }
      if (fourPoints.includes(check[i])) {
        points += 4;
      }
      if (sevenPoints.includes(check[i])) {
        points += 7;
      }
      if (eightPoints.includes(check[i])) {
        points += 8;
      }
      if (tenPoints.includes(check[i])) {
        points += 10;
      }
    }


    let doubleWord = false;
    let tripleWord = false;

    for (let i = 0; i < this.indexholder.length; i++) {
      if (this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].special === 'middle') {
        let add = this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].tile.points * 2;
        points += add;
        points -= this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].tile.points;
      }
      if (this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].special === 'orange') {
        doubleWord = true;
      }
      if (this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].special === 'red') {
        tripleWord = true;
      }
      if (this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].special === 'lightblue') {
        let add = this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].tile.points * 2;
        points += add;
        points -= this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].tile.points;
      }
      if (this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].special === 'blue') {
        let add = this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].tile.points * 3;
        points += add;
        points -= this.networkStore.board[this.indexholder[i][0]][this.indexholder[i][1]].tile.points;
      }
    }

    if (doubleWord) {
      points *= 2;
    }
    if (tripleWord) {
      points *= 3;
    }
    return points;
  }

  endGame() {
    if (this.networkStore.passCounter >= (this.networkStore.players.length + 1) && this.firstEnd) {

      this.firstEnd = false;
      $('.loader').remove();
      $('.board').hide();
      $('.stand').hide();
      $('.players').hide();
      $('.swap').hide();
      $('.undo-btn').hide();
      $('.pass').hide();
      $('.next').hide();
      $('.playerNamesPoints').hide();
      $('.notmyturn').hide();
      $('.helpBtn').hide();
      $('.madeBy').hide();
      $('.invalid').hide();
      $('body').append('<h1 class="gameOverH1">Spelet är slut</h1>');
      // Fireworks
      $('body').append('<div class="pyro"><div class="before"></div><div class="after"></div></div>');
      // Throphy icon for the winner

      this.$winners = '';
      let pointCounter = 0;
      if (!this.localStore.highScorePlayers) {
        this.localStore.highScorePlayers = [];
      }
      this.networkStore.players.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));

      for (let i = 0; i < this.players.length; i++) {
        this.$winners += `<p class="winner">${this.networkStore.players[i].name}: ${this.networkStore.players[i].points} poäng.</p>`;
        if (this.networkStore.players[i].points === 0) {
          pointCounter++;
        }
      }
      if (this.networkStore.players[0].points !== 0 && pointCounter !== this.networkStore.players.length) {
        this.localStore.highScorePlayers = [...this.localStore.highScorePlayers, { name: this.networkStore.players[0].name, points: this.networkStore.players[0].points }];
      } else if (pointCounter === this.networkStore.players.length && this.networkStore.players[0].points !== 0) {
        for (let i = 0; i < this.networkStore.players.length; i++) {
          this.localStore.highScorePlayers = [...this.localStore.highScorePlayers, { name: this.networkStore.players[i].name, points: this.networkStore.players[i].points }];
        }
      }
      this.localStore.highScorePlayers.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
      let $highScorePlayers = '';

      for (let i = 0; i < this.localStore.highScorePlayers.length; i++) {
        $highScorePlayers += `<p class="hcName">${this.localStore.highScorePlayers[i].name + ': &nbsp; &nbsp; ' + this.localStore.highScorePlayers[i].points} poäng</p>`
      }
      let $highScore = `<div class="highscoreFrame" style="overflow:scroll; height:400px;"><p class="hcTitles"> &#11088; Rekord Tavla &#11088; <div class="highscorePlayers">${$highScorePlayers}</div></p></div>`;
      $('body').append($highScore);
      if (pointCounter === this.networkStore.players.length) {
        $('body').append(`<h2 class="gameOverH2even">Det blev lika!</h2>`)
      } else {
        $('body').append(`<img id="score-logo" src="https://c10.patreonusercontent.com/3/eyJ3Ijo0MDB9/patreon-media/p/reward/2700645/3a91fd01cb12426e9ce8181f9f318018/2?token-time=2145916800&amp;token-hash=aPOTRMCfdGnGe7H5FBGYDtqAHI2pZYN8K2i0med9Ia8%3D" alt="trophy gif"><h2 class="gameOverH2">${this.networkStore.players[0].name}</h2>`);
      }
      $('body').append('<div class="score"></div>');
      $('.score').append('<h3>Resultatet:</h3>' + this.$winners);
      $('body').append(`<button class= "playAgainButton" > Nytt spel</button>`);
      $('.playAgainButton').click(function () {
        location.reload();
      });
    }
  }
}