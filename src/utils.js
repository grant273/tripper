
export function rank(status) {
    return {
        'notNeeded': 0,
        'needed': 1,
        'thisTrip': 2,
    }[status];
}
