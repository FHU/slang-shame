import { Query, Role, Permission } from "appwrite";
import { db } from '../database';
import { ensureSession } from '../appwriteConfig';
export const listGroupSuspects = async (groupName: string | undefined) => {
            try {
                const returned_group = await db.groups.list([Query.equal("groupName", groupName || "")]);
                // Only fetch suspects if we found a group
                if (returned_group.rows.length > 0) {
                    const suspectsResult = await db.suspects.list([Query.equal("groupID", returned_group.rows[0].$id)]);
                    return( suspectsResult.rows );
                }
                else
                {
                  throw new Error("This Group does not exist")
                }
            }
            catch(error){
                console.log(error)
                return [];
            }
        };

export const getSuspect = async (suspectID: string | undefined) => {
    if (typeof suspectID === 'undefined') {
        throw new Error("Suspect ID is undefined");
    }
    try {
        const returned_suspect = await db.suspects.get(suspectID)
        return returned_suspect;
    }
    catch(error){
        console.log(error)
    }
}

export const listSlang = async () => {
            try {
                const theSlang = await db.slang.list();
                return theSlang.rows;
                }
            catch(error){
                console.log(error)
                return [];
            }
        };

export const sendReport = async (reportData: { suspectID: string; slangID: string; reporterID: string; groupName: string; }) => {
    try {
        // Ensure anonymous session exists before making any database calls
        await ensureSession();

        // Need to get the various fields and make them into Suspect, Group, Reporter, and Slang Objects
        const finishedReportData = {};
        finishedReportData['suspectID'] = await db.suspects.get(reportData.suspectID);
        finishedReportData['slangID'] = await db.slang.get(reportData.slangID);
        finishedReportData['reporterID'] = await db.reporters.get(reportData.reporterID);
        const groupList = await db.groups.list([Query.equal("groupName", reportData.groupName || "")]);
        finishedReportData['groupID'] = groupList.rows[0];

        const createdReport = await db.reports.create(finishedReportData, undefined, [Permission.read(Role.any()), Permission.write(Role.any()),  Permission.delete(Role.any()), Permission.update(Role.any())]);
        return createdReport;
    }
    catch(error){
        console.log(error)
    }
};