FROM openjdk:11
ARG JAR_FILE=build/libs/*-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
COPY .env ./
ENTRYPOINT ["java","-jar","/app.jar"]