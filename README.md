# TG Supplements

Mini loja de suplementos desenvolvida com React Native + Expo como projeto acadêmico da disciplina de Desenvolvimento Mobile.

## Tecnologias utilizadas

### Frontend

* React Native
* Expo
* Expo Router
* Zustand
* Axios

### Backend

* Flask
* SQLite
* JWT Authentication
* SQLAlchemy
* Flask-CORS

## Funcionalidades

* Login
* Cadastro de usuários
* Logout
* CRUD completo de produtos
* Categorias de produtos
* Relacionamento produto-categoria
* Navegação entre telas
* Gerenciamento global de estado
* Integração completa com API Flask
* Persistência de dados com SQLite
* OTA Updates com Expo EAS Update

## Estrutura do Projeto

```txt
tg-suplementos/
├── frontend/
└── backend/
```

## Integrante

* Vinicius Rocha

## Como executar

### Frontend

```bash
cd frontend

npm install

npx expo start
```

### Backend

```bash
cd backend

python -m venv venv

.\venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

## Expo

Projeto publicado via Expo EAS Update.

## Objetivo do Projeto

Desenvolver uma aplicação mobile completa utilizando React Native + Expo, incluindo autenticação, gerenciamento de estado global, CRUD integrado ao backend e persistência de dados.
