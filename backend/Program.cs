// * Built in .NET Method that sets up everything for an app (reading config, registering services etc) *
var builder = WebApplication.CreateBuilder(args);
			// *Register CORS Policy so Frontend And Backend can talk to each other* 
	//builder.services is where you register things the app needs. AddCors adds cors as a feature
builder.Services.AddCors (options =>
{
	options.AddPolicy("AllowFrontend", policy => // A name we give this policy to reference later
												 //Create a named rule, "policy" define what the rule allows
	{
		policy.WithOrigins("http://localhost:5173") // Only allow requests from this specific orign
		.AllowAnyMethod() // Allow get, post etc from this origin
		.AllowAnyHeader(); // allow any request headers 
		// Chaining with . is called method chain, Each method returns the same policy object
	});
});

//Once everything is configured via builer call build to actually construct the app
var app = builder.Build();
app.UseCors("AllowFrontend"); //Now apply the policy to the app and use it. 


//Establish a var called questions. Create a new array (List) that fits the shape of Question
					    // * GENERIC * Tells C# what type of things the list holds. 
var questions = new List <Question>
{
	new Question
	 {Id = 1,
	 Text = "How Old Is Mr Jaspy",
	 Answers = new List<string> {"2", "1", "69", "4"},
	 CorrectIndex = 3
	 },

	 new Question
	 { Id = 2,
	   Text = "What Country Won Eurovision 2018",
	   Answers = new List<string> {"Poland", "Sweden", "Albania", "Israel"},
	   CorrectIndex = 3
	   },

	 new Question
	 {	Id = 3,
	 	Text = "Which One Of These Song Titles did NOT win Eurovision",
		Answers = new List<string> {"Tattoo", "Sugar", "Stefania", "1994"},
		CorrectIndex = 1
	 },

	 new Question
	 {	Id = 4,
	 	Text = "Which One Of These Countries Has Scored The HIGHEST in the Public vote in 2023",
		Answers = new List<string> {"Sweden", "Finland", "UK", "Israel"},
		CorrectIndex = 0
	 }
};

	//MapGet C# Get requests.
	//When the frontend makes a fetch to /api/questions run this function and return questions
app.MapGet("/api/questions", () => questions);

app.Run();

public class Question
{
	public int Id { get; set; }
	public string Text { get; set; } = null!;
	public List <string> Answers { get; set; } = null!;
	public int CorrectIndex { get; set ;}
}