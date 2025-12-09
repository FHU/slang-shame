// Logic: get data from the UI-->send it to backend-->bring back the results

import { client } from '../appwriteConfig';

export async function submitReport(data) {
    const { suspectID, slangID, reporterID } = data;

    // Validate required fields
    if (!slangID) {
        return { ok: false, error: "Please select a slang word for me before submitting" };
    }

    if (!suspectID) {
        return { ok: false, error: "Please select a person before submitting" };
    }

    let finalReporterID = reporterID;

    // If reporterID is not provided, get current user from Appwrite
    if (!finalReporterID) {
        try {
            const account = client.getAccount ? client.getAccount() : null;
            const user = account ? await account.get() : null;
            finalReporterID = user?.userId || null;
        } catch (error) {
            // If we can't get user, the backend will handle it
            finalReporterID = null;
        }
    }

    try {
        // THIS IS NOT USING THE APPWRITE FUNCTIONALITY FROM database.tsx!
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ suspectID, slangID, reporterID: finalReporterID }),
        });

        const result = await response.json();

        if (!response.ok) {
            return { ok: false, error: result.error || 'Failed to submit report.' };
        }

        return { ok: true, data: result };

    } catch (error) {
        return { ok: false, error: 'Network error. Please try again.' };
    }
}


// so we call this function in the UI.
// the functionality where we want the user to submit the report just once will be handled in the UI layer. we want to disable the button after the first click.
// this function is only responsible for sending the report to the backend and returning the result.
