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
    public class JokesController : ControllerBase
    {

        private readonly ILogger<JokesController> _logger;

        public JokesController(ILogger<JokesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Jokes>> Get()
        {
            var client = new RestClient($"https://api.chucknorris.io/jokes/random");

            var request = new RestRequest(Method.GET);
            IRestResponse response = await client.ExecuteAsync(request);
            string jokeResponse = response.Content;
            dynamic jokeJson = JsonConvert.DeserializeObject(jokeResponse);
            List<Jokes> subjects = new List<Jokes>();
            Jokes test = new Jokes
            {
                joke = jokeJson.value,  //jokeObject.GetType().GetProperty($"value").GetValue(jokeObject, null).ToString(),
                id = jokeJson.id,  //jokeObject.GetType().GetProperty($"id").GetValue(jokeObject, null).ToString(),
                icon_url = jokeJson.icon_url,  //jokeObject.GetType().GetProperty($"icon_url").GetValue(jokeObject, null).ToString(),
                date = (DateTime)jokeJson.created_at  //jokeObject.GetType().GetProperty($"created_at").GetValue(jokeObject, null),
            };
            subjects.Add(test);
            return subjects;
        }
    }
}
