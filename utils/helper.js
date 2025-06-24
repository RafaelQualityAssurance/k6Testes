import { check } from 'k6';

export function validateCanaisResponse(response) {
    return check(response, {
        'status é 200': (r) => r.status === 200,
        'resposta contém body': (r) => r.body && r.body.length > 0,
        'tempo de resposta < 500ms': (r) => r.timings.duration < 600,
        'tempo de espera (waiting) < 500ms': (r) => r.timings.waiting < 500,
        'tempo de conexão < 50ms': (r) => r.timings.connecting < 500,
        'TLS handshaking < 400ms': (r) => r.timings.tls_handshaking < 400,
        'content-type é JSON': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json')
    });
}


export function validateResponse(response, expectedStatus = 200) {
    return check(response, {
        [`Status é ${expectedStatus}`]: (r) => r.status === expectedStatus,
        'Resposta tem conteúdo': (r) => r.body && r.body.length > 0,
        'Tempo de resposta OK': (r) => r.timings.duration < 500,
        'Content-Type correto': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json')
    });
}


export function getAuthHeaders(token) {
    return {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}


export function randomSleep(min = 1, max = 3) {
    const sleepTime = Math.random() * (max - min) + min;
    return sleepTime;
}

export function validatePerformance(response, maxDuration = 500) {
    return check(response, {
        [`Tempo de resposta < ${maxDuration}ms`]: (r) => r.timings.duration < maxDuration,
        'Tempo de espera aceitável': (r) => r.timings.waiting < maxDuration,
        'Tempo de conexão rápido': (r) => r.timings.connecting < 100,
        'TLS handshaking eficiente': (r) => r.timings.tls_handshaking < 400
    });
}
