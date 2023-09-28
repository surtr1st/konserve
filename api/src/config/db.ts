import { Database } from "bun:sqlite";

export class SQLiteDatabase implements Disposable {
  private db: Database;

  constructor(dbName?: string) {
    this.db = new Database(dbName);
  }

  public use(): Database {
    return this.db;
  }

  [Symbol.dispose]() {
    this.db.close();
  }
}
