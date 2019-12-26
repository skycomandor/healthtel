FROM openjdk:8-jre-alpine

COPY  build/libs/healthtel-1.jar /healthtel.jar

CMD ["/usr/bin/java", "-jar", "/healthtel.jar"]