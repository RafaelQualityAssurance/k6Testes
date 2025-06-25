import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { getEnvironment } from '../../config/environments.js';
import { testConfigs } from '../../config/test-configs.js';
import { defaultThresholds } from '../../config/thresholds.js';
import { validateCanaisResponse, getAuthHeaders } from '../../utils/helper.js';


export const options = {
    ...testConfigs.smoke, 
    thresholds: {
        ...defaultThresholds,
       
        'checks': ['rate > 0.95'],
        'http_req_duration': ['p(90) < 500']
    }
};

const env = getEnvironment();

export function setup() {
    console.log(`Executando teste GET-recuperar-canais no ambiente: ${env}`);
    return {
        baseUrl: env.baseUrl,
        timeout: env.timeout
    };
}

export default function (data) {
    const BASE_URL = data.baseUrl || env.baseUrl;
   
    const headers = getAuthHeaders(''); //token
    
    const res = http.get(`${BASE_URL}`, { headers });
    
    const isSuccessful = validateCanaisResponse(res);
    
    if (!isSuccessful) {
        console.error(`---STATUS REQ---- ${res.status}, Body: ${res.body}`);
    }
    
    sleep(2);
}

export function handleSummary(data) {
    return {
        './reports/GET-recuperar-canais.html': htmlReport(data), 
    };
}