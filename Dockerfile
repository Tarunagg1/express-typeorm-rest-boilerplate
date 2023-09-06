FROM node:16.14.0

# Create app directory
WORKDIR /usr/src/app
# copy
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


EXPOSE 9000
CMD ["npm", "start"]
