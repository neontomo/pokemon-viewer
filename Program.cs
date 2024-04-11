var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


var app = builder.Build();

// Use the CORS policy
app.UseCors("AllowAllOrigins");

app.MapGet("/pokemon/{name}", async (string name) =>
{
    var client = new HttpClient();
    var response = await client.GetAsync($"https://pokeapi.co/api/v2/pokemon/{name}");
    var content = await response.Content.ReadAsStringAsync();
    return Results.Text(content, "application/json");
});

app.Run();