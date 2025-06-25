export const testConfigs = {
    smoke: {
        vus: 1,
        duration: '14s'
    },
    load: {
        stages: [
            { duration: '1m', target: 10 }, 
            { duration: '1m', target: 5 },  
            { duration: '30s', target: 0 } 
        ]
    },
    stress: {
        stages: [
            { duration: '2m', target: 10 },
            { duration: '5m', target: 50 },
            { duration: '2m', target: 100 },
            { duration: '5m', target: 100 },
            { duration: '2m', target: 0 }
        ]
    },
    spike: {
        stages: [
            { duration: '10s', target: 100 },
            { duration: '1m', target: 100 },
            { duration: '10s', target: 1400 },
            { duration: '3m', target: 1400 },
            { duration: '10s', target: 100 },
            { duration: '3m', target: 100 },
            { duration: '10s', target: 0 }
        ]
    }
};
