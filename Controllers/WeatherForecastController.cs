using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AwesomeApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            var client = new RestClient($"https://api.chucknorris.io/jokes/random");

            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);
            string jokeResponse = response.Content;
            dynamic jokeJson = JsonConvert.DeserializeObject(jokeResponse);
            List<WeatherForecast> subjects = new List<WeatherForecast>();
            WeatherForecast test = new WeatherForecast
            {
                joke = jokeJson.value,//jokeObject.GetType().GetProperty($"value").GetValue(jokeObject, null).ToString(),
                id = jokeJson.id,//jokeObject.GetType().GetProperty($"id").GetValue(jokeObject, null).ToString(),
                icon_url = jokeJson.icon_url,//jokeObject.GetType().GetProperty($"icon_url").GetValue(jokeObject, null).ToString(),
                date = (DateTime)jokeJson.created_at//jokeObject.GetType().GetProperty($"created_at").GetValue(jokeObject, null),
            };
            subjects.Add(test);
            return subjects;
            /**object p = await Enumerable.Range(1, 5).Select(async index =>
            {
                
                
            });**/
        }
    }
}
