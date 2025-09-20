import { evaluarBeca, type EntradaBeca } from './beca';

const base: EntradaBeca = {
  promedio: 90,
  asistencia: 90,
  creditos: 18,
  tieneSancionActiva: false
};

describe('Clases de equivalencia (válidas / inválidas)', () => {
  test('Todos los criterios correctos → APROBADA', () => {
    expect(evaluarBeca(base)).toBe('APROBADA');
  });

  test('Promedio inválido (<85) → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, promedio: 84 })).toBe('RECHAZADA');
  });

  test('Asistencia inválida (<80) → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, asistencia: 79 })).toBe('RECHAZADA');
  });

  test('Créditos inválidos (<15) → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, creditos: 14 })).toBe('RECHAZADA');
  });

  test('Con sanción activa → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, tieneSancionActiva: true })).toBe('RECHAZADA');
  });
});

describe('Valores frontera', () => {
  // Promedio
  test('Promedio 84 → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, promedio: 84 })).toBe('RECHAZADA');
  });
  test('Promedio 85 → APROBADA', () => {
    expect(evaluarBeca({ ...base, promedio: 85 })).toBe('APROBADA');
  });
  test('Promedio 86 → APROBADA', () => {
    expect(evaluarBeca({ ...base, promedio: 86 })).toBe('APROBADA');
  });

  // Asistencia
  test('Asistencia 79 → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, asistencia: 79 })).toBe('RECHAZADA');
  });
  test('Asistencia 80 → APROBADA', () => {
    expect(evaluarBeca({ ...base, asistencia: 80 })).toBe('APROBADA');
  });
  test('Asistencia 81 → APROBADA', () => {
    expect(evaluarBeca({ ...base, asistencia: 81 })).toBe('APROBADA');
  });

  // Créditos
  test('Créditos 14 → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, creditos: 14 })).toBe('RECHAZADA');
  });
  test('Créditos 15 → APROBADA', () => {
    expect(evaluarBeca({ ...base, creditos: 15 })).toBe('APROBADA');
  });
  test('Créditos 16 → APROBADA', () => {
    expect(evaluarBeca({ ...base, creditos: 16 })).toBe('APROBADA');
  });

  // Sanción
  test('Sanción = true → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, tieneSancionActiva: true })).toBe('RECHAZADA');
  });
  test('Sanción = false (si lo demás cumple) → APROBADA', () => {
    expect(evaluarBeca({ ...base, tieneSancionActiva: false })).toBe('APROBADA');
  });
});

describe('Tabla de decisión — filas clave', () => {
  // P=F
  test('P=F, A=C=S=T → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, promedio: 84 })).toBe('RECHAZADA');
  });
  // A=F
  test('A=F, P=C=S=T → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, asistencia: 79 })).toBe('RECHAZADA');
  });
  // C=F
  test('C=F, P=A=S=T → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, creditos: 14 })).toBe('RECHAZADA');
  });
  // S=F
  test('S=F, P=A=C=T → RECHAZADA', () => {
    expect(evaluarBeca({ ...base, tieneSancionActiva: true })).toBe('RECHAZADA');
  });
  // P=A=C=S=T
  test('P=A=C=S=T → APROBADA', () => {
    expect(evaluarBeca(base)).toBe('APROBADA');
  });
});
