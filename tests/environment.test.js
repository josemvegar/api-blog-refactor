const dotenv = require('dotenv');
dotenv.config();

console.log(process.env);
describe('idValidator', () => {
    it('should show environment variables', async () => {
        console.log(process.env);
    });
});