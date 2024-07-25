import { config } from 'dotenv';
config();
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/matchers';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
