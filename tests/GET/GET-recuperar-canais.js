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
   
    const headers = getAuthHeaders('eyJraWQiOiJ3UWRPOVhJdU9meVpNVk9GcWh5QlwvOUloeW1XMzd0SnZPMU5qZTUrOXgzaz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlNGUwNDBmMi1hZmZkLTQ0NmEtYTkxYi02Y2Y5NDBkYWZiYTUiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9kM2lXa1R0MEMiLCJjbGllbnRfaWQiOiIzZmw5Mm9lOW91Y280bGFjb3JlcWFzNTgxMyIsIm9yaWdpbl9qdGkiOiJkZjRhMWI4Zi03YTc0LTRiMTMtODkwMy1lZDYxYzVjM2Y2NDYiLCJldmVudF9pZCI6Ijc5ZDVmYTgwLTU4NGEtNDY2Ny04OWI1LTJjOTZlMWVkNmRmMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTA3Njg4NDcsImV4cCI6MTc1MDgxMDkxNiwiaWF0IjoxNzUwODA3MzE2LCJqdGkiOiI3NjU1ODEzYi1iOTg1LTQ5MmUtOTczNS1hZjhmNDhkMThiMWMiLCJ1c2VybmFtZSI6ImU0ZTA0MGYyLWFmZmQtNDQ2YS1hOTFiLTZjZjk0MGRhZmJhNSJ9.sN3E-4bxIeWebsYJjStp__1BZ3MocrjX-0BcTfh3JLch4bH3r6xZdCSF-0QL302DzYrLz82HJlbst3umTMarIyJrRV6DlDSRcwFWr0zTrgnFzr9ruqEghcZkN1c4vk2MSj0vOWQE64MuaLKSd1egMzDycRUX0SQNvtfTm_f4QAhqE7JEuMChSXa0do6U0ScIE4zAkunG1hOOOkx2SskUVqV8fYNWotWPZ0rxM3WbZyW-1CkeWzIW55p7WHEMCFfxjO3uMT1_aegeGw4TmTNDVQ1ujZxHgkJDS73PCi4CTTahrnPEMoHsEsP_ly778V2KRwLB0YLykMBCJ5K4a3mnsA'); 
    
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