# Use Node.js como imagem base para build
FROM node:18 AS build

# Crie o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos necessários
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Crie o build do Vue.js
RUN npm run build

# Use Nginx para servir o build
FROM nginx:alpine

# Copie os arquivos do build para o diretório público do Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exponha a porta onde o frontend roda
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]