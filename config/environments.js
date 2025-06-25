export const environments = {
  pr: {
    baseUrl: '',
    timeout: '30s'
  },
  homol: {
    baseUrl: '',
    timeout: '45s'
  },
  prod: {
    baseUrl: '',
    timeout: '60s'
  }
};

export function getEnvironment() {
 return environments['homol'];
}