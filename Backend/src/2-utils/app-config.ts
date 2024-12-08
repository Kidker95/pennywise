
class AppConfig {
    public isDevelopment = true;
    public readonly port = 4000;
    public readonly host = "localhost";
    public readonly user = "root";
    public readonly sqlPassword = "Qazwsx!123";
    public readonly jwtPassword = "P455!WoRd";
    public readonly database = "pennywise";

}

export const appConfig = new AppConfig();