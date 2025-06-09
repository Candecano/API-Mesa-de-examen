import { Request, Response } from 'express';

import { NotificacionService } from '../../backend/src/Servicios/NotificacionService';
import { asignarMesa, confirmarMesa, rechazarMesa, notificarMesaDePrueba } from '../../backend/src/Controladores/GestiondeMesas';

// Mock de las dependencias
jest.mock('../../backend/src/Servicios/SistemaExamenFacade');
jest.mock('../../backend/src/Servicios/MesaRepository');
jest.mock('../../backend/src/Servicios/RespuestaProfesorService');
jest.mock('../../backend/src/Servicios/NotificacionService');

describe('GestiondeMesas', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockResponse = {
      status: mockStatus,
      json: mockJson
    };
  });

  describe('asignarMesa', () => {
    it('deberia asignar una mesa y devolver estado 201', async () => {
      mockRequest = {
        body: {
          idProfesor: 1,
          Materia: 'Matematica Discreta',
          fecha: '2024-01-01',
          Modalidad: 'Presencial'
        }
      };

      await asignarMesa(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        mensaje: 'Mesa asignada y el docente fue notificado'
      });
    });
  });

  describe('confirmarMesa', () => {
    it('deberia confirmar una mesa y devolver estado 200', async () => {
      mockRequest = {
        body: {
          idProfesor: 1,
          Mesa: 1
        }
      };

      await confirmarMesa(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        mensaje: 'Se registro la asistencia'
      });
    });
  });



 describe('notificarMesaDePrueba', () => {
    it('deberia enviar una notificacion de prueba exitosamente', async () => {
      mockRequest = {};

      await notificarMesaDePrueba(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({
        mensaje: 'Notificacion enviada correctamente'
      });
    });

    it('deberia manejar errores al enviar la notificacion', async () => {
      mockRequest = {};
      jest.spyOn(console, 'error').mockImplementation(() => {});
      (NotificacionService.prototype.enviarNotificacion as jest.Mock).mockRejectedValue(new Error('Error de prueba'));

      await notificarMesaDePrueba(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        mensaje: 'Fallo el envio de la notificacion'
      });
    });
  });
});


