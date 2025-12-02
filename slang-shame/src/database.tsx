import { database, database_id} from "./appwriteConfig";
import { type Models, ID } from 'appwrite';
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

// Helper type to extract the data fields (excluding Models.Row metadata)
type RowData<Row> = Omit<Row, keyof Models.Row>;

interface TableAPI<Row> {
    list: (queries?: string[]) => Promise<{ rows: Row[]; total: number }>;
    get: (rowId: string, queries?: string[]) => Promise<Row>;
    create: (data: Partial<RowData<Row>>, rowId?: string, permissions?: string[]) => Promise<Row>;
    update: (rowId: string, data: Partial<RowData<Row>>, permissions?: string[]) => Promise<Row>;
    delete: (rowId: string) => Promise<void>;
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
        list: (queries?: string[]) =>
            database.listRows({
                databaseId,
                tableId,
                queries
            }).then(res => ({
                total: res.total,
                rows: res.rows as unknown as TableRowMap[T][]
            })),

        get: (rowId: string, queries?: string[]) =>
            database.getRow({
                databaseId,
                tableId,
                rowId,
                queries
            }).then(row => row as unknown as TableRowMap[T]),

        create: (data: Partial<RowData<TableRowMap[T]>>, rowId?: string, permissions?: string[]) =>
            database.createRow({
                databaseId,
                tableId,
                rowId: rowId || ID.unique(),
                data: data as Record<string, unknown>,
                permissions
            }).then(row => row as unknown as TableRowMap[T]),

        update: (rowId: string, data: Partial<RowData<TableRowMap[T]>>, permissions?: string[]) =>
            database.updateRow({
                databaseId,
                tableId,
                rowId,
                data: data as Record<string, unknown>,
                permissions
            }).then(row => row as unknown as TableRowMap[T]),

        delete: (rowId: string) =>
            database.deleteRow({
                databaseId,
                tableId,
                rowId
            }).then(() => undefined)
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