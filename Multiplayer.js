import Store from 'https://network-lite.nodehill.com/store';

export default class Multiplayer {

  constructor() {
    //kom ihåg mellen side om laddningar
    this.localStore = Store.getLocalStore();
  }
  async createKey() {
    this.key = await Store.createNetworkKey();
  }

  async setKey(key) {//Allows you to join someone if you have the right key
    //Other users should get the key from the user that started the game/chat and use it...
    this.key;
  }
  async connect() {// This connect to the store, needs a key to be created first

    this.networkStore = await Store.getNetworkStore(this.key, ()

      => {//Every time there is a change by a user it prints out 'the  store was changed by someone else!'
      console.log('the  store was changed by someone else!');

    })
  }
}
