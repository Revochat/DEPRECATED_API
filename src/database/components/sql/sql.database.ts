import { UserInterface } from "../../../client"

export function InsertUser (user: UserInterface): string {
    var SqlStruct = {
        sql: "INSERT INTO users (",
        values: "VALUES (",
        keys: Object.keys(user)
    }
    for (var key of SqlStruct.keys) {        
        SqlStruct.sql += key + ",";
        SqlStruct.values += "'" + user[key as keyof UserInterface] + "',";
    }
    SqlStruct.sql = SqlStruct.sql.slice(0, -1) + ") ";
    SqlStruct.values = SqlStruct.values.slice(0, -1) + ")";
    SqlStruct.sql += SqlStruct.values;

    return SqlStruct.sql
}