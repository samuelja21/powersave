# 🔋 PowerSave — Archivo de Contexto Completo del Proyecto

> **Proyecto de Máster en Ingeniería Informática**  
> Versión del documento: 1.0 — 2025  
> Objetivo financiero: **1.000.000 € de facturación en el primer año**

---

## 1. ¿Qué es PowerSave?

**PowerSave** es una plataforma SaaS B2B de monitoreo y optimización energética orientada a empresas medianas y grandes. Su propuesta central es ayudar a las empresas a reducir entre un **20% y un 35% su factura eléctrica** mediante sensores IoT instalados en sus instalaciones, combinados con inteligencia artificial que analiza los datos en tiempo real y genera recomendaciones accionables y priorizadas.

La plataforma opera bajo un modelo de **revenue sharing**: el cliente no paga una cuota fija hasta que no exista ahorro real demostrado, lo que elimina la fricción de adopción y alinea los incentivos entre PowerSave y el cliente.

El producto es accesible a través de una **web SaaS** (powersave.io) con una demo interactiva disponible online.

**Prototipo Figma:** https://www.figma.com/proto/aUYGYZlCHaPTinb8pNRF38/PowerSave?node-id=193-2

---

## 2. Equipo — Miembros de la Startup

El equipo está compuesto por estudiantes del Máster en Ingeniería Informática, con responsabilidades funcionales asignadas por módulo:

| Miembro    | Funcionalidades Asignadas |
|------------|--------------------------|
| **Edgard** | Consumo actual e identificación de picos/valles |
| **Abel**   | Predicción de consumo futuro · Análisis individualizado de sistemas |
| **Adrià**  | Ver plan actual contratado · Benchmark sectorial |
| **Samuel** | Recomendaciones (Quick Actions y costosas) · Generador de informes customizable |
| **Brandon** | Identificación de irregularidades (periodos 15 min) · Simulador de autoconsumo solar |

---

## 3. Propuesta de Valor

### Ahorro y Eficiencia
- Reducción media del **20–35% en la factura energética** mediante recomendaciones de IA personalizadas y un plan de acción priorizado.
- Detección automática de consumos ineficientes e identificación de equipos con rendimiento degradado.

### Visibilidad y Control
- Monitoreo en **tiempo real** del consumo energético con alertas configurables por umbral.
- Dashboard centralizado con KPIs energéticos y predicción de consumo futuro a 30 y 90 días.

### Reporting y Cumplimiento Normativo
- Informes automatizados para auditorías energéticas y reporting ESG (CSRD, GRI, ISO 50001, Directiva 2023/1791).
- Benchmark sectorial: comparativa con empresas del mismo sector (datos anonimizados).

### Autoconsumo Solar
- Simulador de rentabilidad de instalación fotovoltaica con ROI estimado en menos de 4 años.
- Integración con producción solar existente para optimizar el autoconsumo.

---

## 4. Segmentos de Clientes

### Grandes Empresas (Enterprise)
- Empresas industriales con más de 500 empleados y alto consumo energético (> 500 MWh/año).
- Ejemplos: Mercadona, El Corte Inglés, Inditex, ArcelorMittal.
- Parques empresariales y portfolios de edificios comerciales.

### Empresas Medianas (Mid-Market)
- PYMEs industriales y de servicios con consumo entre 50 y 500 MWh/año.
- Hoteles (NH Hotels, Meliá), hospitales privados, centros logísticos.
- Clínicas, colegios concertados, superficies retail medianas.

### Criterios de Segmentación
- Factura eléctrica mensual superior a 5.000 €.
- Instalaciones con maquinaria industrial o climatización intensiva.
- Objetivos ESG o compromisos de descarbonización corporativos.
- Sectores principales: Industria, Retail, Hostelería, Logística, Salud.

---

## 5. Modelo de Precios

El modelo de precios de PowerSave se basa en **revenue sharing sobre el ahorro real generado**, con tres planes diferenciados:

### Plan STARTER — 0% (sin comisión)
**"Descubre lo que podemos hacer"**

- Acceso a datos de consumo en tiempo real con gestión inteligente.
- Descubre tus porcentajes de consumo por áreas y recibe recomendaciones a medida.
- Encuentra máquinas problemáticas y toma acciones.
- **Cobertura:** Hasta 5 máquinas + 1 subcuadro.

### Plan GROW — 20% del ahorro generado
**"Bienvenido al ahorro"**

- Toda la funcionalidad del plan Starter.
- Potencia hasta 20 máquinas.
- Acuerdo estratégico de colaboración por un año.
- **Cobertura:** Hasta 20 máquinas + todos los subcuadros.
- Una PYME mediana española gasta ~40.000 €/año en energía — GROW devuelve ese dinero desde el primer mes.

### Plan PRO — 30% del ahorro generado
**"Potencia todo tu arsenal"**

- Todo lo del plan Grow y Starter.
- Visualiza tu ahorro con un set de herramientas completo.
- El hardware (~139,99 €/máquina, pago único) se recupera en 4–8 semanas con el ahorro generado.
- Prueba piloto gratuita en 5 máquinas durante un mes.
- **Cobertura:** 100% — Todas las máquinas y zonas.
- Una planta con factura de 8.000 €/mes puede ahorrar entre **15.000 y 35.000 €/año** optimizando a nivel de máquina — equivalente a contratar un empleado a jornada completa.

---

## 6. Infraestructura Hardware

### Kit de Referencia — Nave Mediana
*(4 subcuadros · 12 máquinas industriales · 8 equipos pequeños)*

| Capa | Dispositivo | Cantidad | Coste Hardware | Instalación |
|------|------------|----------|----------------|-------------|
| **C1 — Cuadro General** | Circutor CVM-C10 | 1 ud. | 114 € | 1h · 65 € |
| **C2 — Subcuadros por Zona** | Shelly Pro 3EM | 4 ud. | 508 € (127 €/ud) | 4h · 260 € |
| **C3A — Máquinas Industriales** | Circutor CVM-C10 + pinzas flex. | 12 ud. | 2.640 € (220 €/ud) | 8h · 520 € |
| **C3B — Máquinas Pequeñas** | Shelly Pro 1PM | 8 ud. | 200 € (25 €/ud) | Plug & play · 0 € |
| **C4 — Gateway/Conectividad** | Router 4G industrial + Switch DIN | 1 kit | 165 € | 1h · 65 € |

**TOTAL KIT MVP (hardware + instalación): ~4.667 €**  
Recuperación en menos de 3 semanas con factura ≥ 40.000 €/mes.

---

## 7. Capas de Análisis y Ahorro Potencial

Cada capa del sistema de sensores genera un tipo específico de detección y ahorro:

| Capa | Qué mide | Qué detecta PowerSave | Funcionalidades relacionadas | Ahorro típico |
|------|----------|----------------------|------------------------------|---------------|
| **C1 — Cuadro General** | Consumo total, tensión/corriente por fase, factor de potencia, armónicos, picos de demanda | Picos de arranque que disparan la potencia contratada · Factor de potencia bajo → penalizaciones · Distorsiones que dañan máquinas | Consumo actual · Identificación picos/valles · Irregularidades | 300–800 €/mes |
| **C2 — Subcuadros por Zona** | Consumo desglosado por zona (producción, clima, iluminación, oficinas) · Curva horaria por zona | Zonas consumiendo fuera de horario laboral · Climatización de nave vacía · Zona desproporcionada en la factura | Recomendaciones · Predicción consumo · Historial mejoras | 1.500–3.000 €/mes |
| **C3A — Máquinas Industriales** | Consumo por máquina en tiempo real · Curva de arranque · Consumo en vacío · Comparativa entre máquinas iguales | Máquinas degradadas (aceite, juntas, desgaste) · Consumo en vacío excesivo · Anomalías vs. histórico o vs. máquinas similares | Análisis por sistema · Recomendaciones · Predicción de avería | 500–2.000 €/mes |
| **C3B — Máquinas Pequeñas** | Consumo por enchufe individual · Stand-by nocturno · Horario de uso real | Equipos consumiendo sin producir · Stand-by 24h · Equipos olvidados encendidos fuera de horario | Quick Actions · Alerta consumo fantasma | 160–300 €/mes |
| **C4 — Gateway** | Transmisión continua de todos los sensores · Backup 4G si falla WiFi · Sincronización de timestamps | Garantía de datos completos y continuos — sin huecos en el histórico · Dato imprescindible para auditoría ISO 50001 | Informes ESG · Auditoría Directiva 2023/1791 · Cumplimiento normativo | Cumplimiento |

**Ahorro total potencial combinando todas las capas: 2.460 — 6.100 €/mes · 30.000 — 73.000 €/año**

---

## 8. Funcionalidades del Producto

A continuación, todas las funcionalidades definidas en el backlog del proyecto, con su descripción detallada y responsable:

---

### F1 — Consumo Actual e Identificación de Picos/Valles
**Responsable:** Edgard

El día se divide en 3 periodos tarifarios: **Punta, Llano y Valle**, cada uno con distinto coste. Esta funcionalidad muestra el consumo de la empresa en los diferentes momentos del día para visualizar si se está usando más energía cuando la tarifa es más cara, neutral o más barata. Permite tomar decisiones más fáciles de optimización futura del sistema.

---

### F2 — Predicción de Consumo Futuro (Semana, Mes…)
**Responsable:** Abel

Realiza una predicción del consumo futuro del cliente (semanal, mensual, etc.) con el fin de analizar tendencias y ofrecer recomendaciones basadas en dicha estimación. Se puede ver la predicción con la configuración actual y también simulando qué pasaría si se aplicasen cada una de las mejoras sugeridas.

---

### F3 — Ver Plan Actual Contratado
**Responsable:** Adrià

Revisión del plan energético actual del cliente (tarifa, consumo y facturas de la comercializadora), análisis del ahorro generado y visualización de la tarifa que PowerSave aplica sobre dicho ahorro dentro de la propuesta comercial.

---

### F4 — Recomendaciones (Segmentadas por Coste)
**Responsable:** Samuel

Listado de recomendaciones generadas a partir de los análisis de los datos de consumo, divididas en dos apartados:
- **Quick Actions:** Acciones que no requieren mucho gasto.
- **Acciones costosas:** Acciones de mayor inversión pero mayor impacto.

Para cada recomendación se especifica por qué se genera, el coste que supone y el impacto previsto en el ahorro.

---

### F5 — Identificación de Irregularidades de Consumo (Periodos de 15 min)
**Responsable:** Brandon

Las empresas tienen una potencia contratada que se mide en periodos de 15 minutos. Si se supera la potencia contratada, se generan penalizaciones económicas. Si se contrata más potencia de la necesaria, se paga de más. Esta funcionalidad analiza dichos intervalos de 15 minutos para detectar ambos tipos de ineficiencia.

---

### F6 — Simulador de Autoconsumo Solar
**Responsable:** Brandon

PowerSave convierte una pregunta compleja — ¿me sale a cuenta lo solar? — en una respuesta clara y personalizada. Esta funcionalidad le dice a una PYME si le conviene instalar paneles solares. Con los datos de consumo real de la empresa, su ubicación y el tamaño de su tejado, la plataforma calcula:
- Cuántos paneles necesita.
- Cuánto dinero va a ahorrar al año.
- En cuántos años recupera la inversión (ROI < 4 años estimado).
- Qué ayudas del gobierno puede aprovechar.
- Cuánto CO₂ deja de emitir.

---

### F7 — Historial de Mejoras Implementadas
**Responsable:** Por asignar

Registro histórico de recomendaciones ya implementadas por la empresa, para que el cliente pueda ver todo lo que ha actuado hasta la fecha y cuantificar el impacto acumulado de sus decisiones.

---

### F8 — Generador de Informes Customizable
**Responsable:** Samuel

Generación de un informe energético (diario, semanal, mensual, trimestral…) totalmente personalizable según los datos de interés del cliente. Incluye:
- Automatización en la obtención y distribución de informes.
- Exportación a formatos ESG para memorias de sostenibilidad.
- Seguimiento de objetivos alineados con metas internas.
- Auditoría energética guiada con checklist y recomendaciones.
- Informes automáticos para certificaciones (ISO 50001, CSRD, GRI, Directiva 2023/1791).

---

### F9 — Análisis Individualizado de los Sistemas que Consumen Energía
**Responsable:** Abel

Sección que muestra todos los orígenes de consumo energético (máquinas, luces, sistemas de climatización, etc.), marcando qué componentes tienen mayor impacto en el consumo total y mostrando cómo está de optimizado cada componente de forma individual.

---

### F10 — Benchmark Sectorial
**Responsable:** Adrià

Análisis del consumo real de la empresa, comparándolo con negocios del mismo sector, tamaño y zona geográfica. Muestra en qué percentil se sitúa el cliente y cuánto está pagando de más respecto a la media del sector (datos anonimizados).

---

### F11 — Gráficos Antes y Después
Visualización comparativa del consumo/coste antes y después de implementar mejoras, para demostrar de forma gráfica y tangible el impacto real de las optimizaciones realizadas.

---

### F12 — Marketplace de Mejoras Energéticas
Un panel dentro de la app donde la empresa puede acceder a servicios físicos instalables en su negocio, contextualizados siempre con sus propios datos de consumo. No es un catálogo genérico: cada oferta se presenta porque los datos del cliente indican que tiene sentido específicamente para él.

---

## 9. Actividades Clave

### Desarrollo de Plataforma
- Desarrollo continuo de la plataforma SaaS de monitoreo energético.
- Entrenamiento y mejora de modelos de IA/ML con datos reales de consumo.
- Integración de APIs con ERPs (SAP, Oracle) y BMS de clientes.

### Operaciones
- Instalación y configuración de sensores IoT en clientes.
- Mantenimiento y soporte técnico 24/7 de la plataforma.
- Generación automatizada de informes de ahorro y cumplimiento ESG.

### Crecimiento
- Marketing digital B2B y gestión de partnerships.

---

## 10. Recursos Clave

### Tecnológicos
- Plataforma web SaaS de monitoreo (React + Node.js + Python).
- Modelos de IA propios para predicción y recomendaciones (TensorFlow).
- Base de datos de consumo energético sectorial (Azure SQL + Data Lake).

### Humanos
- Equipo de data scientists e ingenieros de software.
- Técnicos certificados para instalación IoT.

---

## 11. Socios Clave (Key Partnerships)

### Proveedores de Hardware IoT
- **Honeywell Building Solutions** — sensores industriales de energía certificados.
- **Schneider Electric** — medidores inteligentes y hardware de automatización.
- **Siemens Smart Infrastructure** — dispositivos IoT y sistemas SCADA.

### Servicios Cloud y Datos
- **Microsoft Azure** — infraestructura cloud, IoT Hub y servicios de IA.
- **Amazon Web Services (AWS)** — almacenamiento S3, Lambda y analytics.

### Instalación y Logística
- **Ferrovial Servicios** — instalación técnica en edificios e industria.
- **Veolia** — gestión energética y mantenimiento de instalaciones.

### Energía Solar
- **Endesa X** — suministro e instalación de placas fotovoltaicas.
- **Iberdrola Smart Solar** — integración autoconsumo solar.

---

## 12. Relación con Clientes

### Adquisición
- Onboarding guiado: instalación de sensores + configuración de plataforma en menos de 2 semanas.
- Demo personalizada con datos reales del sector del cliente.

### Retención
- Customer Success Manager dedicado para cuentas enterprise.
- Soporte técnico por ticketing con SLA: 4h respuesta / 24h resolución.
- Revisiones trimestrales de ahorro y nuevas oportunidades de optimización.

### Fidelización
- Programa de referidos con descuentos en renovación de contrato.
- Acceso anticipado a nuevas funcionalidades.

---

## 13. Canales de Venta

### Ventas Directas
- Equipo comercial B2B (Account Executives especializados por sector).
- LinkedIn Sales Navigator + outreach directo a Facility Managers y CFOs.

### Digital
- Web powersave.io + demo interactiva online.
- SEO/SEM en búsquedas de eficiencia energética y ahorro energético para empresas.

### Partnerships
- Canal indirecto a través de consultoras energéticas (Grupo Cobra, Acciona Energía).

---

## 14. Estructura de Costes

| Concepto | Coste Estimado |
|----------|----------------|
| Sensores IoT (Honeywell / Schneider) | ~150–400 €/sensor · amortizado 5 años |
| Infraestructura Cloud Azure/AWS | ~3.000–15.000 €/mes según clientes activos |
| Transporte e instalación técnica (Ferrovial) | ~500–2.000 €/cliente (one-time) |
| Equipo de desarrollo y data science | ~250.000–400.000 €/año (6–8 personas) |
| Licencias software (Tableau, GitHub, Jira…) | ~15.000 €/año |
| Marketing B2B y eventos sectoriales | ~50.000–80.000 €/año |

---

## 15. Fuentes de Ingresos (Revenue Streams)

| Fuente | Tarifa |
|--------|--------|
| Suscripción SaaS mensual (plataforma) | 500–3.000 €/mes/cliente según nº sensores y módulos |
| Venta e instalación de sensores IoT | 200–600 €/sensor instalado (hardware + servicio) |
| Proyectos de instalación solar (comisión) | 5–8% del valor del proyecto (canal Endesa X / Iberdrola) |
| Consultoría energética avanzada | 2.000–8.000 €/proyecto de auditoría y optimización |
| Informes ESG y reporting regulatorio | 500–1.500 €/informe trimestral personalizado |
| Integración y desarrollo a medida (enterprise) | 5.000–20.000 € (one-time setup fee grandes cuentas) |

---

## 16. Objetivo Financiero: 1.000.000 € en el Primer Año

El equipo de PowerSave tiene como objetivo alcanzar **1.000.000 € de facturación** durante el primer año de operación. Este objetivo es compatible con el modelo de revenue sharing dado que:

- Una planta con factura de 8.000 €/mes puede generar un ahorro entre 15.000 y 35.000 €/año.
- Con el plan PRO (30% del ahorro), eso representa entre 4.500 y 10.500 €/año por cliente solo en comisiones de ahorro.
- Combinando los ingresos por SaaS, hardware, consultoría e informes ESG, el modelo escala de forma predecible con cada nuevo cliente.

---

## 17. Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React |
| Backend | Node.js + Python |
| IA / ML | TensorFlow (modelos propios de predicción y recomendaciones) |
| Base de Datos | Azure SQL + Data Lake |
| Cloud | Microsoft Azure (IoT Hub, IA) + AWS (S3, Lambda, Analytics) |
| Diseño UI | Figma + Material Design 3 (m3.material.io) |
| Iconos | Icons8 |
| Gestión | GitHub + Jira |
| Reporting | Tableau |

### Paleta de Colores
- `#248838` — Verde principal oscuro
- `#77B732` — Verde secundario
- `#27A35B` — Verde medio (Behance)
- Blanco y Negro como colores base

---

## 18. Cumplimiento Normativo y ESG

PowerSave facilita el cumplimiento de las siguientes normativas y estándares:

- **CSRD** (Corporate Sustainability Reporting Directive)
- **GRI** (Global Reporting Initiative)
- **ISO 50001** — Sistemas de gestión de la energía
- **Directiva 2023/1791** del Parlamento Europeo sobre eficiencia energética

---

## 19. Recursos de Diseño

- **Prototipo Figma:** https://www.figma.com/proto/aUYGYZlCHaPTinb8pNRF38/PowerSave?node-id=193-2&t=P3ILFIsMRNbLvVJn-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=119%3A39
- **Guía Material Design:** https://m3.material.io
- **Iconos:** https://iconos8.es/icons/set/gear
- **Inspiración UI:** Figma Community + Behance

---

*Documento generado para uso interno del equipo PowerSave — Máster en Ingeniería Informática 2025*
