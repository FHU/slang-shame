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

export interface LeaderboardEntry {
    suspect: {
        $id: string;
        firstName: string;
        lastName: string;
        title: string;
    };
    totalReports: number;
    slangUsage: Array<{
        slang: {
            $id: string;
            word: string;
        };
        count: number;
    }>;
}

export const getTopReports = async (groupName: string | undefined): Promise<LeaderboardEntry[]> => {
    try {
        // 1. Get the group ID
        const groupResult = await db.groups.list([Query.equal("groupName", groupName || "")]);
        if (groupResult.rows.length === 0) return [];

        const groupID = groupResult.rows[0].$id;

        // 2. Fetch last 10 reports (or all if < 10)
        const reportsResult = await db.reports.list([
            Query.equal("groupID", groupID),
            Query.orderDesc("$createdAt"),
            Query.limit(10)
        ]);

        // 3. Tally the data
        const tallyMap = new Map<string, LeaderboardEntry>();

        for (const report of reportsResult.rows) {
            const suspectID = typeof report.suspectID === 'string' ? report.suspectID : report.suspectID.$id;
            const slangID = typeof report.slangID === 'string' ? report.slangID : report.slangID.$id;

            // Get or create entry for this suspect
            if (!tallyMap.has(suspectID)) {
                const suspect = typeof report.suspectID === 'string'
                    ? await db.suspects.get(suspectID)
                    : report.suspectID;

                tallyMap.set(suspectID, {
                    suspect: {
                        $id: suspect.$id,
                        firstName: suspect.firstName,
                        lastName: suspect.lastName || '',
                        title: suspect.title
                    },
                    totalReports: 0,
                    slangUsage: []
                });
            }

            const entry = tallyMap.get(suspectID)!;
            entry.totalReports++;

            // Track slang usage
            const slangIndex = entry.slangUsage.findIndex(s => s.slang.$id === slangID);
            if (slangIndex === -1) {
                const slang = typeof report.slangID === 'string'
                    ? await db.slang.get(slangID)
                    : report.slangID;

                entry.slangUsage.push({
                    slang: { $id: slang.$id, word: slang.word },
                    count: 1
                });
            } else {
                entry.slangUsage[slangIndex].count++;
            }
        }

        // 4. Sort by totalReports descending
        return Array.from(tallyMap.values())
            .sort((a, b) => b.totalReports - a.totalReports);

    } catch(error) {
        console.log(error);
        return [];
    }
};