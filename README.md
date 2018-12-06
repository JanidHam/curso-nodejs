### Getting Started

If you wanted to add a package while docker-compose was running your app:
 - `docker-compose exec <service name> npm install --save <package name>`
 - This installs it inside the running container.
 - Nodemon will detect the change and restart.
 - `--save` will add it to the package.json for next `docker-compose build`
