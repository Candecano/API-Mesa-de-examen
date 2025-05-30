//Facade (SistemaExamenFacade) orquesta las llamadas
//encapsula la logica de actualizar el estado de mesa
import { MesaRepository } from "../Servicios/MesaRepository";
import { RespuestaProfesorService } from "../Servicios/RespuestaProfesorService";
import { NotificacionService } from "./NotificacionService";

export class SistemaExamenFacade {

  private mesaRepo: MesaRepository;
  private respuestaService: RespuestaProfesorService;
  private notificador: NotificacionService;

  constructor(
    mesaRepo: MesaRepository,
    respuestaService: RespuestaProfesorService,
    notificador: NotificacionService
  ) {
    this.mesaRepo = mesaRepo;
    this.respuestaService = respuestaService;
    this.notificador = notificador;
  }

  public async asignarMesa(mesa: {
    id: number;
    Materia: string;
    fecha: string;
    Modalidad: string;
  }): Promise<void> {
    await this.mesaRepo.crearMesa(mesa);
    await this.notificador.enviarNotificacion("Nueva mesa creada", mesa);
  }

  public confirmarMesa(idMesa: string, profesorId: string): void {
    this.respuestaService.confirmar(idMesa, profesorId);
    this.notificador.enviarNotificacion("Mesa confirmada", { idMesa, profesorId });
  }

  public rechazarMesa(idMesa: string, profesorId: string): void {
    this.respuestaService.rechazar(idMesa, profesorId);
    this.notificador.enviarNotificacion("Mesa rechazada", { idMesa, profesorId });
  }
}
