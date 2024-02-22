export function getDistanceTime(time: any) {
    const timeNow = new Date().getTime();
    const timePosted = new Date(time);

    const postInMili = timePosted.getTime();

    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = timePosted.getDate();
    const month = timePosted.getMonth();
    const year = timePosted.getFullYear();

    const distance = timeNow - postInMili;

    const distanceSeconds = Math.floor(distance / 1000);
    const distanceMinutes = Math.floor(distance / 1000 / 60);
    const distanceHours = Math.floor(distance / 1000 / 60 / 60);
    const distanceDay = Math.floor(distance / 1000 / 60 / 60 / 24);

    if (distanceDay > 7) {
        return `${date} ${monthList[month]} ${year.toString().replace("20", "")}`;
    } else if (distanceDay > 0) {
        return `${distanceDay}d`;
    } else if (distanceHours > 0) {
        return `${distanceHours}h`;
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes}m`;
    } else {
        return `${distanceSeconds}s`;
    }
}

export function dateThread(time: any) {
    const detailTime = new Date(time);

    return detailTime.toDateString();
}
