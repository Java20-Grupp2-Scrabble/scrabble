import Store from 'https://network-lite.nodehill.com/store';

export default class Multiplayer {

  constructor() {
    //kom ihåg mellen side om laddningar
    this.localStore = Store.getLocalStore();
 }
  async createKey() {
    this.key = await Store.createNetworkKey();
  }

  async setKey(key) {

    this.key;
  }
  async connect() {

    this.networkStore = Store.getNetworkStore(this.key, ()

      => {
      console.log('the  store was changed by someone else!');

    })
  }
}
