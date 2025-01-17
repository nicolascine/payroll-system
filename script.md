# 🎯 Script Demo: Sistema de Cálculo de Liquidaciones

## 1. Introducción (2 min)
- Problema: Excel manual → Proceso automático
- Impacto: 100,000+ empresas, múltiples administradores
- Objetivo: Automatización y escalabilidad

## 2. Arquitectura (3 min)
### Componentes:
- Frontend (Next.js):
  * UI para subida de Excel
  * Monitoreo de procesos
  * Dashboard de resultados

- Backend (NestJS):
  * API Gateway
  * Validación de datos
  * Procesamiento asíncrono

- Queue System (Bull + Redis):
  * Cola de procesamiento
  * Manejo de carga masiva
  * Monitoreo en tiempo real

- Base de Datos (PostgreSQL):
  * Almacenamiento transaccional
  * Histórico de cálculos
  * Auditoría

## 3. Flujo de Datos (2 min)
1. Upload Excel → API
2. Validación → Queue
3. Procesamiento → Resultado
4. Notificación → Frontend

## 4. Cálculo de Liquidaciones
### Fórmulas Base:
```typescript
// Ingresos
regularPay = regularHours × $20
overtimePay = overtimeHours × $20 × 1.5
sickLeavePay = sickHours × $20
vacationPay = vacationHours × $20

// Total Bruto
grossPay = regularPay + overtimePay + sickLeavePay + vacationPay

// Descuentos
taxDeduction = grossPay × 0.20    // Impuesto a la renta (20%)
healthDeduction = grossPay × 0.07  // Salud (7%)
pensionDeduction = grossPay × 0.10 // AFP/Pensión (10%)

// Total Descuentos
totalDeductions = taxDeduction + healthDeduction + pensionDeduction

// Líquido
netPay = grossPay - totalDeductions
```

### Ejemplo Práctico:
```typescript
// Para 160 horas regulares + 15 horas extra
regularPay = 160 × $20 = $3,200
overtimePay = 15 × $20 × 1.5 = $450
grossPay = $3,650

// Descuentos
taxDeduction = $3,650 × 0.20 = $730
healthDeduction = $3,650 × 0.07 = $255.50
pensionDeduction = $3,650 × 0.10 = $365

netPay = $3,650 - ($730 + $255.50 + $365) = $2,299.50
```

## 5. Demo vía API (Postman)

### 1. Cálculo Simple
```bash
POST http://localhost:3001/api/payroll/calculate
Content-Type: application/json

{
  "companyId": 1,
  "period": "2024-03",
  "attendanceList": [{
    "employeeId": 1,
    "regularHours": 160,
    "overtimeHours": 15,
    "sickLeaveHours": 0,
    "vacationHours": 0,
    "absenceHours": 0
  }]
}
```

### 2. Verificar Job
```bash
GET http://localhost:3001/api/payroll/job/{{jobId}}
```

### 3. Descargar Template
```bash
GET http://localhost:3001/api/payroll/sample
```

### 4. Subir Excel
```bash
POST http://localhost:3001/api/payroll/upload
Content-Type: multipart/form-data
file: @/path/to/sample-attendance.xlsx
```

### 5. Monitoreo Queue
```bash
GET http://localhost:3001/admin/queues
```

## 6. Decisiones Técnicas
### PROS:
- NestJS: Framework empresarial, modular
- Queue System: Escalabilidad, resilencia
- Docker: Despliegue consistente
- TypeScript: Tipado fuerte, menos errores

### CONS:
- Complejidad inicial
- Overhead en desarrollo
- Curva de aprendizaje
- Costos de infraestructura

## 7. Demo en Vivo (5 min)
1. Mostrar UI
2. Subir Excel
3. Ver procesamiento
4. Revisar resultado
5. Mostrar monitoreo

## 8. Artefactos Principales
### Frontend:
- `page.tsx`: UI principal
- `ExcelUpload.tsx`: Componente de carga
- `layout.tsx`: Estructura base

### Backend:
- `payroll.service.ts`: Lógica de negocio
- `payroll.controller.ts`: Endpoints API
- `main.ts`: Configuración

### Queue:
- Bull Queue: Procesamiento asíncrono
- Bull Board: Monitoreo visual

## 9. Puntos Clave para Demo
- Enfatizar automatización
- Mostrar escalabilidad
- Destacar monitoreo
- Explicar validaciones
- Demostrar resultado final

## 🤔 Preguntas Frecuentes Adicionales

### 7. Cálculos
Q: "¿Por qué esos porcentajes de descuento?"
R: "Basados en requerimientos típicos:
   - 20% impuesto progresivo estándar
   - 7% salud obligatorio
   - 10% pensión/AFP base
   - Configurable por empresa/país"

### 8. Procesamiento
Q: "¿Cómo manejas errores en cálculos?"
R: "Sistema robusto:
   - Validación previa de inputs
   - Logging detallado
   - Rollback automático
   - Notificación de errores"

### 9. Integración
Q: "¿Cómo se integra con sistemas externos?"
R: "Diseño flexible:
   - API RESTful documentada
   - Webhooks para notificaciones
   - Formatos estándar (JSON/Excel)
   - Autenticación OAuth2"

## 📝 Tips para Demo API
1. Tener colección Postman lista
2. Mostrar ejemplos pre-configurados
3. Destacar validaciones de input
4. Explicar códigos de respuesta
5. Demostrar manejo de errores

## 🎯 Flujo Demo API
1. Descargar template → Mostrar estructura
2. Calcular un empleado → Ver proceso
3. Calcular múltiples → Demostrar escalabilidad
4. Provocar error → Mostrar validaciones
5. Revisar queue → Explicar async

## 💡 Puntos a Enfatizar
1. Validación robusta de inputs
2. Cálculos precisos y auditables
3. Procesamiento asíncrono escalable
4. Monitoreo en tiempo real
5. API documentada y amigable

## 📝 Notas Importantes
1. Mantener demo simple
2. Tener Excel ejemplo listo
3. Verificar servicios antes
4. Tener backup plan
5. Destacar valor negocio

## 🚨 Troubleshooting
- Servicios caídos → Docker restart
- Excel inválido → Usar ejemplo
- API error → Verificar logs
- Queue stuck → Clear Redis
