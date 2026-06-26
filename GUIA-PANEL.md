# Guía del Panel de Acción Directa Barcelona

Este documento explica cómo usar el panel de gestión del sitio web. Hay dos tipos de acceso: **Voluntario** y **Super Admin**.

---

## Cómo entrar al panel

Ve a la web y añade `/admin` al final de la URL:

```
https://[tu-dominio]/admin
```

Si no tienes cuenta todavía, ve a `/sign-up` para registrarte. Tu cuenta quedará pendiente hasta que un Super Admin la apruebe.

---

## Perfil Voluntario

### ¿Qué puede hacer?

Un voluntario tiene acceso a **una sola función**: registrar los materiales que recibe en su punto de recogida.

### Cómo registrar material recibido

1. Entra al panel con tu email y contraseña.
2. Verás el formulario **"Registrar material recibido"**.
3. Rellena los campos:
   - **Material** — qué has recibido (ej. "Gasas estériles")
   - **Cantidad** — cuánto (ej. "20 cajas")
   - **Punto de recogida** — selecciona tu punto del desplegable
   - **Donante** *(opcional)* — nombre de quien lo donó
   - **Notas** *(opcional)* — cualquier detalle adicional
   - **Foto** *(opcional)* — puedes hacer una foto del material con el móvil
4. Pulsa **"Añadir registro"**.

El registro queda guardado y el Super Admin puede verlo desde su panel.

### Cuenta pendiente de aprobación

Si al entrar ves un mensaje de "Tu cuenta está pendiente de aprobación", significa que el Super Admin aún no te ha dado acceso. Contacta con el equipo para que lo activen.

---

## Perfil Super Admin

El Super Admin tiene acceso completo al panel. Verá cuatro pestañas principales:

---

### Pestaña: Recibido

Muestra **todos** los registros de materiales recibidos por todos los voluntarios, incluyendo la columna "Voluntario" para saber quién lo registró.

También puede registrar material él mismo (mismo formulario que el voluntario).

---

### Pestaña: Solicitudes

Aquí aparecen las **solicitudes de ayuda** enviadas desde Venezuela a través del formulario público del sitio web.

Cada solicitud muestra:
- Nombre de la persona
- Contacto (teléfono / email / WhatsApp)
- Ubicación en Venezuela
- Qué materiales necesita
- Notas adicionales

**Cómo gestionar una solicitud:**

Cada tarjeta tiene un desplegable de estado con tres opciones:
- **Pendiente** — recién recibida, sin gestionar
- **En curso** — ya se ha contactado o se está tramitando
- **Atendida** — se ha resuelto

Cambia el estado según vayas gestionando cada caso.

---

### Pestaña: Enviado

Registro de los materiales que se han enviado a Venezuela.

**Cómo registrar un envío:**

1. Rellena el formulario de la izquierda:
   - **Material** — qué se está enviando
   - **Cantidad** — cuánto
   - **Destino** — dónde va (ciudad, hospital, zona)
   - **Destinatario** — persona u organización que lo recibe
   - **Notas** *(opcional)*
2. Pulsa **"Añadir envío"**.

Esto queda registrado para el seguimiento de transparencia.

---

### Pestaña: Usuarios

Aquí se gestiona quién tiene acceso al panel.

#### Aprobar nuevos voluntarios

Cuando alguien se registra en `/sign-up`, aparece en la sección **"Pendientes de aprobación"** con un botón verde **"Aprobar"**.

- Pulsa **Aprobar** para darle acceso como voluntario.
- Pulsa **Revocar** si quieres quitarle el acceso a alguien.
- Pulsa **Admin** si quieres promocionar a un voluntario a Super Admin.

#### Sección "Usuarios activos"

Muestra todos los voluntarios y admins ya aprobados. Puedes revocar o cambiar su rol en cualquier momento.

---

### Pestaña: Contenido

Esta pestaña permite editar la información que aparece en el sitio web **sin tocar código**. Tiene tres secciones:

#### Materiales e insumos necesarios

Lista de los materiales que se muestran en la sección "Qué necesitamos" de la web.

- **Editar** (lápiz): cambiar el nombre en español, catalán e inglés.
- **Activar/Desactivar** (interruptor): ocultar temporalmente un material de la web sin borrarlo.
- **Eliminar** (papelera): borrar definitivamente.
- **Añadir material**: botón verde arriba a la derecha para añadir uno nuevo.

#### Puntos de recogida en Barcelona

Lista de los puntos que aparecen en el mapa y las tarjetas de la web.

- **Editar**: cambiar nombre, dirección y coordenadas GPS (lat/lng para el mapa).
- **Activar/Desactivar**: quitar un punto del mapa sin borrarlo.
- **Eliminar**: borrar definitivamente.
- **Añadir punto**: botón para añadir uno nuevo.

> **Cómo obtener las coordenadas GPS:** busca la dirección en Google Maps, haz clic derecho sobre el punto exacto y copia las coordenadas (dos números separados por coma, ej. `41.4027, 2.1716`). El primero es la latitud y el segundo la longitud.

#### Aliados en Venezuela

Lista de las ONGs o contactos en Venezuela que reciben y distribuyen los materiales.

- **Editar**: cambiar nombre, descripción y enlace web.
- **Activar/Desactivar**: ocultar un aliado de la web temporalmente.
- **Añadir aliado**: botón para añadir una nueva organización.

---

## Resumen rápido

| Función | Voluntario | Super Admin |
|---|:---:|:---:|
| Registrar material recibido | ✅ | ✅ |
| Ver solicitudes de Venezuela | ❌ | ✅ |
| Gestionar estado de solicitudes | ❌ | ✅ |
| Registrar envíos | ❌ | ✅ |
| Ver registros de todos los voluntarios | ❌ | ✅ |
| Aprobar / revocar usuarios | ❌ | ✅ |
| Editar contenido del sitio web | ❌ | ✅ |

---

## Dudas o problemas

Si tienes algún problema para entrar o usar el panel, contacta con el equipo técnico por WhatsApp.
