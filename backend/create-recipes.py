import requests

# set the base URL of the Django API backend
base_url = 'http://127.0.0.1:8000'


api_key='197efef262d14b7f90aa65f69a8672bc'
# set the user data for registration
# user_data = {
#     'username': 'masterchef',
#     'email': 'masterchef@p3.com',
#     'password': 'testpassword123'
# }

# # make a POST request to the user registration endpoint
# register_url = f'{base_url}/api/account/register/'
# response = requests.post(register_url, data=user_data)

# # check if the registration was successful
# if response.status_code != 201:
#     print('User registration failed:', response.text)
#     exit()

# print('User registered successfully.')

# set the user data for login
user_data = {
    'username': 'masterchef',
    'password': 'testpassword123'
}

# make a POST request to the user login endpoint
login_url = f'{base_url}/api/account/login/'
response = requests.post(login_url, data=user_data)

# check if the login was successful
if response.status_code != 200:
    print('User login failed:', response.text)
    exit()

print('User logged in successfully.')

# extract the authentication token from the response
token = response.json()['token']

# # make a GET request to the Spoonacular API to get a recipe
# api_key = 'YOUR_SPOONACULAR_API_KEY'
# search_url = f'https://api.spoonacular.com/recipes/random?apiKey={api_key}&number=20'
# response = requests.get(search_url)

# # check if the search was successful
# if response.status_code != 200:
#     print('Recipe search failed:', response.text)
#     exit()

# # extract the recipe data from the response
# recipe_data = response.json()['recipes'][0]

# map the recipe data to the format required by the Django API
recipe_data = {
    "name": "Spaghetti Carbonara",
    "description": "This classic Italian dish is made with spaghetti, pancetta or bacon, eggs, and cheese.",
    "serving_size": 4,
    "prep_time": 10,
    "cook_time": 15,
    "diets": [{"name": "Gluten-Free"}, {"name": "Low Carb"}],
    "cuisines": [{"name": "Italian"}],
    "ingredients": [
        {"name": "spaghetti", "quantity": 400},
        {"name": "pancetta", "quantity": 150},
        {"name": "eggs", "quantity": 4},
        {"name": "pecorino romano cheese", "quantity": 100}
    ],
    "steps": [
        {
        "description": "Cook the spaghetti in a large pot of boiling salted water until al dente.",
        "images": [],
        "videos": [],
        "cook_time": 10,
        "prep_time": "5"
        },
        {
        "description": "Meanwhile, cook the pancetta in a large skillet over medium heat until crisp, about 8 minutes. Remove the pancetta with a slotted spoon and set aside.",
        "images": [],
        "videos": [],
        "cook_time": 8,
        "prep_time": "5"
        },
        {
        "description": "In a mixing bowl, beat the eggs and mix in the pecorino cheese and black pepper.",
        "images": [],
        "videos": [],
        "cook_time": 0,
        "prep_time": "5"
        },
        {
        "description": "Drain the spaghetti and return it to the pot. Pour in the egg mixture and pancetta, and toss until the spaghetti is coated and the eggs are cooked through, about 2 minutes. Serve immediately.",
        "images": [],
        "videos": [],
        "cook_time": 2,
        "prep_time": "2"
        }
    ],
    "images": []
}

# set the headers with the authentication token
headers = {'Authorization': f'Token {token}'}

# make a POST request to the recipe creation endpoint
recipe_url = f'{base_url}/api/recipes/'
response = requests.post(recipe_url, json=recipe_data, headers=headers)

# check if the recipe creation was successful
if response.status_code != 201:
    print('Recipe creation failed:', response.text)
    exit()

print('Recipe created successfully.')