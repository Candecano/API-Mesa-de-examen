import { testDBConnection } from '../../backend/src/App';

describe('App', () => {
  it('deberia inicializar sin errores', async () => {
    await testDBConnection();
  });

  it('debería devolver una promesa', () => {
    const result = testDBConnection();
    expect(result).toBeInstanceOf(Promise);
  });

  it('debería manejar errores de conexión', async () => {
  
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const pool = require('../../backend/src/Configuracion/db').default;
    pool.query = jest.fn().mockRejectedValueOnce(new Error('DB error'));
    await expect(testDBConnection()).resolves.toBeUndefined();
    (console.error as jest.Mock).mockRestore();

    
  });

  
});