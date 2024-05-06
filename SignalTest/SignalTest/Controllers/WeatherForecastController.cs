using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalTest.Hubs;
using System.ComponentModel.DataAnnotations;

namespace SignalTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IHubContext<TestHub> _hubContext;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, 
            IHubContext<TestHub> hubContext)
        {
            _logger = logger;
            _hubContext=hubContext;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost("issued")]
        public async Task<IActionResult> InvoiceIssued([FromBody] ReqBody body)
        {
            await _hubContext.Clients.All.SendAsync("InvoiceIssued", body.InvoiceId);
            return Ok();
        }
    }

    public class ReqBody
    {
        [Required]
        public Guid InvoiceId { get; set; }
    }
}