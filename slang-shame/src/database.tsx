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

type TableName = keyof TableRowMap;

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

// Helper function to create a properly typed table API
function createTableAPI<T extends TableName>(
    databaseId: string,
    tableId: string
): TableAPI<TableRowMap[T]> {
    return {
        list: (queries?: ReturnType<typeof Query.equal>[]) =>
            database.listRows({
                databaseId,
                tableId,
                queries
            }).then(res => ({
                total: res.total,
                rows: res.rows as unknown as TableRowMap[T][]
            })),
        // The following could be added or deleted
        // get: (id: string) =>
        //     database.getRow({
        //         databaseId,
        //         tableId,
        //         rowId: id
        //     }),
        // delete: (id: string) =>
        //     database.deleteRow({
        //         databaseId,
        //         tableId,
        //         rowId: id
        //     })
    };
}

const db: DB = {
    groups: createTableAPI<'groups'>(database_id, 'groups'),
    reporters: createTableAPI<'reporters'>(database_id, 'reporters'),
    reports: createTableAPI<'reports'>(database_id, 'reports'),
    slang: createTableAPI<'slang'>(database_id, 'slang'),
    subgroups: createTableAPI<'subgroups'>(database_id, 'subgroups'),
    suspects: createTableAPI<'suspects'>(database_id, 'suspects'),
};

export {db}