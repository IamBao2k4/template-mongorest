import apm from 'elastic-apm-node';
 
// Check if APM is available before starting
if (apm && typeof apm.start === 'function') {
  apm.start({
    serviceName: process.env.APM_SERVICE_NAME || 'mongorest-api',
    secretToken: process.env.APM_SECRET_TOKEN ,
    serverUrl: process.env.APM_SERVER_URL ,
    environment: process.env.NODE_ENV || 'development',
    active: process.env.APM_ACTIVE === 'true' || process.env.NODE_ENV === 'production',
    metricsInterval: '5s',
    centralConfig: false,
    captureSpanStackTraces: true,
  });
  
  console.log('Elastic APM started successfully');
} else {
  console.warn('Elastic APM is not available. Ensure elastic-apm-node is installed and configured correctly.');
}

export default apm;