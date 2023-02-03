using System.Text;
using System.Text.RegularExpressions;
using MessagingAppFullStack.Configuration;
using MessagingAppFullStack.Domain.Context;
using MessagingAppFullStack.Exceptions;
using MessagingAppFullStack.Middleware;
using MessagingAppFullStack.Services;
using MessagingAppFullStack.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "wwwroot/angular-client-app"
});

builder.Services.AddAuthentication(
        x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
    .AddJwtBearer(
        x =>
        {
            x.Events = new JwtBearerEvents()
            {
                OnMessageReceived = context =>
                {
                    if (context.Request.Cookies.ContainsKey("X-Access-Token"))
                    {
                        context.Token = context.Request.Cookies["X-Access-Token"];
                    }

                    return Task.CompletedTask;
                }
            };

            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Jwt:Key"])),
                ValidIssuer = builder.Configuration["AppSettings:Jwt:Issuer"],
                ValidAudience = builder.Configuration["AppSettings:Jwt:Audience"],
                ValidateAudience = true,
                ValidateIssuer = true,
            };
        });


builder.Services.AddCors(
    options =>
    {
        options.AddPolicy(
            name: "signalR", policyBuilder =>
            {
                policyBuilder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
    });
builder.Services.AddSignalR();


builder.Services.AddControllers();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection(nameof(AppSettings)));
var settings = new AppSettings();
builder.Configuration.GetSection(nameof(AppSettings)).Bind(settings);
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();

var connection = Environment.GetEnvironmentVariable("DB_CONNECTION") ?? settings.Database.ConnectionString;
builder.Services.AddDbContext<EfCoreContext>(options => options.UseSqlServer(connection));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMessagingService, MessagingService>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IUserProvider, UserProvider>();

builder.Services.AddControllers(options =>
{
    options.Filters.Add<EntityNotFoundFilter>();
});


var app = builder.Build();

app.UseCors("signalR");

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(
    x =>
    {
        x.AllowAnyOrigin();
        x.AllowAnyMethod();
        x.AllowAnyHeader();
    });

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapControllers();
app.MapHub<MessagesHub>("/api/messages");


app.Use(async (context, next) => {
    var url = context.Request.Path;
    Console.WriteLine($"Getting {url}");
    if (!url.StartsWithSegments("/api") && Regex.IsMatch(url, @"^(?!.*(\.js|\.css|\.html|\.png|\.jpg|\.jpeg|\.ico)).*$"))
    {
        context.Request.Path = "/index.html";
    }
    await next();
});

app.UseStaticFiles();
app.UseDefaultFiles();

app.Run();