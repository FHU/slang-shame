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

        // Get the group ID from the group name
        const groupList = await db.groups.list([Query.equal("groupName", reportData.groupName || "")]);

        if (groupList.rows.length === 0) {
            throw new Error(`Group not found: ${reportData.groupName}`);
        }

        // Create report with just the IDs (strings), not the full objects
        const createdReport = await db.reports.create({
            suspectID: reportData.suspectID,
            slangID: reportData.slangID,
            reporterID: reportData.reporterID,
            groupID: groupList.rows[0].$id,
            typeOfReport: "UnDetailed",
            reportStatus: "Assumed"
        }, undefined, [Permission.read(Role.any()), Permission.write(Role.any()),  Permission.delete(Role.any())]);

        return createdReport;
    }
    catch(error){
        console.log(error)
    }
};