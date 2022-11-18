namespace MessagingAppFullStack.Configuration;

public class AppSettings
{
    public JwtSettings Jwt { get; set; }
}

public class JwtSettings
{
    public string Key { get; set; }
    public string Audience { get; set; }
    public string Issuer { get; set; }
}