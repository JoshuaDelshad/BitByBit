import requests

appid = 730  # CS2
url = f"https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid={appid}"
r = requests.get(url)
data = r.json()
print(f"Current players: {data['response']['player_count']}")
