# **Actividad Práctica**: Autenticación y Autorización con React y Auth0

- [**Actividad Práctica**: Autenticación y Autorización con React y Auth0](#actividad-práctica-autenticación-y-autorización-con-react-y-auth0)
  - [**Descripción**:](#descripción)
  - [**Herramientas y librerías**:](#herramientas-y-librerías)
  - [**Guía en etapas**:](#guía-en-etapas)
    - [**Etapa1: Configuración Inicial**:](#etapa1-configuración-inicial)
      - [1. Configura un nuevo proyecto React](#1-configura-un-nuevo-proyecto-react)
      - [2. Instala las dependencias necesarias](#2-instala-las-dependencias-necesarias)
    - [**Etapa 2 - Diseño de la UI**:](#etapa-2---diseño-de-la-ui)
      - [1. Configuración de Bootstrap](#1-configuración-de-bootstrap)
      - [2. Crear la navegación](#2-crear-la-navegación)
      - [3. Páginas](#3-páginas)
        - [a. Inicio](#a-inicio)
        - [b. Iniciar sesión y Registro](#b-iniciar-sesión-y-registro)
        - [c. Perfil de usuario](#c-perfil-de-usuario)
        - [d. Panel de administrador](#d-panel-de-administrador)
    - [**Etapa 3: Configuración de Auth0**:](#etapa-3-configuración-de-auth0)
    - [**Etapa 4: Integración con Auth0**:](#etapa-4-integración-con-auth0)
      - [1. Configuración del Proveedor de Auth0](#1-configuración-del-proveedor-de-auth0)
      - [2. Iniciar Sesión y Cerrar Sesión](#2-iniciar-sesión-y-cerrar-sesión)
      - [3. Mostrar Información del Usuario](#3-mostrar-información-del-usuario)
    - [**Etapa 5: Rutas Protegidas**:](#etapa-5-rutas-protegidas)
      - [1. Creación de una ruta protegida (corregido)](#1-creación-de-una-ruta-protegida-corregido)
      - [2. Utilizar `ProtectedRoute` (corregido)](#2-utilizar-protectedroute-corregido)
    - [**Etapa 6: Autorización**:](#etapa-6-autorización)
      - [1. Configurando Roles en Auth0](#1-configurando-roles-en-auth0)
      - [2. Accediendo a Roles en la Aplicación](#2-accediendo-a-roles-en-la-aplicación)
      - [3. Creando un Hook para Comprobar el Rol](#3-creando-un-hook-para-comprobar-el-rol)
      - [4. Usando el Hook en Rutas Protegidas](#4-usando-el-hook-en-rutas-protegidas)
    - [**Etapa 7: Pruebas**:](#etapa-7-pruebas)


## **Descripción**:

El objetivo de esta actividad es implementar un sistema de autenticación y autorización en una aplicación React utilizando Auth0. Los usuarios deberán poder registrarse, iniciar sesión, acceder a sus perfiles y, si tienen el rol adecuado, acceder a un panel de administrador.

## **Herramientas y librerías**:

- **React**: Para construir nuestra interfaz de usuario.
- **Auth0**: Como proveedor de autenticación y autorización.
- **react-router-dom**: Para gestionar la navegación y rutas de la aplicación.
- **react-hook-form**: Para gestionar formularios y validaciones.
- **bootstrap** y **react-bootstrap**: Para el diseño y estilización de la aplicación.

## **Guía en etapas**:

### **Etapa1: Configuración Inicial**:
   
   - Configura un nuevo proyecto React.
   - Instala las dependencias necesarias: `react-router-dom`, `react-hook-form`, `bootstrap`, `react-bootstrap`, y `@auth0/auth0-react`.

#### 1. Configura un nuevo proyecto React

Para iniciar un nuevo proyecto en React, utiliza el paquete `create-react-app`, que es una herramienta que configura automáticamente un nuevo proyecto React sin necesidad de configurar manualmente webpack o babel.

```bash
npx create-react-app react_actividad_seguridad
```

Luego, navega a la carpeta del proyecto:

```bash
cd react_actividad_seguridad
```

#### 2. Instala las dependencias necesarias

Para instalar las bibliotecas requeridas, ejecuta el siguiente comando:

```bash
npm install react-router-dom react-hook-form bootstrap react-bootstrap @auth0/auth0-react
```

Este comando instalará:

- `react-router-dom`: para la gestión de rutas en nuestra aplicación.
- `react-hook-form`: para manejar formularios y validaciones.
- `bootstrap`: para estilizar y diseñar la aplicación.
- `react-bootstrap`: componentes de Bootstrap adaptados para React.
- `@auth0/auth0-react`: SDK de Auth0 para integrar fácilmente la autenticación de Auth0 con aplicaciones React.

¡Listo! Ahora tienes un nuevo proyecto React con todas las bibliotecas necesarias para empezar a trabajar en la autenticación y autorización con Auth0.


### **Etapa 2 - Diseño de la UI**:

   - Diseña las siguientes páginas usando `bootstrap` y `react-bootstrap`: 
     - Inicio
     - Iniciar sesión
     - Registro (opcional, ya que Auth0 proporciona una página de inicio de sesión/registro por defecto)
     - Perfil de usuario
     - Panel de administrador

#### 1. Configuración de Bootstrap

Asegúrate de que `bootstrap` y `react-bootstrap` estén correctamente instalados e importa el CSS de Bootstrap en tu archivo `src/index.js`:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

#### 2. Crear la navegación

Configura una barra de navegación con `react-bootstrap` en un componente `Navbar.js`:

```javascript
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/">Mi App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
        <Nav.Link href="/login">Iniciar sesión</Nav.Link>
        <Nav.Link href="/profile">Perfil</Nav.Link>
        <Nav.Link href="/admin">Panel Admin</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
```

#### 3. Páginas

##### a. Inicio

Crea una página de bienvenida que describa tu aplicación.

La página de inicio generalmente sirve como una introducción a tu aplicación. A continuación, se presenta un diseño básico para la página de inicio utilizando `react-bootstrap`.

```javascript
import React from 'react';
import { Container, Jumbotron, Button } from 'react-bootstrap';

const HomePage = () => (
  <Container className="mt-5">
    <Jumbotron>
      <h1>Bienvenido a Mi App</h1>
      <p>
        Esta es una aplicación de demostración para implementar autenticación y autorización con React y Auth0.
      </p>
      <p>
        <Button variant="primary" href="/login">Iniciar sesión</Button>
      </p>
    </Jumbotron>
  </Container>
);

export default HomePage;
```

##### b. Iniciar sesión y Registro

Diseña una página inicial que redirija al usuario a la interfaz de Auth0 al hacer clic en un botón de "Iniciar sesión" o "Registrarse".

Esta página actuará como un portal para que los usuarios sean redirigidos a la página de inicio de sesión de Auth0. A continuación, se presenta un diseño básico para la página de inicio de sesión utilizando `react-bootstrap` y el hook de `useAuth0` para gestionar la autenticación.

```javascript
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container className="mt-5">
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <Card.Body>
          <Card.Title>Iniciar Sesión</Card.Title>
          <Card.Text>
            Haz clic en el botón de abajo para iniciar sesión o registrarte.
          </Card.Text>
          <Button variant="primary" onClick={() => loginWithRedirect()}>Iniciar Sesión con Auth0</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
```

##### c. Perfil de usuario

Diseña una página que mostrará la información del usuario una vez autenticado, como nombre, imagen y correo electrónico.

La página de perfil permitirá a los usuarios ver detalles de su cuenta una vez que hayan iniciado sesión. Utilizaremos `react-bootstrap` para el diseño y el hook `useAuth0` para obtener detalles del usuario autenticado.


```javascript
import React from 'react';
import { Container, Card, Image } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  return (
    <Container className="mt-5">
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <Card.Body>
          <Image src={user.picture} roundedCircle fluid alt="User profile" />
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            Email: {user.email}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
```

##### d. Panel de administrador

Diseña una página protegida que solo los usuarios con el rol de "administrador" puedan acceder.

La página del Panel de Administrador será un área donde los usuarios con el rol de administrador podrán ver y gestionar distintas funcionalidades de la plataforma. Utilizaremos `react-bootstrap` para el diseño.

```javascript
import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

const AdminPanel = () => {
  return (
    <Container className="mt-5">
      <h2>Panel de Administrador</h2>
      <p>Desde aquí puedes gestionar distintos aspectos de la plataforma:</p>
      <ListGroup className="mb-3">
        <ListGroup.Item>Gestionar Usuarios</ListGroup.Item>
        <ListGroup.Item>Ver Estadísticas</ListGroup.Item>
        <ListGroup.Item>Configurar Parámetros</ListGroup.Item>
      </ListGroup>
      <Button variant="danger">Cerrar Sesión</Button>
    </Container>
  );
};

export default AdminPanel;
```

### **Etapa 3: Configuración de Auth0**:

   - Crea una cuenta en Auth0 si aún no tienes una.
   - Configura una nueva aplicación en el dashboard de Auth0.
   - Toma nota de tu `Domain` y `Client ID`, los necesitarás para la configuración en React.
  
### **Etapa 4: Integración con Auth0**:

   - Configura el proveedor de Auth0 en tu aplicación.
   - Implementa las funcionalidades de inicio de sesión y cierre de sesión.
   - Muestra la información del perfil del usuario autenticado.

La integración con Auth0 permitirá a los usuarios iniciar sesión, registrarse y autenticarse en nuestra aplicación de manera segura. 

#### 1. Configuración del Proveedor de Auth0

Para comenzar, debes envolver tu aplicación con el `Auth0Provider`, que es proporcionado por el SDK de Auth0 para React. Esto normalmente se hace en el archivo principal, como `index.js`.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="TU_DOMINIO_DE_AUTH0"
    clientId="TU_CLIENT_ID_DE_AUTH0"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
```

#### 2. Iniciar Sesión y Cerrar Sesión

En cualquier componente donde quieras ofrecer funcionalidad de inicio o cierre de sesión, puedes utilizar el hook `useAuth0`.

```javascript
import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Iniciar Sesión</Button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Button onClick={() => logout({ returnTo: window.location.origin })}>Cerrar Sesión</Button>;
};
```

#### 3. Mostrar Información del Usuario

Para mostrar información del usuario autenticado, como en la página de perfil, puedes usar el hook `useAuth0`.

```javascript
import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  return (
    <Card style={{ width: '18rem', margin: '0 auto' }}>
      <Card.Body>
        <Image src={user.picture} roundedCircle fluid alt="User profile" />
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};
```

Con estos componentes y configuraciones, tu aplicación React ahora está integrada con Auth0, permitiendo a los usuarios iniciar y cerrar sesión y acceder a su perfil de usuario.


### **Etapa 5: Rutas Protegidas**:

   - Utiliza `react-router-dom` para crear las rutas de tu aplicación.
   - Implementa rutas protegidas que requieran autenticación para acceder al perfil de usuario y al panel de administrador.

#### 1. Creación de una ruta protegida (corregido)

```javascript
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Route 
      {...rest} 
      render={props => 
        isAuthenticated ? children : <Redirect to="/login" />
      }
    />
  );
};
export default ProtectedRoute;
```

#### 2. Utilizar `ProtectedRoute` (corregido)

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import UserProfile from './UserProfile';
import AdminPanel from './AdminPanel';
import NavigationBar from './NavigationBar';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/profile">
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/admin">
          <AdminPanel />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default AppRoutes;
```

### **Etapa 6: Autorización**:

   - Configura roles en Auth0 (por ejemplo, un rol de "admin").
   - Asegúrate de que solo los usuarios con el rol adecuado puedan acceder al panel de administrador.

La autorización es el proceso mediante el cual se verifica si un usuario autenticado tiene permiso para realizar ciertas acciones o acceder a ciertos recursos. En el contexto de nuestra aplicación, esto podría referirse a permitir que sólo ciertos usuarios accedan al Panel de Administrador.

#### 1. Configurando Roles en Auth0

Antes de integrar la autorización en nuestra aplicación, necesitas configurar roles y permisos en Auth0.

1. Ve al Dashboard de Auth0.
2. En el menú lateral, haz clic en "User Management" y luego en "Roles".
3. Haz clic en "Create Role", asigna un nombre como "admin" y una descripción.
4. Una vez creado el rol, puedes asignar permisos específicos a ese rol o asignar el rol a usuarios específicos.

#### 2. Accediendo a Roles en la Aplicación

Auth0 permite incluir roles en el token de acceso o ID. Puedes configurarlo en las reglas de Auth0 y luego acceder a esa información en tu aplicación.

#### 3. Creando un Hook para Comprobar el Rol

```javascript
import { useAuth0 } from '@auth0/auth0-react';

const useIsUserAdmin = () => {
  const { user } = useAuth0();
  return user && user['https://YOUR_DOMAIN/roles'].includes('admin');
};
```

Aquí, estamos creando un hook personalizado que verifica si el usuario autenticado tiene el rol 'admin'. Cambia `YOUR_DOMAIN` por tu dominio específico de Auth0.

#### 4. Usando el Hook en Rutas Protegidas

Puedes mejorar el componente `ProtectedRoute` para incluir una verificación de rol.

```javascript
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import useIsUserAdmin from './useIsUserAdmin';

const AdminProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0();
  const isUserAdmin = useIsUserAdmin();

  return (
    <Route 
      {...rest} 
      render={props => 
        isAuthenticated && isUserAdmin ? children : <Redirect to="/" />
      }
    />
  );
};
export default AdminProtectedRoute;
```

Ahora, `AdminProtectedRoute` es una ruta protegida que sólo permite el acceso si el usuario está autenticado y tiene el rol de 'admin'.

### **Etapa 7: Pruebas**:

   - Prueba todas las funcionalidades de tu aplicación: registro, inicio de sesión, acceso al perfil, envío de feedback, y acceso al panel de administrador con el rol adecuado.
   - Reflexiona sobre las ventajas de utilizar un servicio como Auth0 para la autenticación y autorización en aplicaciones web.
