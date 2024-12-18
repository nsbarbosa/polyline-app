# Use Node.js como imagem base
FROM node:18

# Crie o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos necessários
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

RUN npm run build

# Exponha a porta onde o servidor roda
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
