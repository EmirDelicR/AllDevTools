FROM postgres

WORKDIR /docker-entrypoint-initdb.d

# add table 
ADD /tables/ /docker-entrypoint-initdb.d/tables/
# add seed
ADD /seed/ /docker-entrypoint-initdb.d/seed/
# add deploy schema
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
