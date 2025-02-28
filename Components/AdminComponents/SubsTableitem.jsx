import React from 'react';

const SubsTableItem = ({ email, mongoId, date,deleteEmail }) => {
    // Add debugging to see what date we're receiving
    console.log('Raw date value:', date, 'Type:', typeof date);

    const formatDate = (dateInput) => {
        // Handle various possible input cases
        if (!dateInput) return "No Date Provided";
        
        const emailDate = new Date(dateInput);
        const isValidDate = !isNaN(emailDate.getTime());
        
        if (!isValidDate) {
            console.log('Invalid date detected for:', email, 'Raw value:', dateInput);
            return "Invalid Date";
        }

        return emailDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formattedDate = formatDate(date);

    return (
        <tr className="bg-white border-b text-left hover:bg-gray-50">
            <th 
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
                {email || "No Email"}
            </th>
            <td className="px-6 py-4 hidden sm:table-cell">
                {formattedDate}
            </td>
            <td className="px-6 py-4">
                <button
                    className=" cursor-pointer"
                    aria-label={`Remove ${email || 'subscriber'}`}
                    onClick={()=>deleteEmail(mongoId)}
                >
                    ×
                </button>
            </td>
        </tr>
    );
};

export default SubsTableItem;