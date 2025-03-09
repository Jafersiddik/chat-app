import { format, isToday, isYesterday, parseISO } from 'date-fns';

export const convertToTime = function convertToTime(dateString) {
    const date = new Date(dateString);

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: true,
    };

    return date.toLocaleString('en-US', options);
}


export const DateComponent = (messageDate) => {
    const date = parseISO(messageDate);
    console.log(messageDate)

    if (isToday(date)) {
        return format(date, 'hh:mm a');
    }

    if (isYesterday(date)) {
        return 'Yesterday';
    }
    return format(date, 'd/M/yyyy');

};
