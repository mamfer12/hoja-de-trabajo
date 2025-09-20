export type EntradaBeca = {
  promedio: number;        // 0..100
  asistencia: number;      // 0..100 (%)
  creditos: number;        // 0..30 (ejemplo)
  tieneSancionActiva: boolean;
};

export type ResultadoBeca = 'APROBADA' | 'RECHAZADA';

/**
 * Regla de negocio:
 * APROBADA ⇔ (promedio ≥ 85) ∧ (asistencia ≥ 80) ∧ (créditos ≥ 15) ∧ (sin sanción activa)
 */
export function evaluarBeca(
  { promedio, asistencia, creditos, tieneSancionActiva }: EntradaBeca
): ResultadoBeca {
  const P = promedio >= 85;
  const A = asistencia >= 80;
  const C = creditos >= 15;
  const S = !tieneSancionActiva; // Sin sanción

  return (P && A && C && S) ? 'APROBADA' : 'RECHAZADA';
}
