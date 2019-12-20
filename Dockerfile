FROM openjdk:8-jre-alpine

COPY  build/libs/healthtel-0.0.1-SNAPSHOT.jar /healthtel.jar

CMD ["/usr/bin/java", "-jar", "/healthtel.jar"]