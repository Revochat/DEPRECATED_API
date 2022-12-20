// Description: This file is used to export all the database files

export * from "./default.database"
export * from "./components/model/model.database"
export * from "./interface.database"
export * from "./components/users/users.database"

import DB_Manager from "./default.database"

export default new DB_Manager() // This is the default database exported from the database module