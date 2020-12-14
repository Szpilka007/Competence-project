# Competence-project

## How to run the project:
- Enter root directory
- Run `./bin/server-dev`
- Enjoy

## How to run the generators
- Run the project (instructions above)
- While the project is running, run one of the generator files from `bin`:
  - For example, `./bin/generateHotspots`
- Alternatively: run the command from the file directly
  - For example, `docker-compose -f docker-compose/docker-compose.yml exec api npx nestjs-command generateHotspots`
