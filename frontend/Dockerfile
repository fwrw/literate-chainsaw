# Use uma imagem base do Node.js para construir o projeto
FROM node:18.20-alpine AS build

WORKDIR /app

# Copie os arquivos necessários para instalar as dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o contêiner
COPY . .

# Construa o projeto para produção
RUN npm run build

# Use uma imagem Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos de build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]