// Description: This file is used to export all the database files

export * from "./default.database"
export * from "./model.database"
export * from "./interface.database"

import { DB_Modal } from "./model.database"

export default new DB_Modal() // This is the default database exported from the database module