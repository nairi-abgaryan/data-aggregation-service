import * as convict from 'convict';
import * as dotenv from 'dotenv';
import * as path from 'path';

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : '';
dotenv.config({ path: path.join(__dirname, `../../${environment}.env`) });

const convictSchema = convict({
  serviceName: {
    doc: 'data-agregation-service',
    env: '',
    default: 'data-agregation-service',
  },
  port: {
    doc: 'Port to run the service on',
    env: 'PORT',
    format: 'port',
    default: 3000,
  },
  env: {
    doc: 'Node environment',
    env: 'NODE_ENV',
    default: 'a',
  },
});

convictSchema.validate({ allowed: 'strict' });
export default convictSchema.getProperties();
