
import { MesaRepository } from "../Servicios/MesaRepository";
import { RespuestaProfesorService } from "../Servicios/RespuestaProfesorService";
import { NotificacionService } from "./NotificacionService";

export class SistemaExamenFacade {
  static confirmar(idProfesor: any, idMesa: any) {
    throw new Error("Method not implemented.");
  }
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
    materia: string;
    fecha: string;
    hora: string;
    modalidad: string;
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
