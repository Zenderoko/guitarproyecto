# My Guitarra LA - E-commerce de Guitarras

Tienda en línea de guitars construido con Next.js y Stripe (Transbank/Webpay para Chile).

## Requisitos Previos

- Node.js 18+
- npm, yarn, pnpm o bun
- Servidor de Strapi corriendo en `http://localhost:1337`

## Instalación

```bash
# Instalar dependencias
npm install
# o
pnpm install
```

## Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
API_URL=http://localhost:1337/api
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Ejecutar el Proyecto

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

Abre [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
├── components/       # Componentes React
├── helpers/         # Funciones auxiliares
├── hooks/           # Custom hooks
├── pages/           # Páginas y rutas API
│   ├── api/         # API routes
│   └── pago/        # Páginas de pago
├── public/          # Archivos estáticos
├── store/           # Estado global (Zustand)
└── styles/          # Archivos CSS Modules
```

## Sistema de Pago (Transbank/Webpay)

### Modo Pruebas (Integración)

El proyecto viene configurado para usar el ambiente de pruebas de Transbank. Usa las tarjetas de prueba documentación: https://www.transbankdevelopers.cl/documentacion/como_empezar#tarjetas-de-prueba

### Modo Producción

Para usar en producción:

1. Obtén tus credenciales de Transbank en: https://www.transbankdevelopers.cl

2. Modifica `pages/api/pago/init.js` y `pages/api/pago/response.js`:

```javascript
// Reemplaza:
Environment.Integration
IntegrationCommerceCodes.WEBPAY_PLUS
IntegrationApiKeys.WEBPAY

// Por tus credenciales de producción:
Environment.Production
TU_CODIGO_DE_COMERCIO
TU_API_KEY
```

### Flujo de Pago

1. Usuario agrega productos al carrito
2. Click en "Total a Pagar" → redirecciona a `/pago`
3. Página de checkout muestra resumen del pedido
4. Opción de editar cantidades antes de pagar
5. Click "Pagar con Webpay" → redirecciona a Transbank
6. Usuario completa pago con tarjeta
7. Transbank redirecciona de vuelta a `/pago/success` o `/pago/failed`

## Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Verificar código
```

## Tech Stack

- Next.js 16
- React 19
- Zustand (gestión de estado)
- CSS Modules
- Transbank SDK (Webpay Plus)