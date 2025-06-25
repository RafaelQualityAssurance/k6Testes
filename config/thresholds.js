export const defaultThresholds = {
    'http_req_duration': ['p(95)<500'],
    'http_req_failed': ['rate<0.1'],
    'http_reqs': ['rate>10']
};

export const strictThresholds = {
    'http_req_duration': ['p(95)<200'],
    'http_req_failed': ['rate<0.01'],
    'http_reqs': ['rate>50']
};