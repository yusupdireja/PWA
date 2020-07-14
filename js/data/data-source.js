class DataSource {

    static getMatch() {
        return fetch('https://api.football-data.org/v2/competitions/2021/matches', {
                method: "GET",
                withCredentials: true,
                headers: {
                    "X-Auth-Token": "e2760fbe523448a1bf73c0c57bdc1564"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject('not found');
                }
            });
    }

    static getStanding() {
        return fetch('https://api.football-data.org/v2/competitions/2021/standings?standingType=TOTAL', {
                method: "GET",
                withCredentials: true,
                headers: {
                    "X-Auth-Token": "e2760fbe523448a1bf73c0c57bdc1564"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject('not found');
                }
            })
    }

}

export default DataSource;