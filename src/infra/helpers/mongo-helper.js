const { MongoClient } = require("mongodb");

module.exports = {
  async connect(uri) {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db();
    this.client = null;
    this.db = null;
  },

  async disconnect() {
    await this.client.close();
  },

  async getCollection(name) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.uri);
    }
    return this.db.collection(name);
  },
};
