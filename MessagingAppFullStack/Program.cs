using System.Text;
using MessagingAppFullStack.Configuration;
using MessagingAppFullStack.Middleware;
using MessagingAppFullStack.Services;
using MessagingAppFullStack.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMessagingService, MessagingService>();
builder.Services.AddSingleton<IPermissionService, PermissionService>();
builder.Services.AddScoped<IUserProvider, UserProvider>();

var app = builder.Build();
app.UseCors("signalR");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// TODO: restrict to domain
app.UseCors(
    x =>
    {
        x.AllowAnyOrigin();
        x.AllowAnyMethod();
        x.AllowAnyHeader();
    });

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapControllers();
app.MapHub<MessagesHub>("/messages");
app.MapFallbackToFile("index.html");


app.Run();