import { database, database_id} from "./appwriteConfig";
import { Query } from 'appwrite';
import type { Groups, Subgroups, Reports, Reporters, Slang, Suspects } from "./utils/types";

type TableRowMap = {
    groups: Groups;
    reporters: Reporters;
    reports: Reports;
    slang: Slang;
    subgroups: Subgroups;
    suspects: Suspects;
};

const tables = [
    {
        'database_id':database_id,
        'id':'groups',
        'name':'groups'
    },
    {
        'database_id':database_id,
        'id':'reporters',
        'name':'reporters'
    },
    {
        'database_id':database_id,
        'id':'reports',
        'name':'reports'
    },
    {
        'database_id':database_id,
        'id':'slang',
        'name':'slang'
    },
    {
        'database_id':database_id,
        'id':'subgroups',
        'name':'subgroups'
    },
    {
        'database_id':database_id,
        'id':'suspects',
        'name':'suspects'
    }
] as const;

type TableName = typeof tables[number]["name"];

interface TableAPI<Row> {
    list: (queries?: string[]) => Promise<{ rows: Row[]; total: number }>;
    //get: (id: string) => Promise<Row>;
    //create: (data: Omit<Row, keyof Models.Row>) => Promise<Row>;
    //update: (id: string, data: Partial<Omit<Row, keyof Models.Row>>) => Promise<Row>;
    //delete: (id: string) => Promise<void>;
}
type DB = {
    [K in TableName]: TableAPI<TableRowMap[K]>;
};

const db = {} as DB;

// The loop that adds functions to the table
for (const table of tables) {
    db[table.name] = {
        list: (queries?: ReturnType<typeof Query.equal>[]) =>
            database.listRows({
                databaseId: table.database_id,
                tableId: table.id,
                queries
            }).then(res => ({
                total: res.total,
                rows: res.rows as TableRowMap[typeof table.name][]
            })),
        // The following could be added or deleted
        // get: (id: string) =>
        //     database.getRow({
        //         databaseId: table.database_id,
        //         tableId: table.id,
        //         rowId: id
        //     }),
        // delete: (id: string) =>
        //     database.deleteRow({
        //         databaseId: table.database_id,
        //         tableId: table.id,
        //         rowId: id
        //     })
    };
}

export {db}