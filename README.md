# 🎮 my-game-lib
Search for &amp; save your favorite games.

![Screenshot](/public/screenshot.png)

## API Endpoints

`GET /user/session`

Returns user currently in session from login or undefined if not logged in.

`POST /user/register`

BODY

```
{
    username: string;
    password: string;
}
```

Creates user in database.

`POST /user/login`

BODY

```
{
    username: string;
    password: string;
}
```

Logs user in &amp; sets user in session.

`POST /user/logout`

Clears user in session.

---

`GET /games/search?q=string`

Returns list of games that match the search query 'q'.

`GET /games/game/:id`

Returns detail data for game of 'id'.

`GET /games/favorite?id=String`

Returns true/false if game of 'id' is favorited by user in session.

`GET /games/favorites`

Returns list of ids of favorite games of user in session.

`POST /games/favorite`

BODY

```
{
    id: number;
}
```

Marks game as favorite for user in session.

`POST /games/unfavorite`

BODY

```
{
    id: number;
}
```

Clears game from favorites for user in session.