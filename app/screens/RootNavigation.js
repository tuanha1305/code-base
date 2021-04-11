export default class RootNavigation {

    static navigation;
    static route;

    static isAvailable() {
        return this.navigation !== null && this.navigation !== undefined && this.route !== null && this.route !== undefined;
    }

    static setNavigation(navigation) {
        this.navigation = navigation;
    }

    static setRoute(route) {
        this.route = route;
    }

    static navigate(...args) {
        const enable = this.navigation.navigate(...args);
        if (!enable) {
            this.navigation.navigate('Empty');
        }
    }

    static push(...args) {
        const enable = this.navigation.push(...args);
        if (!enable) {
            this.navigation.push('Empty');
        }
    }

    static goBack() {
        this.navigation.goBack();
    }
}
