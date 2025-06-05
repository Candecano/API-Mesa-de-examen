export interface Mesa {
  idMesa: number;
  Materia: string;
  fecha: string;
  Modalidad: string;
}

const BASE_URL = "http://localhost:3000/api";

export async function obtenerMesas(idProfesor: number): Promise<Mesa[]> {
  const response = await fetch(`http://localhost:3000/api/mesas/${idProfesor}`);
  if (!response.ok) throw new Error("Error al obtener mesas");
  return await response.json();
}


export async function confirmarMesa(idMesa: number): Promise<void> {
  await fetch(`${BASE_URL}/mesa/confirmar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idMesa }),
  });
}

export async function rechazarMesa(idMesa: number): Promise<void> {
  await fetch(`${BASE_URL}/mesa/rechazar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idMesa }),
  });
}
