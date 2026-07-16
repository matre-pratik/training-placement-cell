# ---------- Stage 1: Build the jar with Maven ----------
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy only what's needed to resolve dependencies first (better layer caching)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Now copy the rest of the source and build
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# ---------- Stage 2: Run the jar on a lightweight JRE ----------
FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Render assigns a port dynamically via the PORT env var; Spring Boot must bind to it
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
