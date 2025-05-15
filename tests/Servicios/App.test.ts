import { testDBConnection } from '../../backend/src/App';

describe('App', () => {
  it('debería inicializar sin errores', async () => {
    await testDBConnection();
  });
});